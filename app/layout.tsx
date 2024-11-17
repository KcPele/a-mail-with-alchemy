import type { Metadata } from "next";
import "./globals.css";
import { DynamicProvider } from "./components/providers/dynamic-provider";
import NavbarWallet from "./components/ui/Navbar";

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
        <DynamicProvider>
          <NavbarWallet />
          {children}
        </DynamicProvider>
      </body>
    </html>
  );
}
