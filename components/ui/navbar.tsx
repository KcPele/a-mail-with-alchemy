"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layout, Mail, Calendar, Settings } from "lucide-react";
import { ConnectButton } from "app/components/connect-button";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Layout },
  { name: "Email", href: "/dashboard/agents/email-summary", icon: Mail },
  { name: "Schedule", href: "/dashboard/agents/schedule", icon: Calendar },
  { name: "Settings", href: "/dashboard/settings/auth", icon: Settings },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">
              AI Assistant
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <ConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
