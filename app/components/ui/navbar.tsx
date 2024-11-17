"use client";
import { useUser } from "@account-kit/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Car, Mail, Calendar } from "lucide-react";
import { ConnectButton } from "./ConnectButton";

const NAVIGATION_ITEMS = [
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
  {
    name: "Rides",
    href: "/dashboard/rides",
    icon: Car,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const user = useUser();

  return (
    <nav className="h-16 border-b bg-white">
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          <Link href="/" className="text-xl font-bold">
            AI Data Assistant
          </Link>

          <div className="flex items-center space-x-4">
            {user && (
              <>
                {NAVIGATION_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
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
                      <span className="hidden md:inline">{item.name}</span>
                    </Link>
                  );
                })}
              </>
            )}

            <ConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
