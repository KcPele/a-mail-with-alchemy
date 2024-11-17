import { type GasManagerConfig, PaymasterAPI } from "@alchemy/aa-core";

export class GasManager {
  private paymasterApi: PaymasterAPI;

  constructor(config: GasManagerConfig) {
    this.paymasterApi = new PaymasterAPI({
      apiKey: config.apiKey,
      chain: config.chain,
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
