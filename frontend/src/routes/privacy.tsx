import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Amaravati Solar Solutions" },
      { name: "description", content: "How Amaravati Solar Solutions handles information submitted through this website." },
      { property: "og:title", content: "Privacy Policy — Amaravati Solar Solutions" },
      { property: "og:description", content: "How we handle your information." },
    ],
  }),
  component: () => (
    <section className="container-site max-w-3xl py-20">
      <h1 className="text-4xl font-extrabold">Privacy Policy</h1>
      <p className="mt-6 text-lg">Information you submit through our enquiry and demo booking forms (name, phone, email, city and project details) is used only to respond to your request and provide our services. We do not sell your information.</p>
      <p className="mt-4 text-lg">To request access to or deletion of your information, please contact us through the Contact page.</p>
    </section>
  ),
});
