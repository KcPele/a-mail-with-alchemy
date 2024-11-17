// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

/// @title AIDataAssistant
/// @notice Smart contract for managing AI assistant subscriptions and ride payments
/// @dev Integrates with the existing AI data integration platform
contract AIDataAssistant is Ownable {
    using ECDSA for bytes32;

    // Structs
    struct Subscription {
        uint256 tier;
        uint256 expiresAt;
        bool active;
    }

    struct RidePayment {
        address rider;
        address driver;
        uint256 amount;
        uint256 timestamp;
        bytes32 rideId;
        bool completed;
    }

    // State variables
    mapping(address => Subscription) public subscriptions;
    mapping(bytes32 => RidePayment) public ridePayments;
    mapping(address => mapping(string => bool)) public serviceAuthorizations;

    uint256 public constant SUBSCRIPTION_PRICE = 0.0001 ether; // Fixed subscription price
    uint256 public constant SUBSCRIPTION_DURATION = 30 days;

    // Events
    event SubscriptionPurchased(address indexed user, uint256 expiresAt);
    event RideScheduled(
        bytes32 indexed rideId,
        address indexed rider,
        uint256 amount
    );
    event RideCompleted(
        bytes32 indexed rideId,
        address indexed rider,
        address indexed driver
    );
    event ServiceAuthorized(address indexed user, string indexed service);
    event ServiceRevoked(address indexed user, string indexed service);

    // Errors
    error InsufficientPayment();
    error SubscriptionRequired();
    error InvalidRide();
    error UnauthorizedService();

    constructor() Ownable(msg.sender) {}

    /// @notice Purchase a subscription
    function purchaseSubscription() external payable {
        if (msg.value < SUBSCRIPTION_PRICE) revert InsufficientPayment();

        subscriptions[msg.sender] = Subscription({
            tier: 0, // Single-tier system
            expiresAt: block.timestamp + SUBSCRIPTION_DURATION,
            active: true
        });

        emit SubscriptionPurchased(
            msg.sender,
            block.timestamp + SUBSCRIPTION_DURATION
        );
    }

    /// @notice Schedule a ride payment
    /// @param rideId Unique identifier for the ride
    function scheduleRidePayment(bytes32 rideId) external payable {
        if (!subscriptions[msg.sender].active) revert SubscriptionRequired();
        if (ridePayments[rideId].rider != address(0)) revert InvalidRide();
        if (msg.value == 0) revert InsufficientPayment();

        ridePayments[rideId] = RidePayment({
            rider: msg.sender,
            driver: address(0),
            amount: msg.value,
            timestamp: block.timestamp,
            rideId: rideId,
            completed: false
        });

        emit RideScheduled(rideId, msg.sender, msg.value);
    }

    /// @notice Complete a ride and transfer payment to driver
    /// @param rideId Unique identifier for the ride
    /// @param driver Address of the driver
    /// @param signature Signature from the oracle confirming ride completion
    function completeRide(
        bytes32 rideId,
        address driver,
        bytes memory signature
    ) external {
        RidePayment storage ride = ridePayments[rideId];
        if (ride.rider == address(0) || ride.completed) revert InvalidRide();

        // Manually hash with the Ethereum signing prefix
        bytes32 messageHash = keccak256(abi.encodePacked(rideId, driver));
        bytes32 ethSignedMessageHash = keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", messageHash)
        );

        address signer = ECDSA.recover(ethSignedMessageHash, signature);

        if (signer != owner()) revert UnauthorizedService();

        ride.driver = driver;
        ride.completed = true;

        // Transfer the Ether payment to the driver
        payable(driver).transfer(ride.amount);

        emit RideCompleted(rideId, ride.rider, driver);
    }

    /// @notice Authorize a service for data access
    /// @param service Name of the service (e.g., "gmail", "calendar")
    function authorizeService(string memory service) external {
        if (!subscriptions[msg.sender].active) revert SubscriptionRequired();

        serviceAuthorizations[msg.sender][service] = true;
        emit ServiceAuthorized(msg.sender, service);
    }

    /// @notice Revoke service authorization
    /// @param service Name of the service
    function revokeService(string memory service) external {
        serviceAuthorizations[msg.sender][service] = false;
        emit ServiceRevoked(msg.sender, service);
    }

    /// @notice Check if a user has authorized a service
    /// @param user Address of the user
    /// @param service Name of the service
    function isServiceAuthorized(
        address user,
        string memory service
    ) external view returns (bool) {
        return serviceAuthorizations[user][service];
    }

    /// @notice Owner can withdraw all collected funds
    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
