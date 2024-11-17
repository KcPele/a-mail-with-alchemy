"use client";

import {
  ArrowRight,
  Mail,
  Calendar,
  Lock,
  Shield,
  Zap,
  Brain,
  Blocks,
  Wallet,
  Key,
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="w-full min-h-[calc(100vh-4rem)] pt-16">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
            Your AI Email Assistant
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Manage your emails intelligently with AI-powered automation. Save
            time and stay organized.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#features"
              className="px-6 py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Powerful Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Mail className="w-8 h-8 text-blue-600" />}
              title="Smart Email Management"
              description="Automatically categorize and prioritize your emails using advanced AI algorithms."
            />
            <FeatureCard
              icon={<Brain className="w-8 h-8 text-blue-600" />}
              title="AI-Powered Responses"
              description="Generate intelligent email responses with context-aware AI assistance."
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8 text-blue-600" />}
              title="Automation Workflows"
              description="Create custom automation rules to handle repetitive email tasks."
            />
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Enterprise-Grade Security
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Your data security is our top priority. We use industry-leading
              encryption and security practices.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <SecurityBadge
              title="End-to-End Encryption"
              description="Your data is always encrypted"
            />
            <SecurityBadge
              title="SOC 2 Compliant"
              description="Enterprise security standards"
            />
            <SecurityBadge
              title="Data Privacy"
              description="GDPR and CCPA compliant"
            />
          </div>
        </div>
      </section>

      {/* Blockchain Features Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powered by Blockchain</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the next generation of email security and authenticity
              with our blockchain integration
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Blocks className="w-8 h-8 text-blue-600" />}
              title="Decentralized Storage"
              description="Your emails are securely stored on the blockchain, ensuring permanence and immutability."
            />
            <FeatureCard
              icon={<Key className="w-8 h-8 text-blue-600" />}
              title="Cryptographic Verification"
              description="Every email is cryptographically signed, guaranteeing authenticity and preventing tampering."
            />
            <FeatureCard
              icon={<Wallet className="w-8 h-8 text-blue-600" />}
              title="Web3 Integration"
              description="Connect your wallet for seamless blockchain interactions and enhanced security."
            />
          </div>
        </div>
      </section>

      {/* Blockchain Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Blockchain?</h2>
              <div className="space-y-6">
                <BenefitItem
                  title="Immutable Record Keeping"
                  description="Every email transaction is recorded on the blockchain, creating an unchangeable audit trail."
                />
                <BenefitItem
                  title="Decentralized Security"
                  description="No single point of failure - your data is distributed across the blockchain network."
                />
                <BenefitItem
                  title="Smart Contract Automation"
                  description="Automated email workflows powered by blockchain smart contracts."
                />
                <BenefitItem
                  title="Token-Gated Features"
                  description="Access premium features through our native token system."
                />
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 p-1">
                <div className="h-full w-full bg-white rounded-xl p-8">
                  <div className="space-y-4">
                    <MetricCard label="Transactions Processed" value="1M+" />
                    <MetricCard label="Network Nodes" value="10,000+" />
                    <MetricCard label="Security Score" value="99.99%" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Technology Stack
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <TechStackItem
              title="Ethereum"
              description="Smart contract platform"
            />
            <TechStackItem title="IPFS" description="Decentralized storage" />
            <TechStackItem
              title="Zero Knowledge"
              description="Privacy preservation"
            />
            <TechStackItem title="Layer 2" description="Scalability solution" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Email Experience?
          </h2>
          <Link
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition gap-2"
          >
            Get Started Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const SecurityBadge = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-full border border-gray-200">
      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
      <div className="text-left">
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
};

const BenefitItem = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex gap-4">
      <div className="mt-1">
        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-blue-600" />
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const MetricCard = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <p className="text-gray-600 text-sm">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
};

const TechStackItem = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};
