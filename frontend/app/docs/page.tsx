import Link from "next/link";
import { ArrowLeft, Book, Lock, Zap } from "lucide-react";

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
          Learn how to integrate and use our AI Assistant platform
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
              <li>Google Cloud Platform account</li>
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

        {/* Authentication */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Lock className="w-6 h-6 text-blue-600" />
            Authentication Setup
          </h2>
          <div className="prose max-w-none">
            <h3>Google OAuth Configuration</h3>
            <ol>
              <li>Go to Google Cloud Console</li>
              <li>Create a new project or select existing one</li>
              <li>Enable Gmail and Calendar APIs</li>
              <li>Configure OAuth consent screen</li>
              <li>Create OAuth 2.0 credentials</li>
              <li>Add authorized redirect URIs</li>
            </ol>

            <h3>Environment Variables</h3>
            <p>Create a .env.local file with the following:</p>
            <pre className="bg-gray-50 p-4 rounded-lg">
              <code>
                GOOGLE_CLIENT_ID=your_client_id{"\n"}
                GOOGLE_CLIENT_SECRET=your_client_secret{"\n"}
                OPENAI_API_KEY=your_openai_key{"\n"}
                ENCRYPTION_KEY=your_encryption_key
              </code>
            </pre>
          </div>
        </section>

        {/* Features */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6 text-blue-600" />
            Features
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <FeatureCard
              title="Email Summary"
              description="Automatically analyze and summarize your unread emails using AI."
            />
            <FeatureCard
              title="Schedule Management"
              description="Manage calendar events and arrange transportation automatically."
            />
            <FeatureCard
              title="Intent Recognition"
              description="Natural language processing for understanding user requests."
            />
            <FeatureCard
              title="Secure Integration"
              description="OAuth 2.0 and encryption for secure data handling."
            />
          </div>
        </section>

        {/* API Reference */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">API Reference</h2>
          <div className="space-y-4">
            <ApiEndpoint
              method="POST"
              path="/api/agents"
              description="Execute an AI agent"
            />
            <ApiEndpoint
              method="POST"
              path="/api/auth/gmail"
              description="Authenticate with Gmail"
            />
            <ApiEndpoint
              method="POST"
              path="/api/intent"
              description="Analyze user intent"
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
