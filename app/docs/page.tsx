import Link from "next/link";
import { ArrowLeft, Book, Lock, Wallet, Shield } from "lucide-react";

export default function DocsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        <h1 className="text-3xl font-bold mb-2">Documentation</h1>
        <p className="text-gray-600">
          Learn how to integrate and use our Web3 Email Assistant platform
        </p>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Getting Started */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Book className="w-6 h-6 text-blue-600" />
            Getting Started
          </h2>
          <div className="prose max-w-none">
            <h3>Prerequisites</h3>
            <ul>
              <li>Node.js {">="} 18.0.0</li>
              <li>npm {">="} 9.0.0</li>
              <li>Alchemy Account</li>
              <li>WalletConnect Project ID</li>
              <li>OpenAI API key</li>
            </ul>

            <h3>Installation</h3>
            <pre className="bg-gray-50 p-4 rounded-lg">
              <code>
                git clone https://github.com/yourusername/ai-data-assistant.git
                {"\n"}
                cd ai-data-assistant
                {"\n"}
                npm install
              </code>
            </pre>
          </div>
        </section>

        {/* Web3 Authentication */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Wallet className="w-6 h-6 text-blue-600" />
            Web3 Authentication
          </h2>
          <div className="prose max-w-none">
            <h3>Alchemy Account Kit Setup</h3>
            <ol>
              <li>Create an Alchemy account at dashboard.alchemy.com</li>
              <li>Create a new app and get your API key</li>
              <li>Set up a gas policy for your application</li>
              <li>Configure WalletConnect integration</li>
            </ol>

            <h3>Environment Variables</h3>
            <p>Create a .env.local file with the following:</p>
            <pre className="bg-gray-50 p-4 rounded-lg">
              <code>
                NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_api_key{"\n"}
                ALCHEMY_GAS_POLICY_ID=your_gas_policy_id{"\n"}
                NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address{"\n"}
                NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
              </code>
            </pre>
          </div>
        </section>

        {/* Authentication Methods */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Lock className="w-6 h-6 text-blue-600" />
            Authentication Methods
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <FeatureCard
              title="Email Authentication"
              description="Secure email-based authentication with magic links."
            />
            <FeatureCard
              title="Passkey Support"
              description="FIDO2 compliant passkey authentication for enhanced security."
            />
            <FeatureCard
              title="Social Login"
              description="Google OAuth integration with popup support."
            />
            <FeatureCard
              title="External Wallets"
              description="WalletConnect integration for Web3 wallet support."
            />
          </div>
        </section>

        {/* Smart Contract */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-600" />
            Smart Contract Integration
          </h2>
          <div className="prose max-w-none">
            <p>
              Contract Address (Sepolia):{" "}
              <code>0xb0Be9A7C457eCcd7b4E3f62166D6BA9392977fAA</code>
            </p>
            <h3>Features</h3>
            <ul>
              <li>OpenZeppelin based secure implementation</li>
              <li>Gas-optimized operations</li>
              <li>Role-based access control</li>
              <li>Upgradeable architecture</li>
            </ul>
          </div>
        </section>

        {/* API Reference */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">API Reference</h2>
          <div className="space-y-4">
            <ApiEndpoint
              method="POST"
              path="/api/auth/login"
              description="Initiate Web3 authentication"
            />
            <ApiEndpoint
              method="POST"
              path="/api/auth/verify"
              description="Verify authentication signature"
            />
            <ApiEndpoint
              method="GET"
              path="/api/user/profile"
              description="Get authenticated user profile"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-lg border border-gray-200 hover:shadow-md transition">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

function ApiEndpoint({
  method,
  path,
  description,
}: {
  method: string;
  path: string;
  description: string;
}) {
  return (
    <div className="p-4 rounded-lg border border-gray-200">
      <div className="flex items-center gap-3 mb-2">
        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm font-mono">
          {method}
        </span>
        <code className="text-sm">{path}</code>
      </div>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}
