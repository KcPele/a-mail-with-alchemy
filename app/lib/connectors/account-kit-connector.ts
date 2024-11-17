// import {
//   LightSmartContractAccount,
// } from "@alchemy/aa-accounts";
// import { AlchemyProvider } from "@alchemy/aa-alchemy";
// import { type SmartAccountSigner } from "@alchemy/aa-core";
// import { Chain, arbitrum } from "viem/chains";
// import type { Client } from "viem";

// export interface AccountKitConfig {
//   apiKey: string;
//   chain: Chain;
// }

// export class AccountKitConnector {
//   private provider: AlchemyProvider;
//   private signer?: SmartAccountSigner;
//   private account?: LightSmartContractAccount;

//   // constructor(config: AccountKitConfig) {
//   //   this.provider = new AlchemyProvider({
//   //     apiKey: config.apiKey,
//   //     chain: config.chain,
//   //   }).connect(
//   //     (rpcClient: Client) =>
//   //       new LightSmartContractAccount({
//   //         rpcClient,
//   //         chain: config.chain,
//   //         factoryAddress: getDefaultLightAccountFactoryAddress(config.chain),
//   //       })
//   //   );
//   // }

//   // async connectWithPasskey(username: string): Promise<boolean> {
//   //   try {
//   //     // Get or create a passkey for the user
//   //     const owner = await getPasskeyOwner(username).catch(() =>
//   //       createPasskeyOwner(username)
//   //     );

//   //     this.signer = owner;
//   //     this.account = this.provider.connect(
//   //       (rpcClient: Client) =>
//   //         new LightSmartContractAccount({
//   //           rpcClient,
//   //           chain: arbitrum,
//   //           owner,
//   //           factoryAddress: getDefaultLightAccountFactoryAddress(arbitrum),
//   //         })
//   //     );

//   //     return true;
//   //   } catch (error) {
//   //     console.error("Failed to connect with passkey:", error);
//   //     return false;
//   //   }
//   // }

//   async sendTransaction(to: string, data: string): Promise<string> {
//     if (!this.account) {
//       throw new Error("Not connected");
//     }

//     try {
//       const uo = await this.account.sendUserOperation({
//         target: to,
//         data,
//       });

//       const hash = await this.provider.waitForUserOperationTransaction(uo.hash);
//       return hash;
//     } catch (error) {
//       console.error("Failed to send transaction:", error);
//       throw error;
//     }
//   }

//   getAddress(): string | undefined {
//     return this.account?.address;
//   }
// }
