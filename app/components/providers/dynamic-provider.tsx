"use client";

import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";

export function DynamicProvider({ children }: { children: React.ReactNode }) {
  return (
    <DynamicContextProvider
      settings={{
        // Get this from your Dynamic dashboard
        environmentId: "YOUR_ENVIRONMENT_ID",
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      <DynamicWagmiConnector>{children}</DynamicWagmiConnector>
    </DynamicContextProvider>
  );
}
