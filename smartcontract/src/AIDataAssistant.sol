// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

/// @title AIDataAssistant
/// @notice Smart contract for managing AI assistant subscriptions and ride payments
/// @dev Integrates with the existing AI data integration platform
contract AIDataAssistant is Ownable, ReentrancyGuard {
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

    IERC20 public paymentToken;

    uint256[] public subscriptionPrices;
    uint256 public constant SUBSCRIPTION_DURATION = 30 days;

    // Events
    event SubscriptionPurchased(
        address indexed user,
        uint256 tier,
        uint256 expiresAt
    );
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
    error InvalidTier();
    error InsufficientPayment();
    error SubscriptionRequired();
    error InvalidRide();
    error UnauthorizedService();

    constructor(address _paymentToken, uint256[] memory _subscriptionPrices) {
        paymentToken = IERC20(_paymentToken);
        subscriptionPrices = _subscriptionPrices;
    }

    /// @notice Purchase a subscription tier
    /// @param tier The subscription tier to purchase
    function purchaseSubscription(uint256 tier) external nonReentrant {
        if (tier >= subscriptionPrices.length) revert InvalidTier();

        uint256 price = subscriptionPrices[tier];
        if (paymentToken.allowance(msg.sender, address(this)) < price) {
            revert InsufficientPayment();
        }

        paymentToken.transferFrom(msg.sender, address(this), price);

        subscriptions[msg.sender] = Subscription({
            tier: tier,
            expiresAt: block.timestamp + SUBSCRIPTION_DURATION,
            active: true
        });

        emit SubscriptionPurchased(
            msg.sender,
            tier,
            block.timestamp + SUBSCRIPTION_DURATION
        );
    }

    /// @notice Schedule a ride payment
    /// @param rideId Unique identifier for the ride
    /// @param amount Payment amount for the ride
    function scheduleRidePayment(
        bytes32 rideId,
        uint256 amount
    ) external nonReentrant {
        if (!subscriptions[msg.sender].active) revert SubscriptionRequired();
        if (ridePayments[rideId].rider != address(0)) revert InvalidRide();

        if (paymentToken.allowance(msg.sender, address(this)) < amount) {
            revert InsufficientPayment();
        }

        paymentToken.transferFrom(msg.sender, address(this), amount);

        ridePayments[rideId] = RidePayment({
            rider: msg.sender,
            driver: address(0),
            amount: amount,
            timestamp: block.timestamp,
            rideId: rideId,
            completed: false
        });

        emit RideScheduled(rideId, msg.sender, amount);
    }

    /// @notice Complete a ride and transfer payment to driver
    /// @param rideId Unique identifier for the ride
    /// @param driver Address of the driver
    /// @param signature Signature from the oracle confirming ride completion
    function completeRide(
        bytes32 rideId,
        address driver,
        bytes memory signature
    ) external nonReentrant {
        RidePayment storage ride = ridePayments[rideId];
        if (ride.rider == address(0) || ride.completed) revert InvalidRide();

        bytes32 messageHash = keccak256(abi.encodePacked(rideId, driver));
        bytes32 signedHash = messageHash.toEthSignedMessageHash();
        address signer = signedHash.recover(signature);

        if (signer != owner()) revert UnauthorizedService();

        ride.driver = driver;
        ride.completed = true;
        paymentToken.transfer(driver, ride.amount);

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
}
