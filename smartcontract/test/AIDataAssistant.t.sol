// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/AIDataAssistant.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockToken is ERC20 {
    constructor() ERC20("Mock Token", "MTK") {
        _mint(msg.sender, 1000000 * 10 ** 18);
    }
}

contract AIDataAssistantTest is Test {
    AIDataAssistant public assistant;
    MockToken public token;
    address public user;
    address public driver;
    uint256 public userPrivateKey;
    uint256 public driverPrivateKey;

    function setUp() public {
        // Deploy mock token
        token = new MockToken();

        // Setup subscription prices
        uint256[] memory prices = new uint256[](3);
        prices[0] = 100 * 10 ** 18; // Basic tier
        prices[1] = 200 * 10 ** 18; // Premium tier
        prices[2] = 300 * 10 ** 18; // Enterprise tier

        // Deploy main contract
        assistant = new AIDataAssistant(address(token), prices);

        // Setup test accounts
        (user, userPrivateKey) = makeAddrAndKey("user");
        (driver, driverPrivateKey) = makeAddrAndKey("driver");

        // Fund user account
        token.transfer(user, 1000 * 10 ** 18);
    }

    function testPurchaseSubscription() public {
        vm.startPrank(user);
        token.approve(address(assistant), 100 * 10 ** 18);
        assistant.purchaseSubscription(0); // Basic tier
        vm.stopPrank();

        (uint256 tier, uint256 expiresAt, bool active) = assistant
            .subscriptions(user);
        assertTrue(active);
        assertEq(tier, 0);
        assertEq(expiresAt, block.timestamp + 30 days);
    }

    function testScheduleRide() public {
        // First purchase subscription
        vm.startPrank(user);
        token.approve(address(assistant), 200 * 10 ** 18);
        assistant.purchaseSubscription(0);

        // Schedule ride
        bytes32 rideId = keccak256(
            abi.encodePacked("test_ride", block.timestamp)
        );
        token.approve(address(assistant), 50 * 10 ** 18);
        assistant.scheduleRidePayment(rideId, 50 * 10 ** 18);
        vm.stopPrank();

        (address rider, , , , , bool completed) = assistant.ridePayments(
            rideId
        );
        assertEq(rider, user);
        assertFalse(completed);
    }

    function testCompleteRide() public {
        // Setup ride
        testScheduleRide();

        bytes32 rideId = keccak256(
            abi.encodePacked("test_ride", block.timestamp)
        );
        bytes32 messageHash = keccak256(abi.encodePacked(rideId, driver));
        bytes32 signedHash = keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", messageHash)
        );

        (uint8 v, bytes32 r, bytes32 s) = vm.sign(userPrivateKey, signedHash);
        bytes memory signature = abi.encodePacked(r, s, v);

        assistant.completeRide(rideId, driver, signature);

        (, address assignedDriver, , , , bool completed) = assistant
            .ridePayments(rideId);
        assertEq(assignedDriver, driver);
        assertTrue(completed);
    }

    function testServiceAuthorization() public {
        // Purchase subscription first
        vm.startPrank(user);
        token.approve(address(assistant), 100 * 10 ** 18);
        assistant.purchaseSubscription(0);

        // Authorize service
        assistant.authorizeService("gmail");
        assertTrue(assistant.isServiceAuthorized(user, "gmail"));

        // Revoke service
        assistant.revokeService("gmail");
        assertFalse(assistant.isServiceAuthorized(user, "gmail"));
        vm.stopPrank();
    }
}
