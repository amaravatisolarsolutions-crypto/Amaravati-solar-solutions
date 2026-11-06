import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/solar-calculation")({
  beforeLoad: () => {
    throw redirect({ to: "/solar-calculator" });
  },
  component: () => null,
});

