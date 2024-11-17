"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { AlchemyAccountProvider, UiConfigProvider } from "@account-kit/react";
import { config, queryClient } from "app/config";

import { AlchemyClientState } from "@account-kit/core";
import { PropsWithChildren } from "react";
import { ConnectButton } from "../ui/ConnectButton";
import Navbar from "../ui/navbar";

export function RootProvider(
  props: PropsWithChildren<{ initialState?: AlchemyClientState }>
) {
  return (
    <QueryClientProvider client={queryClient}>
      <AlchemyAccountProvider
        config={config}
        queryClient={queryClient}
        initialState={props.initialState}
      >
        <Navbar />
        {props.children}
      </AlchemyAccountProvider>
    </QueryClientProvider>
  );
}
