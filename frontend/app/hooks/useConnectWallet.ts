import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

export function useConnectWallet() {
  const { setShowAuthFlow } = useDynamicContext();

  const connect = async () => {
    setShowAuthFlow(true);
  };

  return { connect };
}
