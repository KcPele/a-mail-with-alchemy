import type { Metadata } from "next";
import "./globals.css";
import { RootProvider } from "./components/providers/root-provider";

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
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
