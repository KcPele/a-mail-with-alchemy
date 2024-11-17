"use client";

import Loading from "components/ui/loading";
import dynamic from "next/dynamic";

const AgentGrid = dynamic(() => import("./agent-grid"), {
  ssr: false,
  loading: () => <Loading />,
});

export default function AgentGridWrapper() {
  return <AgentGrid />;
}
