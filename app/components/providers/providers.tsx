"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { config, queryClient } from "../../config";
import { AlchemyAccountProvider } from "@account-kit/react";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AlchemyAccountProvider config={config} queryClient={queryClient}>
        {children}
      </AlchemyAccountProvider>
    </QueryClientProvider>
  );
};
