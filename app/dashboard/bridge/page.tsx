"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

export default function BridgePage() {
  const [amount, setAmount] = useState<string>("");
  const [selectedToken, setSelectedToken] = useState<string>("ETH");

  const tokens = [
    { symbol: "ETH", name: "Ethereum" },
    { symbol: "MATIC", name: "Polygon" },
    { symbol: "BNB", name: "BNB Chain" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Bridge Assets</h1>
        <p className="text-gray-600">
          Transfer your assets across different blockchain networks
        </p>
      </div>

      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-sm p-6">
        <div className="space-y-6">
          {/* Token Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Token
            </label>
            <select
              value={selectedToken}
              onChange={(e) => setSelectedToken(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {tokens.map((token) => (
                <option key={token.symbol} value={token.symbol}>
                  {token.name} ({token.symbol})
                </option>
              ))}
            </select>
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount
            </label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                {selectedToken}
              </span>
            </div>
          </div>

          {/* Bridge Widget */}
          <div className="pt-4">
            <DynamicWidget />
          </div>

          {/* Network Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Source Network</span>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium">Destination Network</span>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Estimated time: 10-15 minutes
            </p>
          </div>

          {/* Info Section */}
          <div className="border-t pt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Important Information
            </h3>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>• Bridge transactions may take 10-15 minutes to complete</li>
              <li>• Make sure you have enough funds for gas fees</li>
              <li>• Double-check the destination network before bridging</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
