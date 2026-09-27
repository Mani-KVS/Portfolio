"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Monitor,
  Server,
  Database,
  Wrench,
  GraduationCap,
  BrainCircuit,
  ArrowRight,
} from "lucide-react";
import type { SkillCategory } from "@/lib/content";

interface CategoryTheme {
  shortTab: string;
  description: string;
  icon: typeof Code2;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  spotlightColor: string;
  hoverBorder: string;
}

const CATEGORY_THEMES: Record<string, CategoryTheme> = {
  programming: {
    shortTab: "Languages",
    description: "Languages I use for development and problem solving.",
    icon: Code2,
    badgeBg: "bg-blue-500/15",
    badgeBorder: "border-blue-500/40",
    badgeText: "text-blue-500 dark:text-blue-400",
    spotlightColor: "rgba(59, 130, 246, 0.16)",
    hoverBorder: "hover:border-blue-500/45",
  },
  frontend: {
    shortTab: "Frontend",
    description: "Technologies for building modern and responsive user interfaces.",
    icon: Monitor,
    badgeBg: "bg-purple-500/15",
    badgeBorder: "border-purple-500/40",
    badgeText: "text-purple-500 dark:text-purple-400",
    spotlightColor: "rgba(168, 85, 247, 0.16)",
    hoverBorder: "hover:border-purple-500/45",
  },
  backend: {
    shortTab: "Backend",
    description: "Frameworks and tools for building scalable applications.",
    icon: Server,
    badgeBg: "bg-teal-500/15",
    badgeBorder: "border-teal-500/40",
    badgeText: "text-teal-500 dark:text-teal-400",
    spotlightColor: "rgba(20, 184, 166, 0.16)",
    hoverBorder: "hover:border-teal-500/45",
  },
  database: {
    shortTab: "Databases",
    description: "Databases for data storage and management.",
    icon: Database,
    badgeBg: "bg-indigo-500/15",
    badgeBorder: "border-indigo-500/40",
    badgeText: "text-indigo-500 dark:text-indigo-400",
    spotlightColor: "rgba(99, 102, 241, 0.16)",
    hoverBorder: "hover:border-indigo-500/45",
  },
  tools: {
    shortTab: "Tools",
    description: "Tools I use for development, deployment and productivity.",
    icon: Wrench,
    badgeBg: "bg-rose-500/15",
    badgeBorder: "border-rose-500/40",
    badgeText: "text-rose-500 dark:text-rose-400",
    spotlightColor: "rgba(244, 63, 94, 0.16)",
    hoverBorder: "hover:border-rose-500/45",
  },
  core: {
    shortTab: "Core Subjects",
    description: "Key computer science subjects and fundamentals.",
    icon: GraduationCap,
    badgeBg: "bg-amber-500/15",
    badgeBorder: "border-amber-500/40",
    badgeText: "text-amber-500 dark:text-amber-400",
    spotlightColor: "rgba(245, 158, 11, 0.16)",
    hoverBorder: "hover:border-amber-500/45",
  },
  ml: {
    shortTab: "AI / ML",
    description: "Libraries and frameworks for machine learning and computer vision.",
    icon: BrainCircuit,
    badgeBg: "bg-cyan-500/15",
    badgeBorder: "border-cyan-500/40",
    badgeText: "text-cyan-500 dark:text-cyan-400",
    spotlightColor: "rgba(6, 182, 212, 0.16)",
    hoverBorder: "hover:border-cyan-500/45",
  },
};

