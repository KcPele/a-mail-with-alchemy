"use client";

import Link from "next/link";
import { Bell } from "lucide-react";

import React from "react";
import { DynamicConnectBtx } from "./DynamicConnectBtx";

const NavbarWallet = () => {
  return (
    <nav className="h-16 border-b bg-white fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          <Link href="/" className="text-xl font-bold">
            AI Data Assistant
          </Link>

          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>

            <DynamicConnectBtx />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarWallet;
