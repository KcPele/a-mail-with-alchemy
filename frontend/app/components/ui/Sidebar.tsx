"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Settings,
  Shield,
  Car,
  Wallet,
  Mail,
  Calendar,
  Blocks,
  CreditCard,
} from "lucide-react";

const NAVIGATION_ITEMS = [
  {
    section: "Main",
    items: [
      {
        name: "Home",
        href: "/",
        icon: Home,
      },
      {
        name: "Dashboard",
        href: "/dashboard",
        icon: Blocks,
      },
    ],
  },
  {
    section: "AI Services",
    items: [
      {
        name: "Email",
        href: "/dashboard/agents/email-summary",
        icon: Mail,
      },
      {
        name: "Calendar",
        href: "/dashboard/agents/schedule",
        icon: Calendar,
      },
    ],
  },
  {
    section: "Blockchain",
    items: [
      {
        name: "Wallet",
        href: "#",
        icon: Wallet,
      },
      {
        name: "Subscription",
        href: "/dashboard/subscription",
        icon: Shield,
      },
      {
        name: "Rides",
        href: "/dashboard/rides",
        icon: Car,
      },
      {
        name: "Payments",
        href: "#",
        icon: CreditCard,
      },
    ],
  },
  {
    section: "Settings",
    items: [
      {
        name: "Settings",
        href: "/dashboard/settings/auth",
        icon: Settings,
      },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-white border-r fixed left-0 top-16">
      <div className="p-4">
        {NAVIGATION_ITEMS.map((section) => (
          <div key={section.section} className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 mb-2">
              {section.section}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`
                        flex items-center gap-2 px-3 py-2 rounded-lg transition-colors
                        ${
                          isActive
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-600 hover:bg-gray-50"
                        }
                      `}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}