function SkillTechIcon({ name }: { name: string }) {
  const key = name.toLowerCase().trim();

  if (key === "java") {
    return (
      <svg viewBox="0 0 40 40" className="h-8 w-8">
        <path
          d="M15 28c-4 1.5 2.5 3.2 8 1.8 2-.5 4-1.4 4-1.4s-1.2.8-2.8 1c-5.2.6-11.2.2-9.2-1.4z"
          fill="#5382a1"
        />
        <path
          d="M13.5 24.5c-3.5 1.4 2.2 2.8 8.5 1.8 2.8-.4 5-1.3 5-1.3s-1.3.7-3.2.9c-5.4.6-12.1.1-10.3-1.4z"
          fill="#5382a1"
        />
        <path
          d="M22.5 18c2.2 2.5-.6 4.8-.6 4.8s5.2-2.7 2.8-6c-2.2-3-3.9-4.5 5.3-9.5 0 0-14.5 3.6-7.5 10.7z"
          fill="#e76f00"
        />
        <path
          d="M18 9.5s-6.5 4.5-3.2 9.2c2.5 3.5-.7 5.5-.7 5.5s6.2-3.2 3.5-7.2c-2.3-3.4-4.2-5 0.4-7.5z"
          fill="#e76f00"
        />
        <path
          d="M11 31.5c5.5 1.8 14 1.6 18.5-.4 0 0 .8.7-1.5 1.4-5.5 1.7-15.2 1.6-17-.9z"
          fill="#5382a1"
        />
      </svg>
    );
  }

  if (key === "python") {
    return (
      <svg viewBox="0 0 40 40" className="h-8 w-8">
        <path
          d="M19.8 6C13.8 6 14.2 8.6 14.2 8.6v3.2h5.8v1H11.8S7.5 12.3 7.5 19c0 6.7 3.8 6.5 3.8 6.5h2.2v-3.1s-.1-3.8 3.7-3.8h6.4s3.6.1 3.6-3.5V9.4S27.7 6 19.8 6zm-3.2 2.2a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
          fill="#3776ab"
        />
        <path
          d="M20.2 34c6 0 5.6-2.6 5.6-2.6v-3.2H20v-1h8.2s4.3.5 4.3-6.2c0-6.7-3.8-6.5-3.8-6.5h-2.2v3.1s.1 3.8-3.7 3.8h-6.4s-3.6-.1-3.6 3.5v5.7S12.3 34 20.2 34zm3.2-2.2a1.2 1.2 0 110-2.4 1.2 1.2 0 010 2.4z"
          fill="#ffd343"
        />
      </svg>
    );
  }

  if (key === "c++" || key === "cpp") {
    return (
      <svg viewBox="0 0 40 40" className="h-8 w-8">
        <polygon
          points="20,4 34,12 34,28 20,36 6,28 6,12"
          fill="#00599C"
        />
        <path
          d="M20 11a9 9 0 106.5 15.2l-3-2.6A5 5 0 1120 15c1.5 0 2.8.6 3.7 1.6l2.8-2.8A8.9 8.9 0 0020 11z"
          fill="#ffffff"
        />
        <path
          d="M26.5 18.5v-2h1.5v2h2v1.5h-2v2h-1.5v-2h-2v-1.5h2zm5 0v-2H33v2h1.5v1.5H33v2h-1.5v-2H30v-1.5h1.5z"
          fill="#ffffff"
        />
      </svg>
    );
  }

  if (key === "javascript" || key === "js") {
    return (
      <svg viewBox="0 0 40 40" className="h-8 w-8">
        <rect x="6" y="6" width="28" height="28" rx="5" fill="#f7df1e" />
        <path
          d="M19 26.5c0 2.3-1.3 3.4-3.3 3.4-1.8 0-2.8-.9-3.3-2l1.8-1.1c.3.6.7 1.1 1.4 1.1.7 0 1.2-.3 1.2-1.5v-8h2.2v8.1zm6.9 3.4c-2.1 0-3.5-1-4.2-2.4l1.8-1c.5.8 1.1 1.4 2.3 1.4 1 0 1.6-.5 1.6-1.2 0-.8-.6-1.1-1.8-1.6l-.6-.3c-1.8-.8-3-1.7-3-3.7 0-1.8 1.4-3.2 3.6-3.2 1.6 0 2.7.6 3.5 2l-1.8 1.1c-.4-.7-.8-1-1.7-1-.8 0-1.3.5-1.3 1.1 0 .8.5 1.1 1.6 1.6l.6.3c2.1.9 3.3 1.8 3.3 3.8 0 2.2-1.7 3.3-3.9 3.3z"
          fill="#000000"
        />
      </svg>
    );
  }

  if (key === "sql") {
    return (
      <svg viewBox="0 0 40 40" className="h-8 w-8">
        <ellipse cx="20" cy="11" rx="11" ry="4.5" fill="#38bdf8" />
        <path
          d="M9 11v8c0 2.5 4.9 4.5 11 4.5s11-2 11-4.5v-8c0 2.5-4.9 4.5-11 4.5S9 13.5 9 11z"
          fill="#0284c7"
        />
        <path
          d="M9 19v9c0 2.5 4.9 4.5 11 4.5s11-2 11-4.5v-9c0 2.5-4.9 4.5-11 4.5S9 21.5 9 19z"
          fill="#0369a1"
        />
      </svg>
    );
  }

  if (key === "react") {
    return (
      <svg viewBox="0 0 40 40" className="h-8 w-8">
        <circle cx="20" cy="20" r="2.8" fill="#61dafb" />
        <ellipse
          cx="20"
          cy="20"
          rx="14"
          ry="5.5"
          fill="none"
          stroke="#61dafb"
          strokeWidth="1.8"
        />
        <ellipse
          cx="20"
          cy="20"
          rx="14"
          ry="5.5"
          transform="rotate(60 20 20)"
          fill="none"
          stroke="#61dafb"
          strokeWidth="1.8"
        />
        <ellipse
          cx="20"
          cy="20"
          rx="14"
          ry="5.5"
          transform="rotate(120 20 20)"
          fill="none"
          stroke="#61dafb"
          strokeWidth="1.8"
        />
      </svg>
    );
  }

  if (key === "next.js" || key === "nextjs") {
    return (
      <svg viewBox="0 0 40 40" className="h-8 w-8">
        <circle cx="20" cy="20" r="14" fill="#0f172a" stroke="#475569" strokeWidth="1.2" />
        <path
          d="M15 26V14h2.2l9.5 12.2V14H28.5v12h-2l-9.5-12.1V26H15z"
          fill="#ffffff"
        />
      </svg>
    );
  }

  if (key === "html") {
    return (
      <svg viewBox="0 0 40 40" className="h-8 w-8">
        <polygon points="8,6 32,6 29.8,30.5 20,34 10.2,30.5" fill="#e34f26" />
        <polygon points="20,8 29.8,8 27.9,28.8 20,31.5" fill="#ef652a" />
        <path
          d="M13 13h14l-.4 3.5H16.2l.3 3.5h9.8l-.8 8.2-5.5 1.6-5.5-1.6-.4-4.2h3.4l.2 2 2.3.7 2.3-.7.3-3h-8.2L13 13z"
          fill="#ffffff"
        />
      </svg>
    );
  }

  if (key === "css") {
    return (
      <svg viewBox="0 0 40 40" className="h-8 w-8">
        <polygon points="8,6 32,6 29.8,30.5 20,34 10.2,30.5" fill="#1572b6" />
        <polygon points="20,8 29.8,8 27.9,28.8 20,31.5" fill="#33a9dc" />
        <path
          d="M13 13h14l-.7 7h-9.6l.3 3.2h6l-.3 3-2.7.8-2.7-.8-.2-2h-3.4l.4 4.2 5.9 1.7 5.9-1.7 1.1-11.9H13.4L13 13z"
          fill="#ffffff"
        />
      </svg>
    );
  }

  if (key === "tailwind css" || key === "tailwindcss") {
    return (
      <svg viewBox="0 0 40 40" className="h-8 w-8">
        <path
          d="M20 12c-3.8 0-6.2 1.9-7.1 5.7 1.4-1.9 3.1-2.6 5-2.1 1.1.3 1.9 1.1 2.7 2 1.4 1.4 3 3 6.4 3 3.8 0 6.2-1.9 7.1-5.7-1.4 1.9-3.1 2.6-5 2.1-1.1-.3-1.9-1.1-2.7-2-1.4-1.4-3-3-6.4-3zm-7.1 8.6c-3.8 0-6.2 1.9-7.1 5.7 1.4-1.9 3.1-2.6 5-2.1 1.1.3 1.9 1.1 2.7 2 1.4 1.4 3 3 6.4 3 3.8 0 6.2-1.9 7.1-5.7-1.4 1.9-3.1 2.6-5 2.1-1.1-.3-1.9-1.1-2.7-2-1.4-1.4-3-3-6.4-3z"
          fill="#38bdf8"
        />
      </svg>
    );
  }

  if (key === "flask") {
    return (
      <svg viewBox="0 0 40 40" className="h-8 w-8">
        <path
          d="M16 8h8M18 8v7l-7 13a3 3 0 002.6 4.5h12.8A3 3 0 0029 28l-7-13V8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-slate-700 dark:text-slate-100"
        />
        <path d="M13.5 24h13l2 4H11.5l2-4z" fill="#38bdf8" opacity="0.7" />
      </svg>
    );
  }

  if (key === "firebase" || key === "firestore") {
    return (
      <svg viewBox="0 0 40 40" className="h-8 w-8">
        <path d="M10 29l3.8-21.5L19.5 18 10 29z" fill="#ffa000" />
        <path d="M10 29l15.5-15.5 4.5 15.5-10 5.5L10 29z" fill="#ffca28" />
        <path d="M20 11.5L15 21l-5 8 10 5.5 10-5.5-5.5-14-4.5-3.5z" fill="#f57c00" opacity="0.65" />
      </svg>
    );
  }

  if (key === "rest apis") {
    return (
      <svg viewBox="0 0 40 40" className="h-8 w-8">
        <circle
          cx="20"
          cy="20"
          r="6"
          fill="none"
          stroke="#94a3b8"
          strokeWidth="2.4"
        />
        <path
          d="M20 8v4m0 16v4M8 20h4m16 0h4m-20.5-8.5l2.8 2.8m11.4 11.4l2.8 2.8m0-17l-2.8 2.8M14.3 25.7l-2.8 2.8"
          stroke="#38bdf8"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (key === "mysql") {
    return (
      <svg viewBox="0 0 40 40" className="h-8 w-8">
        <path
          d="M10 28c1-7 5-14 13-17 2 3 4 5 7 6-3 1-5 3-6 6 2 1 4 3 5 6-4-2-7-2-10 0-3 1-6 1-9-1z"
          fill="none"
          stroke="#00758f"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="23" cy="14" r="1.4" fill="#f29111" />
      </svg>
    );
  }

  if (key === "mongodb") {
    return (
      <svg viewBox="0 0 40 40" className="h-8 w-8">
        <path
          d="M20 6s-8 6.5-8 15c0 6.5 5 11 8 13 3-2 8-6.5 8-13 0-8.5-8-15-8-15z"
          fill="#10aa50"
        />
        <path d="M20 6v28c3-2 8-6.5 8-13 0-8.5-8-15-8-15z" fill="#13aa52" />
        <line x1="20" y1="26" x2="20" y2="36" stroke="#a6a385" strokeWidth="2" />
      </svg>
    );
  }

  if (key === "git") {
    return (
      <svg viewBox="0 0 40 40" className="h-8 w-8">
        <rect
          x="10"
          y="10"
          width="20"
          height="20"
          rx="3.5"
          transform="rotate(45 20 20)"
          fill="#f05032"
        />
        <path
          d="M16 14l8 8m-4-4v8"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="20" cy="18" r="2" fill="#ffffff" />
        <circle cx="24" cy="22" r="2" fill="#ffffff" />
        <circle cx="20" cy="26" r="2" fill="#ffffff" />
      </svg>
    );
  }

  if (key === "github") {
    return (
      <svg viewBox="0 0 40 40" className="h-8 w-8">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20 7a13 13 0 00-4.1 25.3c.6.1.9-.3.9-.6v-2.2c-3.6.8-4.4-1.7-4.4-1.7-.6-1.5-1.4-1.9-1.4-1.9-1.2-.8.1-.8.1-.8 1.3.1 2 1.3 2 1.3 1.1 2 3 1.4 3.8 1.1.1-.8.4-1.4.8-1.7-2.9-.3-5.9-1.4-5.9-6.4 0-1.4.5-2.6 1.3-3.5-.1-.3-.6-1.7.1-3.5 0 0 1.1-.3 3.6 1.3a12.4 12.4 0 016.4 0c2.5-1.6 3.6-1.3 3.6-1.3.7 1.8.2 3.2.1 3.5.8.9 1.3 2.1 1.3 3.5 0 5-3 6.1-5.9 6.4.5.4.9 1.2.9 2.4v3.5c0 .3.3.7.9.6A13 13 0 0020 7z"
          className="fill-slate-800 dark:fill-white"
        />
      </svg>
    );
  }

  if (key === "vs code") {
    return (
      <svg viewBox="0 0 40 40" className="h-8 w-8">
        <path
          d="M28 7l6 3v20l-6 3-13-11.5L9.5 26 7 24.5v-9L9.5 14 15 18.5 28 7z"
          fill="#007acc"
        />
        <path d="M28 13v14l-8.5-7L28 13z" fill="#0f172a" opacity="0.35" />
      </svg>
    );
  }

  if (key === "docker") {
    return (
      <svg viewBox="0 0 40 40" className="h-8 w-8">
        <rect x="11" y="17" width="3.5" height="3.2" fill="#2496ed" />
        <rect x="15.2" y="17" width="3.5" height="3.2" fill="#2496ed" />
        <rect x="19.4" y="17" width="3.5" height="3.2" fill="#2496ed" />
        <rect x="15.2" y="13.2" width="3.5" height="3.2" fill="#2496ed" />
        <rect x="19.4" y="13.2" width="3.5" height="3.2" fill="#2496ed" />
        <path
          d="M7 21.5h21c1.8 0 3.2-1 4-2.5 1.5.5 2.5 1.8 2.2 3.5-1.2 5.5-6.2 8.5-14.2 8.5-7.5 0-12-3.5-13-9.5z"
          fill="#2496ed"
        />
      </svg>
    );
  }

  if (key === "kubernetes") {
    return (
      <svg viewBox="0 0 40 40" className="h-8 w-8">
        <polygon
          points="20,6 32,13 32,27 20,34 8,27 8,13"
          fill="#326ce5"
        />
        <circle cx="20" cy="20" r="6" fill="none" stroke="#ffffff" strokeWidth="1.8" />
        <circle cx="20" cy="20" r="2" fill="#ffffff" />
        <path
          d="M20 11v3m0 12v3m-9-9h3m12 0h3m-14.4-6.4l2.1 2.1m8.6 8.6l2.1 2.1m0-12.8l-2.1 2.1m-8.6 8.6l-2.1 2.1"
          stroke="#ffffff"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (key.includes("oci") || key.includes("oracle")) {
    return (
      <svg viewBox="0 0 40 40" className="h-8 w-8">
        <path
          d="M13 26h14a6 6 0 001-11.9A8 8 0 0012.5 13 5.5 5.5 0 0013 26z"
          fill="none"
          stroke="#f80000"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (key.includes("data structures")) {
    return (
      <svg viewBox="0 0 40 40" className="h-8 w-8">
        <line x1="20" y1="12" x2="12" y2="26" stroke="#22c55e" strokeWidth="2.2" />
        <line x1="20" y1="12" x2="28" y2="26" stroke="#22c55e" strokeWidth="2.2" />
        <line x1="12" y1="26" x2="28" y2="26" stroke="#22c55e" strokeWidth="2.2" />
        <circle cx="20" cy="12" r="3.5" fill="#22c55e" />
        <circle cx="12" cy="26" r="3.5" fill="#22c55e" />
        <circle cx="28" cy="26" r="3.5" fill="#22c55e" />
      </svg>
    );
  }

  if (key.includes("oop") || key.includes("object-oriented")) {
    return (
      <svg viewBox="0 0 40 40" className="h-8 w-8">
        <polygon
          points="20,8 31,14 31,26 20,32 9,26 9,14"
          fill="none"
          stroke="#a855f7"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          d="M9 14l11 6 11-6M20 20v12"
          fill="none"
          stroke="#a855f7"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (key === "dbms") {
    return (
      <svg viewBox="0 0 40 40" className="h-8 w-8">
        <ellipse cx="20" cy="12" rx="10" ry="4" fill="#f43f5e" />
        <path
          d="M10 12v7c0 2.2 4.5 4 10 4s10-1.8 10-4v-7M10 19v8c0 2.2 4.5 4 10 4s10-1.8 10-4v-8"
          fill="none"
          stroke="#f43f5e"
          strokeWidth="2.2"
        />
      </svg>
    );
  }

  if (key === "operating systems") {
    return (
      <svg viewBox="0 0 40 40" className="h-8 w-8">
        <rect
          x="8"
          y="10"
          width="24"
          height="16"
          rx="2.5"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2.2"
        />
        <path
          d="M15 31h10M20 26v5"
          stroke="#3b82f6"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (key === "computer networks") {
    return (
      <svg viewBox="0 0 40 40" className="h-8 w-8">
        <path
          d="M8 17a17 17 0 0124 0M12 22a11 11 0 0116 0M16 27a5.5 5.5 0 018 0"
          fill="none"
          stroke="#f43f5e"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <circle cx="20" cy="31" r="2" fill="#f43f5e" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 40 40" className="h-8 w-8">
      <circle
        cx="20"
        cy="20"
        r="11"
        fill="none"
        stroke="#06b6d4"
        strokeWidth="2.2"
      />
      <circle cx="20" cy="20" r="4" fill="#06b6d4" />
    </svg>
  );
}

function SkillCategoryGlassCard({
  category,
  index,
}: {
  category: SkillCategory;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  const theme = CATEGORY_THEMES[category.id] ?? CATEGORY_THEMES.programming;
  const Icon = theme.icon;

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  };

  const handlePointerLeave = () => {
    setMousePos((prev) => ({ ...prev, active: false }));
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/38 p-6 shadow-[var(--shadow-soft)] backdrop-blur-md transition-all duration-300 ${theme.hoverBorder}`}
    >
      {/* Interactive cursor-following glass refraction spotlight inside the card */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: mousePos.active ? 1 : 0,
          background: `radial-gradient(340px circle at ${mousePos.x}px ${mousePos.y}px, ${theme.spotlightColor}, transparent 72%)`,
        }}
      />

      {/* Top Row: Category Icon Badge + Title & Subtitle + Arrow Circle */}
      <div className="relative z-10 flex items-start justify-between gap-3.5">
        <div className="flex items-start gap-3.5">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${theme.badgeBorder} ${theme.badgeBg} ${theme.badgeText} shadow-xs transition-transform duration-300 group-hover:scale-105`}
          >
            <Icon size={22} />
          </div>

          <div>
            <h3 className="font-[var(--font-display)] text-base font-bold tracking-tight text-[var(--color-ink)] sm:text-lg">
              {category.title}
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-[var(--color-ink-muted)]">
              {theme.description}
            </p>
          </div>
        </div>

        <span
          aria-hidden="true"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg)]/50 text-[var(--color-ink-muted)] transition-all duration-300 group-hover:translate-x-0.5 group-hover:border-[var(--color-accent-solid)]/50 group-hover:text-[var(--color-ink)]"
        >
          <ArrowRight size={14} />
        </span>
      </div>

      {/* Inner Skill Mini-Tiles Grid (Translucent glass so cursor trail shines through) */}
      <div className="relative z-10 mt-6 flex flex-wrap justify-center gap-2.5 sm:justify-start">
        {category.skills.map((skill) => (
          <div
            key={skill}
            className="flex min-w-[76px] flex-1 basis-[82px] flex-col items-center justify-center gap-2 rounded-xl border border-[var(--color-border)]/80 bg-[var(--color-bg)]/42 px-2.5 py-3 text-center backdrop-blur-xs transition-all duration-200 hover:-translate-y-1 hover:border-[var(--color-accent-solid)]/55 hover:bg-[var(--color-surface)]/65"
          >
            <SkillTechIcon name={skill} />
            <span className="text-[11px] font-medium leading-tight text-[var(--color-ink)]">
              {skill}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function Skills({ categories }: { categories: SkillCategory[] }) {
  const [selectedId, setSelectedId] = useState<string>("all");

  // Default to showing the 6 primary reference categories in "All", or the selected category
  const visibleCategories =
    selectedId === "all"
      ? categories
      : categories.filter((c) => c.id === selectedId);

  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-5 py-20 sm:py-24">
      {/* Centered Header matching reference image */}
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2.5 rounded-full border border-blue-500/35 bg-blue-500/10 px-4 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-blue-500 dark:text-sky-400">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500 dark:bg-sky-400" />
          MY SKILLS
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500 dark:bg-sky-400" />
        </span>

        <h2 className="mt-4 font-[var(--font-display)] text-3xl font-extrabold tracking-tight text-[var(--color-ink)] sm:text-4xl lg:text-[2.65rem]">
          Technologies I{" "}
          <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-sky-400 bg-clip-text text-transparent">
            Work With
          </span>
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-muted)] sm:text-base">
          A collection of technologies, tools and concepts I use to build, learn
          and solve real-world problems.
        </p>
      </div>

      {/* Category Filter Pill Tabs */}
      <div
        role="tablist"
        aria-label="Filter skills by category"
        className="mt-8 flex flex-wrap items-center justify-center gap-2.5"
      >
        <button
          type="button"
          role="tab"
          aria-selected={selectedId === "all"}
          onClick={() => setSelectedId("all")}
          className={`cursor-pointer rounded-full px-5 py-2 text-xs font-semibold transition-all duration-200 sm:text-sm ${
            selectedId === "all"
              ? "border border-blue-400/50 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_0_22px_rgba(59,130,246,0.45)]"
              : "border border-[var(--color-border)] bg-[var(--color-surface)]/42 text-[var(--color-ink-muted)] backdrop-blur-md hover:border-blue-500/40 hover:text-[var(--color-ink)]"
          }`}
        >
          All
        </button>

        {categories.map((cat) => {
          const theme = CATEGORY_THEMES[cat.id];
          const tabLabel = theme?.shortTab ?? cat.title;
          const isActive = selectedId === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setSelectedId(cat.id)}
              className={`cursor-pointer rounded-full px-5 py-2 text-xs font-semibold transition-all duration-200 sm:text-sm ${
                isActive
                  ? "border border-blue-400/50 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_0_22px_rgba(59,130,246,0.45)]"
                  : "border border-[var(--color-border)] bg-[var(--color-surface)]/42 text-[var(--color-ink-muted)] backdrop-blur-md hover:border-blue-500/40 hover:text-[var(--color-ink)]"
              }`}
            >
              {tabLabel}
            </button>
          );
        })}
      </div>

      {/* Translucent Glass Category Cards Grid */}
      <motion.div
        layout
        className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {visibleCategories.map((category, idx) => (
            <SkillCategoryGlassCard
              key={category.id}
              category={category}
              index={idx}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
