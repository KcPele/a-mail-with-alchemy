// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/AIDataAssistant.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Setup subscription prices
        uint256[] memory prices = new uint256[](3);
        prices[0] = 100 * 10 ** 18; // Basic tier
        prices[1] = 200 * 10 ** 18; // Premium tier
        prices[2] = 300 * 10 ** 18; // Enterprise tier

        vm.startBroadcast(deployerPrivateKey);

        // Deploy contract
        AIDataAssistant assistant = new AIDataAssistant(
            vm.envAddress("PAYMENT_TOKEN"),
            prices
        );

        vm.stopBroadcast();
    }
}
