import { useCallback, useState } from "react";

interface LoginButtonProps {
  onLogin: (address: string) => void;
}

export function LoginButton({ onLogin }: LoginButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleLogin = useCallback(async () => {
    setLoading(true);
    try {
      // const connector = new AccountKitConnector({
      //   apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY!,
      //   chain: arbitrum,
      // });
      // const email = prompt("Enter your email to login with passkey:");
      // if (!email) return;
      // await connector.connectWithPasskey(email);
      // const address = connector.getAddress();
      // if (address) {
      //   onLogin(address);
      // }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  }, [onLogin]);

  return (
    <button
      onClick={handleLogin}
      disabled={loading}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
    >
      {loading ? "Connecting..." : "Login with Email"}
    </button>
  );
}
