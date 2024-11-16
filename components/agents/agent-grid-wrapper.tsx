"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import Loading from "@/components/ui/loading";

const AgentGrid = dynamic(() => import("./agent-grid"), {
  loading: () => <Loading />,
});

export default function AgentGridWrapper() {
  return (
    <Suspense fallback={<Loading />}>
      <AgentGrid />
    </Suspense>
  );
}
