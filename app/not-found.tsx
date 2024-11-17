"use client";

import Link from "next/link";
import { Home, ArrowRight, RefreshCcw } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated 404 Number */}
        <div className="relative mb-8">
          <h1 className="text-[150px] md:text-[200px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse">
            404
          </h1>
          {/* Animated Circles */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[200px] max-h-[200px]">
            <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full animate-ripple"></div>
            <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full animate-ripple-delay"></div>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 animate-fade-in">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto animate-fade-in-delay">
          The page you're looking for seems to have wandered off into the
          digital void. Let's get you back on track!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-delay-2">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition transform hover:scale-105 duration-200 group"
          >
            <Home className="w-5 h-5 mr-2 group-hover:animate-bounce" />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition transform hover:scale-105 duration-200 group"
          >
            <RefreshCcw className="w-5 h-5 mr-2 group-hover:animate-spin" />
            Go Back
          </button>
        </div>

        {/* Animated Background Elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl animate-float"></div>
          <div className="absolute top-1/4 -left-8 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-float-delay"></div>
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-blue-500/10 rounded-full blur-xl animate-float-delay-2"></div>
        </div>
      </div>
    </div>
  );
}
