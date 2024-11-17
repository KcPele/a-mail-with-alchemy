import type { Metadata } from "next";
import "./globals.css";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import NavbarWallet from "components/ui/navbar";

export const metadata: Metadata = {
  title: "AI Data Integration Assistant",
  description: "Secure OAuth integration with Gmail, Calendar, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <DynamicContextProvider
          settings={{
            environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID!,
            walletConnectors: [EthereumWalletConnectors],
          }}
        >
          <NavbarWallet />
          {children}
        </DynamicContextProvider>
      </body>
    </html>
  );
}
