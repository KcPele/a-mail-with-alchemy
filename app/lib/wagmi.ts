import { http } from "viem";
import { baseSepolia, sepolia } from "viem/chains";
import { createConfig } from "wagmi";

export const config = createConfig({
  chains: [baseSepolia, sepolia],
  transports: {
    [baseSepolia.id]: http(),
    [sepolia.id]: http(),
  },
});
