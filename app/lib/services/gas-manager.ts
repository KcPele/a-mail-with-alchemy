import { AlchemyGasManagerConfig } from "@alchemy/aa-alchemy/dist/types/middleware/gas-manager";
import { baseSepolia } from "viem/chains";

export class GasManager {
  private paymasterApi: any;

  constructor(config: AlchemyGasManagerConfig) {
    this.paymasterApi = new this.paymasterApi({
      apiKey: "",
      chain: baseSepolia,
      policyId: config.policyId,
    });
  }

  async sponsorUserOperation(userOp: any) {
    try {
      const sponsoredUserOp = await this.paymasterApi.sponsorUserOperation(
        userOp
      );
      return sponsoredUserOp;
    } catch (error) {
      console.error("Failed to sponsor user operation:", error);
      throw error;
    }
  }
}
