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
      extend: {
        animation: {
          "gradient-x": "gradient-x 15s ease infinite",
          "fade-in": "fade-in 1s ease-out",
          "count-up": "count-up 2s ease-out forwards",
          bounce: "bounce 1s infinite",
          ripple: "ripple 2s cubic-bezier(0, 0, 0.2, 1) infinite",
          "ripple-delay": "ripple 2s cubic-bezier(0, 0, 0.2, 1) infinite 1s",
          float: "float 6s ease-in-out infinite",
          "float-delay": "float 6s ease-in-out infinite 2s",
          "float-delay-2": "float 6s ease-in-out infinite 4s",
          "fade-in": "fade-in 1s ease-out forwards",
          "fade-in-delay": "fade-in 1s ease-out 0.5s forwards",
          "fade-in-delay-2": "fade-in 1s ease-out 1s forwards",
        },
        keyframes: {
          "gradient-x": {
            "0%, 100%": {
              "background-size": "200% 200%",
              "background-position": "left center",
            },
            "50%": {
              "background-size": "200% 200%",
              "background-position": "right center",
            },
          },
          "fade-in": {
            "0%": {
              opacity: "0",
              transform: "translateY(10px)",
            },
            "100%": {
              opacity: "1",
              transform: "translateY(0)",
            },
          },
          "count-up": {
            "0%": {
              transform: "translateY(20px)",
              opacity: "0",
            },
            "100%": {
              transform: "translateY(0)",
              opacity: "1",
            },
          },
          ripple: {
            "0%": { transform: "scale(0.8)", opacity: "1" },
            "100%": { transform: "scale(2)", opacity: "0" },
          },
          float: {
            "0%, 100%": { transform: "translateY(0)" },
            "50%": { transform: "translateY(-20px)" },
          },
          "fade-in": {
            "0%": { opacity: "0", transform: "translateY(10px)" },
            "100%": { opacity: "1", transform: "translateY(0)" },
          },
        },
      },
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
