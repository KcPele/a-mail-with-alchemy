import { alchemy, sepolia } from "@account-kit/infra";
import { createConfig, cookieStorage } from "@account-kit/react";
import { QueryClient } from "@tanstack/react-query";

export const config = createConfig(
  {
    transport: alchemy({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY! }),
    chain: sepolia,
    ssr: true,
    storage: cookieStorage,
    enablePopupOauth: true,
  },
  {
    auth: {
      sections: [
        [{ type: "email" }],
        [
          { type: "passkey" },
          { type: "social", authProviderId: "google", mode: "popup" },
        ],
        [
          {
            type: "external_wallets",
            walletConnect: {
              projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
            },
          },
        ],
      ],
      addPasskeyOnSignup: true,
      showSignInText: true,
    },
  }
);

export const queryClient = new QueryClient();
