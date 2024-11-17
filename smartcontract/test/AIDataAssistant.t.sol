// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/AIDataAssistant.sol";

contract AIDataAssistantTest is Test {
    AIDataAssistant public assistant;
    address public user;
    address public driver;
    uint256 public userPrivateKey;
    uint256 public driverPrivateKey;

    function setUp() public {
        // Deploy the main contract
        assistant = new AIDataAssistant();

        // Setup test accounts
        (user, userPrivateKey) = makeAddrAndKey("user");
        (driver, driverPrivateKey) = makeAddrAndKey("driver");

        // Fund user account with Ether
        vm.deal(user, 10 ether); // Provide 10 ETH to user
    }

    function testPurchaseSubscription() public {
        vm.startPrank(user);
        assistant.purchaseSubscription(); // Purchase subscription with Ether
        vm.stopPrank();

        (uint256 tier, uint256 expiresAt, bool active) = assistant
            .subscriptions(user);
        assertTrue(active);
        assertEq(tier, 0); // Fixed single tier
        assertEq(expiresAt, block.timestamp + 30 days);
    }

    function testScheduleRide() public {
        // First purchase subscription
        vm.startPrank(user);
        assistant.purchaseSubscription{value: 0.1 ether}();

        // Schedule ride with Ether payment
        bytes32 rideId = keccak256(
            abi.encodePacked("test_ride", block.timestamp)
        );
        assistant.scheduleRidePayment{value: 0.05 ether}(rideId);
        vm.stopPrank();

        (address rider, , , , , bool completed) = assistant.ridePayments(
            rideId
        );
        assertEq(rider, user);
        assertFalse(completed);
    }

    function testCompleteRide() public {
        // Setup ride
        vm.startPrank(user);
        assistant.purchaseSubscription{value: 0.1 ether}();

        bytes32 rideId = keccak256(
            abi.encodePacked("test_ride", block.timestamp)
        );
        assistant.scheduleRidePayment{value: 0.05 ether}(rideId);
        vm.stopPrank();

        // Simulate signing the message with the user's private key
        bytes32 messageHash = keccak256(abi.encodePacked(rideId, driver));
        bytes32 ethSignedMessageHash = keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", messageHash)
        );

        (uint8 v, bytes32 r, bytes32 s) = vm.sign(
            userPrivateKey,
            ethSignedMessageHash
        );
        bytes memory signature = abi.encodePacked(r, s, v);

        vm.prank(user); // Simulate the user calling the function
        assistant.completeRide(rideId, driver, signature);

        (, address assignedDriver, , , , bool completed) = assistant
            .ridePayments(rideId);
        assertEq(assignedDriver, driver);
        assertTrue(completed);
    }

    function testServiceAuthorization() public {
        // Purchase subscription first
        vm.startPrank(user);
        assistant.purchaseSubscription{value: 0.1 ether}();

        // Authorize service
        assistant.authorizeService("gmail");
        assertTrue(assistant.isServiceAuthorized(user, "gmail"));

        // Revoke service
        assistant.revokeService("gmail");
        assertFalse(assistant.isServiceAuthorized(user, "gmail"));
        vm.stopPrank();
    }

    function testWithdraw() public {
        // Simulate subscription and ride payments
        vm.startPrank(user);
        assistant.purchaseSubscription{value: 0.1 ether}();
        bytes32 rideId = keccak256(
            abi.encodePacked("test_ride", block.timestamp)
        );
        assistant.scheduleRidePayment{value: 0.05 ether}(rideId);
        vm.stopPrank();

        uint256 initialBalance = address(this).balance;

        // Withdraw funds as the owner
        assistant.withdraw();

        uint256 finalBalance = address(this).balance;
        assertEq(finalBalance, initialBalance + 0.15 ether); // 0.1 ETH + 0.05 ETH
    }
}
