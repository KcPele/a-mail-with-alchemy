import { Suspense } from "react";
import dynamic from "next/dynamic";
import Loading from "@/components/ui/loading";

// Import AgentGrid with no SSR to avoid hydration issues
const AgentGrid = dynamic(() => import("@/components/agents/agent-grid"), {
  ssr: false,
  loading: () => <Loading />,
});

export default function AgentsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">AI Agents Dashboard</h1>
      <AgentGrid />
    </div>
  );
}
