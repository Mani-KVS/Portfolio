"use client";

import { useEffect, useState } from "react";
import { Mail, MailOpen, Trash2 } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminUI";

interface AdminMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/messages");
    if (res.ok) {
      const data = await res.json();
      setMessages(data.messages || []);
    }
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- standard fetch-on-mount pattern
    load();
  }, []);

  async function toggleRead(id: string, read: boolean) {
    await fetch("/api/admin/messages", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, read: !read }),
    });
    load();
  }

  async function remove(id: string) {
    await fetch("/api/admin/messages", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  }

  return (
    <div>
      <AdminPageHeader title="Messages" description="Everything submitted through your Contact form." />

      {loading && <p className="text-sm text-[var(--color-ink-muted)]">Loading…</p>}

      <div className="space-y-3">
        {!loading && messages.length === 0 && (
          <div className="glass-card rounded-3xl p-10 text-center text-sm text-[var(--color-ink-muted)] dark:text-[var(--color-dark-ink-muted)]">
            No messages yet.
          </div>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            className={`glass-card rounded-2xl p-4 ${!m.read ? "border-l-4 border-l-[var(--color-accent-solid)]" : ""}`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-semibold">
                {m.name} <span className="font-normal text-[var(--color-ink-muted)]">({m.email})</span>
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleRead(m.id, m.read)}
                  className="glass-card flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium"
                >
                  {m.read ? <Mail size={12} /> : <MailOpen size={12} />}
                  {m.read ? "Mark unread" : "Mark read"}
                </button>
                <button
                  onClick={() => remove(m.id)}
                  className="flex items-center gap-1 rounded-full border border-red-300 px-2.5 py-1 text-[11px] font-medium text-red-500 hover:bg-red-500/10"
                >
                  <Trash2 size={12} />
                  Delete
                </button>
              </div>
            </div>
            <p className="mt-2 text-sm text-[var(--color-ink-muted)] dark:text-[var(--color-dark-ink-muted)]">
              {m.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
