import { RootProvider } from "./components/providers/root-provider";
import { config } from "./config";
import "./globals.css";
import { cookieToInitialState } from "@account-kit/core";
import { headers } from "next/headers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialState = cookieToInitialState(
    config,
    (await headers()).get("cookie") ?? undefined
  );
  return (
    <html lang="en">
      <body>
        <RootProvider initialState={initialState}>{children}</RootProvider>
      </body>
    </html>
  );
}
