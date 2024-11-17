import AgentGridWrapper from "components/agents/agent-grid-wrapper";

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-600">
          Manage your AI assistants and integrations
        </p>
      </div>

      <div className="space-y-6">
        <section>
          <h2 className="text-lg font-semibold mb-4">Active Agents</h2>
          <AgentGridWrapper />
        </section>
      </div>
    </div>
  );
}
