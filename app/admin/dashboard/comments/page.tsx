"use client";

import { useEffect, useState } from "react";
import { Check, X, Trash2 } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminUI";
import { Avatar } from "@/components/ui/Avatar";
import { StarRating } from "@/components/ui/StarRating";

interface AdminComment {
  id: string;
  name: string;
  email: string;
  message: string;
  rating?: number;
  status: "pending" | "approved" | "rejected";
}

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<AdminComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending");

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/comments");
    if (res.ok) {
      const data = await res.json();
      setComments(data.comments || []);
    }
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- standard fetch-on-mount pattern
    load();
  }, []);

  async function updateStatus(id: string, status: "approved" | "rejected") {
    await fetch("/api/admin/comments", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    load();
  }

  async function remove(id: string) {
    await fetch("/api/admin/comments", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  }

  const filtered = filter === "all" ? comments : comments.filter((c) => c.status === filter);

  return (
    <div>
      <AdminPageHeader title="Comments" description="Approve, reject, or delete guestbook submissions." />

      <div className="mb-5 flex flex-wrap gap-2">
        {(["pending", "approved", "rejected", "all"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold capitalize transition-colors ${
              filter === f ? "gradient-button text-white" : "glass-card"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading && <p className="text-sm text-[var(--color-ink-muted)]">Loading…</p>}

      <div className="space-y-3">
        {!loading && filtered.length === 0 && (
          <div className="glass-card rounded-3xl p-10 text-center text-sm text-[var(--color-ink-muted)] dark:text-[var(--color-dark-ink-muted)]">
            No {filter !== "all" ? filter : ""} comments.
          </div>
        )}
        {filtered.map((c) => (
          <div key={c.id} className="glass-card rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <Avatar name={c.name} />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-semibold">
                    {c.name} <span className="font-normal text-[var(--color-ink-muted)]">({c.email})</span>
                  </p>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${
                      c.status === "approved"
                        ? "bg-emerald-500/15 text-emerald-500"
                        : c.status === "rejected"
                        ? "bg-red-500/15 text-red-500"
                        : "bg-amber-500/15 text-amber-500"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>
                {c.rating && <StarRating value={c.rating} readonly size={12} />}
                <p className="mt-1.5 text-sm text-[var(--color-ink-muted)] dark:text-[var(--color-dark-ink-muted)]">
                  {c.message}
                </p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => updateStatus(c.id, "approved")}
                    className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-500 hover:bg-emerald-500/20"
                  >
                    <Check size={12} /> Approve
                  </button>
                  <button
                    onClick={() => updateStatus(c.id, "rejected")}
                    className="flex items-center gap-1 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-500 hover:bg-amber-500/20"
                  >
                    <X size={12} /> Reject
                  </button>
                  <button
                    onClick={() => remove(c.id)}
                    className="flex items-center gap-1 rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-500 hover:bg-red-500/20"
                  >
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
