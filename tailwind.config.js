/** @type {import('tailwindcss').Config} */
import { withAccountKitUi, createColorSet } from "@account-kit/react/tailwind";

export default withAccountKitUi(
  {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {},
    },
  },
  {
    colors: {
      // Button colors
      "btn-primary": createColorSet("#2563eb", "#3b82f6"), // Blue colors for primary button
      "btn-secondary": createColorSet("#4b5563", "#6b7280"), // Gray colors for secondary button
      "btn-auth": createColorSet("#2563eb", "#3b82f6"), // Blue colors for auth button

      // Foreground colors
      "fg-primary": createColorSet("#1f2937", "#f9fafb"),
      "fg-secondary": createColorSet("#4b5563", "#9ca3af"),
      "fg-invert": createColorSet("#ffffff", "#000000"),

      // Border colors
      active: createColorSet("#2563eb", "#3b82f6"),
      static: createColorSet("#e5e7eb", "#374151"),
      critical: createColorSet("#ef4444", "#dc2626"),
    },
    borderRadius: "md", // 16px border radius
  }
);
