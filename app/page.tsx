"use client";

import { ArrowRight, Mail, Calendar, Lock } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-6">
            Your Smart AI Assistant for
            <span className="text-blue-600"> Data Integration</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Seamlessly connect and manage your digital life with our intelligent
            AI assistant. Secure OAuth integration with Gmail, Calendar, and
            more.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/docs"
              className="px-6 py-3 bg-white text-gray-700 rounded-lg border hover:bg-gray-50 transition"
            >
              View Documentation
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Integrated Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <FeatureCard
              icon={<Mail className="w-8 h-8 text-blue-600" />}
              title="Gmail Integration"
              description="Secure access to your emails with OAuth 2.0 authentication. Manage and analyze your communications efficiently."
            />
            <FeatureCard
              icon={<Calendar className="w-8 h-8 text-blue-600" />}
              title="Calendar Access"
              description="Connect your calendar to manage schedules, meetings, and events with intelligent automation."
            />
            <FeatureCard
              icon={<Lock className="w-8 h-8 text-blue-600" />}
              title="Secure Authentication"
              description="Enterprise-grade security with OAuth 2.0 and encrypted data storage for all your connections."
            />
          </div>
        </div>
      </section>

      {/* Security Badge Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-semibold mb-6">
            Trusted Security Standards
          </h3>
          <div className="flex flex-wrap justify-center gap-8">
            <SecurityBadge
              title="OAuth 2.0"
              description="Industry-standard security"
            />
            <SecurityBadge
              title="Data Encryption"
              description="End-to-end encryption"
            />
            <SecurityBadge
              title="GDPR Compliant"
              description="Privacy focused"
            />
          </div>
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
