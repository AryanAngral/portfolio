"use client";

import { useState } from "react";

type Node = { id: string; label: string; icon: string; detail: string };

const NODES: Node[] = [
  { id: "gh", label: "GitHub", icon: "🐙", detail: "Source of truth. A push to main triggers everything downstream." },
  { id: "actions", label: "GitHub Actions", icon: "⚙️", detail: "CI/CD workflows: lint, test, build, and deploy — no manual steps." },
  { id: "wif", label: "Workload Identity Federation", icon: "🔑", detail: "Keyless auth from Actions to GCP. No long-lived service-account keys ever stored." },
  { id: "tf", label: "Terraform", icon: "🏗️", detail: "All infra as code: RBAC, custom IAM roles, security policies, and observability alerts." },
  { id: "run", label: "Cloud Run", icon: "🚀", detail: "Containerized services, autoscaled to demand, zero-downtime rollouts." },
  { id: "gke", label: "GKE", icon: "☸️", detail: "Kubernetes for the heavier, long-running workloads." },
  { id: "vertex", label: "Vertex AI", icon: "🧠", detail: "Managed pipelines serving the production ML models." },
];

const FLOW = [["gh"], ["actions"], ["wif"], ["tf"], ["run", "gke", "vertex"]];

export default function Architecture() {
  const [active, setActive] = useState<Node>(NODES[2]);

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <h3 className="mb-1 font-semibold">Straatix cloud architecture</h3>
      <p className="mb-5 text-xs text-muted">Tap any node to see what I did there.</p>

      <div className="flex flex-col gap-3">
        {FLOW.map((row, ri) => (
          <div key={ri} className="flex flex-col items-stretch">
            <div className="flex flex-wrap justify-center gap-2">
              {row.map((id) => {
                const node = NODES.find((n) => n.id === id)!;
                const on = active.id === id;
                return (
                  <button
                    key={id}
                    onClick={() => setActive(node)}
                    className={`flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-sm transition-all cursor-pointer ${
                      on
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-border bg-surface-2 text-muted hover:border-accent hover:text-foreground"
                    }`}
                  >
                    <span className="text-base">{node.icon}</span>
                    <span className="font-mono text-xs">{node.label}</span>
                  </button>
                );
              })}
            </div>
            {ri < FLOW.length - 1 && (
              <div className="my-1 flex justify-center text-muted" aria-hidden>
                ↓
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-xl bg-surface-2 p-4">
        <p className="flex items-center gap-2 text-sm font-medium">
          <span>{active.icon}</span> {active.label}
        </p>
        <p className="mt-1 text-sm text-muted">{active.detail}</p>
      </div>
    </div>
  );
}
