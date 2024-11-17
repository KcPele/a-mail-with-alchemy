/** @type {import('tailwindcss').Config} */
import { withAccountKitUi } from "@account-kit/react/tailwind";

export default withAccountKitUi({
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        primary: "hsl(var(--primary))",
      },
    },
  },
  plugins: [],
});
