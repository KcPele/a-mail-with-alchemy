"use client";

import dynamic from "next/dynamic";
import Loading from "@/components/ui/loading";

const AgentGrid = dynamic(() => import("./agent-grid"), {
  ssr: false,
  loading: () => <Loading />,
});

export default function AgentGridWrapper() {
  return <AgentGrid />;
}
