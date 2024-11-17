"use client";

import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useAccount } from "wagmi";
import { Button } from "./ui/button"; // Assuming you have a Button component

export function ConnectButton() {
  const { setShowAuthFlow, primaryWallet, handleLogOut } = useDynamicContext();
  const { address } = useAccount();

  if (primaryWallet && address) {
    return (
      <Button onClick={handleLogOut} className="flex items-center gap-2">
        <span className="hidden sm:inline">
          {address.slice(0, 6)}...{address.slice(-4)}
        </span>
        Disconnect
      </Button>
    );
  }

  return (
    <Button
      onClick={() => setShowAuthFlow(true)}
      className="flex items-center gap-2"
    >
      Connect Wallet
    </Button>
  );
}
