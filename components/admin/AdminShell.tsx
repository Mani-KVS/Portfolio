"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  User,
  Sparkles,
  FolderGit2,
  Award,
  FileText,
  Mail,
  MessageSquare,
  Settings,
  LogIn,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/dashboard/about", label: "About", icon: User },
  { href: "/admin/dashboard/skills", label: "Skills", icon: Sparkles },
  { href: "/admin/dashboard/projects", label: "Projects", icon: FolderGit2 },
  { href: "/admin/dashboard/certificates", label: "Certificates", icon: Award },
  { href: "/admin/dashboard/resume", label: "Resume", icon: FileText },
  { href: "/admin/dashboard/messages", label: "Messages", icon: Mail },
  { href: "/admin/dashboard/comments", label: "Comments", icon: MessageSquare },
  { href: "/admin/dashboard/settings", label: "Settings", icon: Settings },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    fetch("/api/admin/session")
      .then((res) => res.json())
      .then((data) => setAuthed(Boolean(data.authed)));
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setLoginError(body.error || "Login failed.");
      return;
    }
    setAuthed(true);
  }

  async function handleLogout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    setAuthed(false);
    router.push("/admin/dashboard");
  }

  if (authed === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-accent-solid)] border-t-transparent" />
      </div>
    );
  }

  if (!authed) {
    return (
      <main className="relative flex min-h-screen items-center justify-center px-5">
        <div className="ambient-glow absolute -left-24 -top-24 h-96 w-96 rounded-full" />
        <div className="ambient-glow absolute -right-24 bottom-0 h-96 w-96 rounded-full" />
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleLogin}
          className="glass-card w-full max-w-sm rounded-3xl p-8"
        >
          <div className="gradient-button mx-auto flex h-12 w-12 items-center justify-center rounded-2xl">
            <LogIn size={20} className="text-white" />
          </div>
          <h1 className="mt-4 text-center font-[var(--font-display)] text-xl font-bold">Admin Login</h1>
          <p className="mt-1 text-center text-xs text-[var(--color-ink-muted)] dark:text-[var(--color-dark-ink-muted)]">
            Enter your admin password to manage the portfolio.
          </p>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="mt-6 w-full rounded-xl border border-[var(--color-border)] bg-transparent px-4 py-3 text-sm outline-none focus:border-[var(--color-accent-solid)] dark:border-[var(--color-dark-border)] dark:focus:border-[var(--color-dark-accent-solid)]"
          />
          <button
            type="submit"
            className="gradient-button mt-4 flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-white"
          >
            Log in
          </button>
          {loginError && <p className="mt-3 text-center text-xs text-red-500">{loginError}</p>}
        </motion.form>
      </main>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar (desktop) */}
      <aside className="glass-card sticky top-0 hidden h-screen w-64 shrink-0 flex-col rounded-none border-y-0 border-l-0 p-5 lg:flex">
        <div className="flex items-center gap-2 px-2">
          <span className="gradient-button flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold text-white">
            A
          </span>
          <span className="font-[var(--font-display)] font-bold">Admin</span>
        </div>

        <nav className="mt-8 flex-1 space-y-1">
          {NAV.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "gradient-button text-white shadow-[0_4px_16px_-6px_var(--color-glow)] dark:shadow-[0_4px_16px_-6px_var(--color-dark-glow)]"
                    : "text-[var(--color-ink-muted)] hover:bg-[var(--color-accent-tint)] hover:text-[var(--color-ink)] dark:text-[var(--color-dark-ink-muted)] dark:hover:bg-[var(--color-dark-accent-tint)] dark:hover:text-[var(--color-dark-ink)]"
                }`}
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-1 border-t border-[var(--color-border)] pt-4 dark:border-[var(--color-dark-border)]">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--color-ink-muted)] hover:bg-[var(--color-accent-tint)] dark:text-[var(--color-dark-ink-muted)] dark:hover:bg-[var(--color-dark-accent-tint)]"
          >
            <ExternalLink size={16} />
            View Site
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-500/10"
          >
            <LogOut size={16} />
            Log Out
          </button>
        </div>
      </aside>

      {/* Mobile topbar */}
      <div className="glass-card fixed inset-x-0 top-0 z-40 flex items-center justify-between rounded-none px-4 py-3 lg:hidden">
        <button onClick={() => setMobileOpen(true)} aria-label="Open menu">
          <Menu size={20} />
        </button>
        <span className="font-[var(--font-display)] font-bold">Admin</span>
        <ThemeToggle />
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="glass-card h-full w-72 bg-[var(--color-surface-solid)] p-5 dark:bg-[var(--color-dark-surface-solid)]">
            <div className="mb-6 flex items-center justify-between">
              <span className="font-[var(--font-display)] font-bold">Admin</span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X size={18} />
              </button>
            </div>
            <nav className="space-y-1">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium ${
                    pathname === item.href
                      ? "gradient-button text-white"
                      : "text-[var(--color-ink-muted)] dark:text-[var(--color-dark-ink-muted)]"
                  }`}
                >
                  <item.icon size={16} />
                  {item.label}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500"
              >
                <LogOut size={16} />
                Log Out
              </button>
            </nav>
          </div>
          <div className="flex-1 bg-black/40" onClick={() => setMobileOpen(false)} />
        </div>
      )}

      <div className="flex-1 px-5 pb-16 pt-20 lg:px-10 lg:pt-10">
        <div className="mx-auto hidden max-w-5xl items-center justify-end gap-3 lg:flex">
          <ThemeToggle />
        </div>
        <div className="mx-auto max-w-5xl">{children}</div>
      </div>
    </div>
  );
}
