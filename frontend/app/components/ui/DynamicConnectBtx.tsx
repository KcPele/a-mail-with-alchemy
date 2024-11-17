import { DynamicConnectButton } from "@dynamic-labs/sdk-react-core";
import { Wallet } from "lucide-react";

const children = (
  <div className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
    <Wallet className="w-5 h-5" />
    <div data-testid="exampleChild">Connect a new wallet!</div>
  </div>
) as React.ReactElement;

export const DynamicConnectBtx = () => (
  <DynamicConnectButton>{children}</DynamicConnectButton>
);
