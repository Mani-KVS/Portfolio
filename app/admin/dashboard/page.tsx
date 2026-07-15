"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FolderGit2, Award, Sparkles, MessageSquare, Mail, FileEdit } from "lucide-react";
import { AdminPageHeader, StatCard } from "@/components/admin/AdminUI";

interface Overview {
  projects: number;
  certifications: number;
  skillCategories: number;
  pendingComments: number;
  unreadMessages: number;
}

export default function AdminOverviewPage() {
  const [data, setData] = useState<Overview | null>(null);

  useEffect(() => {
    fetch("/api/admin/overview")
      .then((res) => res.json())
      .then(setData)
      .catch(() => setData(null));
  }, []);

  return (
    <div>
      <AdminPageHeader title="Dashboard" description="A quick overview of your portfolio." />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard icon={<FolderGit2 size={18} />} label="Projects" value={data?.projects ?? 0} loading={!data} />
        <StatCard icon={<Award size={18} />} label="Certificates" value={data?.certifications ?? 0} loading={!data} />
        <StatCard icon={<Sparkles size={18} />} label="Skill Categories" value={data?.skillCategories ?? 0} loading={!data} />
        <StatCard icon={<MessageSquare size={18} />} label="Pending Comments" value={data?.pendingComments ?? 0} loading={!data} />
        <StatCard icon={<Mail size={18} />} label="Unread Messages" value={data?.unreadMessages ?? 0} loading={!data} />
      </div>

      <div className="glass-card mt-8 rounded-3xl p-6">
        <h2 className="font-[var(--font-display)] font-bold">Quick actions</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/admin"
            className="gradient-button flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white"
          >
            <FileEdit size={14} />
            Edit Content in TinaCMS
          </Link>
          <Link
            href="/admin/dashboard/comments"
            className="glass-card flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold"
          >
            <MessageSquare size={14} />
            Review Comments
          </Link>
          <Link
            href="/admin/dashboard/messages"
            className="glass-card flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold"
          >
            <Mail size={14} />
            Check Messages
          </Link>
        </div>
      </div>
    </div>
  );
}
