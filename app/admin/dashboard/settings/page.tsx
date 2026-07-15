"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminUI";

interface SettingsStatus {
  tina: boolean;
  firebaseClient: boolean;
  firebaseAdmin: boolean;
  resend: boolean;
  adminPassword: boolean;
}

const ITEMS: { key: keyof SettingsStatus; label: string; hint: string }[] = [
  { key: "tina", label: "TinaCMS", hint: "Editing at /admin commits to GitHub" },
  { key: "firebaseClient", label: "Firebase (client)", hint: "Guestbook reads/writes from the public site" },
  { key: "firebaseAdmin", label: "Firebase (admin)", hint: "Comment & message moderation in this dashboard" },
  { key: "resend", label: "Resend email", hint: "Contact form + new-comment notifications" },
  { key: "adminPassword", label: "Admin password", hint: "Protects this dashboard" },
];

export default function AdminSettingsPage() {
  const [status, setStatus] = useState<SettingsStatus | null>(null);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then(setStatus)
      .catch(() => setStatus(null));
  }, []);

  return (
    <div>
      <AdminPageHeader
        title="Settings"
        description="Connection status for every integration. Configure these via environment variables — see the README."
      />

      <div className="glass-card divide-y divide-[var(--color-border)] rounded-3xl dark:divide-[var(--color-dark-border)]">
        {ITEMS.map((item) => {
          const connected = status?.[item.key];
          return (
            <div key={item.key} className="flex items-center justify-between gap-4 p-5">
              <div>
                <p className="text-sm font-semibold">{item.label}</p>
                <p className="text-xs text-[var(--color-ink-muted)] dark:text-[var(--color-dark-ink-muted)]">
                  {item.hint}
                </p>
              </div>
              {status === null ? (
                <span className="text-xs text-[var(--color-ink-muted)]">Checking…</span>
              ) : connected ? (
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-500">
                  <CheckCircle2 size={13} />
                  Connected
                </span>
              ) : (
                <span className="flex items-center gap-1.5 rounded-full bg-red-500/15 px-3 py-1 text-xs font-semibold text-red-500">
                  <XCircle size={13} />
                  Not configured
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
