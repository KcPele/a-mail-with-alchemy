"use client";

import { useUser } from "@account-kit/react";
import {
  ArrowRight,
  Shield,
  Wallet,
  Key,
  Lock,
  Blocks,
  Mail,
  CheckCircle,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  const user = useUser();

  return (
    <main className="w-full min-h-[calc(100vh-4rem)] pt-16">
      {/* Hero Section with Animated Background */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500 to-blue-600 animate-gradient-x" />
        <div className="text-center relative z-10 animate-fade-in">
          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl mb-6">
            Web3 Secure Email Assistant
          </h1>
          <p className="text-xl text-gray-100 max-w-2xl mx-auto mb-8">
            Experience secure email management with blockchain authentication
            and AI assistance. Connect with Alchemy Account Kit for enhanced
            security.
          </p>
          <div className="flex justify-center gap-4">
            {!user && (
              <Link
                href="/dashboard"
                className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition flex items-center gap-2 shadow-lg transform hover:scale-105 duration-200"
              >
                Connect Wallet <ArrowRight className="w-4 h-4" />
              </Link>
            )}
            <Link
              href="/docs"
              className="px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition transform hover:scale-105 duration-200"
            >
              Documentation
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: "100K+", label: "Active Users" },
              { value: "1M+", label: "Emails Processed" },
              { value: "99.9%", label: "Uptime" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="text-center transform hover:scale-105 transition duration-300 ease-in-out"
              >
                <div className="text-4xl font-bold text-blue-600 mb-2 animate-count-up">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid with Hover Effects */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Powerful Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Lock className="w-8 h-8 text-blue-600" />,
                title: "Multi-Factor Auth",
                description:
                  "Choose from email, passkey, social login, or wallet connections.",
              },
              {
                icon: <Wallet className="w-8 h-8 text-blue-600" />,
                title: "WalletConnect",
                description:
                  "Connect seamlessly with your favorite Web3 wallet.",
              },
              {
                icon: <Key className="w-8 h-8 text-blue-600" />,
                title: "Passkey Support",
                description:
                  "Enhanced security with built-in passkey authentication.",
              },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="group p-6 rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:border-blue-500 bg-white"
              >
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Animated Benefits Section */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold">Why Choose Us?</h2>
              {[
                { icon: <Shield />, title: "Enterprise Security" },
                { icon: <Zap />, title: "Lightning Fast" },
                { icon: <Users />, title: "User Friendly" },
              ].map((benefit) => (
                <div
                  key={benefit.title}
                  className="flex items-center gap-4 p-4 rounded-lg hover:bg-blue-50 transition-colors duration-300 cursor-pointer group"
                >
                  <div className="text-blue-600 transform group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                  <h3 className="font-semibold group-hover:text-blue-600 transition-colors duration-300">
                    {benefit.title}
                  </h3>
                </div>
              ))}
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 p-1 animate-pulse">
                <div className="h-full w-full bg-white rounded-xl p-8">
                  <div className="space-y-4">
                    {[
                      { label: "Security Score", value: "99.99%" },
                      { label: "Response Time", value: "<100ms" },
                      { label: "User Rating", value: "4.9/5" },
                    ].map((metric) => (
                      <div
                        key={metric.label}
                        className="p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors duration-300"
                      >
                        <p className="text-sm text-gray-600">{metric.label}</p>
                        <p className="text-2xl font-bold text-blue-600">
                          {metric.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the plan that best fits your needs. All plans include our
              core features.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "Free",
                features: [
                  "Basic email summaries",
                  "Web3 authentication",
                  "Gmail integration",
                  "Community support",
                ],
                highlighted: false,
              },
              {
                name: "Pro",
                price: "$19/mo",
                features: [
                  "Advanced AI analysis",
                  "Priority support",
                  "Calendar integration",
                  "Ride-sharing features",
                  "Custom automations",
                ],
                highlighted: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                features: [
                  "Dedicated support",
                  "Custom integrations",
                  "SLA guarantee",
                  "Advanced security",
                  "Team management",
                ],
                highlighted: false,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`relative p-8 rounded-2xl transition-all duration-300 ${
                  plan.highlighted
                    ? "bg-blue-600 text-white scale-105 shadow-xl"
                    : "bg-white hover:shadow-xl border border-gray-200"
                }`}
              >
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <span
                      className={`text-4xl font-bold ${
                        plan.highlighted ? "text-white" : "text-blue-600"
                      }`}
                    >
                      {plan.price}
                    </span>
                    {plan.price !== "Custom" && (
                      <span className="text-gray-400">/month</span>
                    )}
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <CheckCircle
                          className={`w-5 h-5 ${
                            plan.highlighted ? "text-white" : "text-blue-600"
                          }`}
                        />
                        <span
                          className={
                            plan.highlighted ? "text-white" : "text-gray-600"
                          }
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-3 px-6 rounded-lg transition-all duration-300 ${
                      plan.highlighted
                        ? "bg-white text-blue-600 hover:bg-gray-100"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Hover Effect */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <Link
            href="/dashboard"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition transform hover:scale-105 duration-200 shadow-lg gap-2"
          >
            Launch App <ArrowRight className="w-5 h-5 animate-bounce" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Product</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/features"
                    className="hover:text-white transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="hover:text-white transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs"
                    className="hover:text-white transition-colors"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/changelog"
                    className="hover:text-white transition-colors"
                  >
                    Changelog
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-white transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="hover:text-white transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-white transition-colors"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-white transition-colors"
                  >
                    Terms
                  </Link>
                </li>
                <li>
                  <Link
                    href="/security"
                    className="hover:text-white transition-colors"
                  >
                    Security
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Connect</h4>
              <div className="flex space-x-4">
                <a
                  href="https://twitter.com"
                  className="hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a
                  href="https://github.com"
                  className="hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
                <a
                  href="https://discord.com"
                  className="hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"></path>
                  </svg>
                </a>
              </div>
              <div className="mt-4">
                <h5 className="text-sm font-semibold text-white mb-2">
                  Subscribe to our newsletter
                </h5>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg flex-grow"
                  />
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p>© 2024 AI Data Assistant. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
