"use client";

import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useAccount } from "wagmi";

export function ConnectButton() {
  const { setShowAuthFlow, primaryWallet, handleLogOut } = useDynamicContext();

  // Add error handling for Wagmi hook
  let address;
  try {
    const account = useAccount();
    address = account?.address;
  } catch (error) {
    console.error("Wagmi provider error:", error);
    // Fallback to using only primaryWallet
    address = primaryWallet?.address;
  }

  if (primaryWallet && address) {
    return (
      <button onClick={handleLogOut} className="flex items-center gap-2">
        <span className="hidden sm:inline">
          {address.slice(0, 6)}...{address.slice(-4)}
        </span>
        Disconnect
      </button>
    );
  }

  return (
    <button
      onClick={() => setShowAuthFlow(true)}
      className="flex items-center gap-2"
    >
      Connect Wallet
    </button>
  );
}
