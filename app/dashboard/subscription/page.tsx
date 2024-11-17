"use client";

import { useState } from "react";
import { Shield, Check } from "lucide-react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useConnectWallet } from "app/hooks/useConnectWallet";

const SUBSCRIPTION_TIERS = [
  {
    name: "Basic",
    price: "100 USDC",
    features: [
      "Email Summary Assistant",
      "Basic Calendar Integration",
      "Manual Ride Scheduling",
    ],
  },
  {
    name: "Premium",
    price: "200 USDC",
    features: [
      "All Basic Features",
      "Automated Ride Scheduling",
      "Priority Support",
      "Advanced Analytics",
    ],
  },
  {
    name: "Enterprise",
    price: "300 USDC",
    features: [
      "All Premium Features",
      "Custom Integration Support",
      "Dedicated Account Manager",
      "SLA Guarantees",
    ],
  },
];

export default function SubscriptionPage() {
  const [loading, setLoading] = useState(false);
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const { primaryWallet, handleLogOut } = useDynamicContext();
  const { connect } = useConnectWallet();

  const handleSubscribe = async (tier: number) => {
    setLoading(true);
    try {
      if (!primaryWallet) {
        await connect();
        return;
      }

      // Call smart contract
      const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;
      const data = `0x23b872dd000000000000000000000000${tier}`; // purchaseSubscription function signature

      // const tx = await primaryWallet.connector.sendTransaction({
      //   to: contractAddress,
      //   data,
      //   value: "0x00",
      // });

      alert("Subscription successful!");
    } catch (error) {
      console.error("Subscription failed:", error);
      alert("Failed to purchase subscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Shield className="w-8 h-8 text-blue-600" />
        <h1 className="text-2xl font-bold">Subscription Plans</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {SUBSCRIPTION_TIERS.map((tier, index) => (
          <div
            key={tier.name}
            className={`
              p-6 rounded-lg border transition-all
              ${
                selectedTier === index
                  ? "border-blue-500 shadow-lg"
                  : "border-gray-200"
              }
            `}
            onClick={() => setSelectedTier(index)}
          >
            <h3 className="text-xl font-semibold mb-2">{tier.name}</h3>
            <p className="text-2xl font-bold text-blue-600 mb-4">
              {tier.price}
            </p>
            <ul className="space-y-2 mb-6">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleSubscribe(index)}
              disabled={loading}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Processing..." : "Subscribe"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
