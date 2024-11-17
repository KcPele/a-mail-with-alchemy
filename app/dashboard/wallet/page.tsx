"use client";

import { useState, useEffect } from "react";
import { Wallet, ArrowUpRight, ArrowDownLeft, History } from "lucide-react";
import { arbitrum } from "viem/chains";

interface Transaction {
  hash: string;
  type: "subscription" | "ride" | "other";
  amount: string;
  timestamp: string;
  status: "pending" | "confirmed" | "failed";
}

export default function WalletPage() {
  const [address, setAddress] = useState<string>();
  const [balance, setBalance] = useState<string>();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    connectWallet();
  }, []);

  const connectWallet = async () => {
    try {
      const connector = new AccountKitConnector({
        apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY!,
        chain: arbitrum,
      });

      const email = prompt("Enter your email to view wallet:");
      if (!email) return;

      await connector.connectWithPasskey(email);
      const addr = connector.getAddress();

      if (addr) {
        setAddress(addr);
        // In a real app, fetch actual balance and transactions
        setBalance("1000 USDC");
        setTransactions([
          {
            hash: "0x123...",
            type: "subscription",
            amount: "100 USDC",
            timestamp: new Date().toISOString(),
            status: "confirmed",
          },
          // Add more mock transactions...
        ]);
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Wallet className="w-8 h-8 text-blue-600" />
        <h1 className="text-2xl font-bold">Smart Wallet</h1>
      </div>

      {loading ? (
        <div className="text-center">Loading wallet...</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border">
              <h2 className="text-lg font-semibold mb-4">Wallet Address</h2>
              <code className="block p-3 bg-gray-50 rounded">
                {address || "Not connected"}
              </code>
            </div>

            <div className="bg-white p-6 rounded-lg border">
              <h2 className="text-lg font-semibold mb-4">Balance</h2>
              <p className="text-3xl font-bold text-blue-600">
                {balance || "0 USDC"}
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border">
            <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
            <div className="space-y-4">
              {transactions.map((tx) => (
                <div
                  key={tx.hash}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded"
                >
                  <div className="flex items-center gap-3">
                    {tx.type === "subscription" ? (
                      <History className="w-5 h-5 text-blue-500" />
                    ) : tx.type === "ride" ? (
                      <Car className="w-5 h-5 text-green-500" />
                    ) : (
                      <ArrowUpRight className="w-5 h-5 text-gray-500" />
                    )}
                    <div>
                      <p className="font-medium">{tx.type}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(tx.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{tx.amount}</p>
                    <p
                      className={`text-sm ${
                        tx.status === "confirmed"
                          ? "text-green-600"
                          : tx.status === "pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {tx.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
