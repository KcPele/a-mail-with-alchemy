import AgentGridWrapper from "@/components/agents/agent-grid-wrapper";

export default function AgentsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">AI Agents Dashboard</h1>
      <AgentGridWrapper />
    </div>
  );
}
