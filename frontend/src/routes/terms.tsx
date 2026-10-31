import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — Amaravati Solar Solutions" },
      { name: "description", content: "Terms of use for the Amaravati Solar Solutions website." },
      { property: "og:title", content: "Terms of Use — Amaravati Solar Solutions" },
      { property: "og:description", content: "Terms for using this website." },
    ],
  }),
  component: () => (
    <section className="container-site max-w-3xl py-20">
      <h1 className="text-4xl font-extrabold">Terms of Use</h1>
      <p className="mt-6 text-lg">Content on this website is for general information. Quotations, system sizes and savings depend on a site inspection and are confirmed only in a written proposal.</p>
      <p className="mt-4 text-lg">Submitting a demo booking is a request; a booking is confirmed once our team contacts you.</p>
    </section>
  ),
});
