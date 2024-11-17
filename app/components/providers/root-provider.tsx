"use client";

import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "app/lib/wagmi";
import NavbarWallet from "../ui/NavbarWallet";

// Create a client
const queryClient = new QueryClient();

export function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: "sadesd-adscas",
        walletConnectors: [EthereumWalletConnectors],
        bridgeChains: [
          {
            chain: "EVM",
          },
          {
            chain: "STARK",
          },
        ],
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config}>
          <NavbarWallet />
          {children}
        </WagmiProvider>
      </QueryClientProvider>
      <DynamicWidget variant="dropdown" />
    </DynamicContextProvider>
  );
}
