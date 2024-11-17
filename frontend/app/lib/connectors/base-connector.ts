import { ConnectorConfig, ConnectorCredentials } from "app/types";
import { decryptData, encryptData } from "../utils/encryption";

export abstract class BaseConnector {
  protected credentials: ConnectorCredentials | null;
  protected config: ConnectorConfig;
  protected encryptedState: string;

  constructor(config: ConnectorConfig) {
    this.credentials = null;
    this.config = config;
    this.encryptedState = "";
  }

  abstract connect(credentials: ConnectorCredentials): Promise<boolean>;
  abstract disconnect(): Promise<boolean>;
  abstract getData(params: any): Promise<any>;
  abstract refreshAccessToken(): Promise<boolean>;

  protected async secureStore(data: any): Promise<void> {
    this.encryptedState = await encryptData(data);
  }

  protected async secureRetrieve(): Promise<any> {
    return await decryptData(this.encryptedState);
  }
}
