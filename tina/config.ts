import { defineConfig } from "tinacms";

export default defineConfig({
  // UPDATED: Added Vercel's native git branch variable check
  branch:
    process.env.VERCEL_GIT_COMMIT_REF ||
    process.env.NEXT_PUBLIC_TINA_BRANCH ||
    process.env.HEAD ||
    "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "site",
        label: "Site (Hero / About / Contact)",
        path: "content",
        format: "json",
        match: { include: "site" },
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              { type: "string", name: "name", label: "Full Name" },
              { type: "string", name: "role", label: "Role / Title" },
              { type: "string", name: "tagline", label: "Short Introduction", ui: { component: "textarea" } },
              { type: "image", name: "profileImage", label: "Profile Photo" },
              { type: "string", name: "resumeUrl", label: "Resume File Path" },
              { type: "string", name: "location", label: "Location" },
              {
                type: "string",
                name: "workstationImage",
                label: "Hero Workstation Image URL",
                description: "Paste any image URL (Pexels, Unsplash, or your own hosted photo) to swap the hero visual — no code changes needed.",
              },
              { type: "string", name: "workstationImageAlt", label: "Workstation Image Alt Text" },
            ],
          },
          {
            type: "object",
            name: "stats",
            label: "Stats / Achievements",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.label }) },
            fields: [
              { type: "string", name: "label", label: "Label" },
              { type: "number", name: "value", label: "Value" },
              { type: "string", name: "suffix", label: "Suffix (e.g. +)" },
              {
                type: "string",
                name: "icon",
                label: "Icon (lucide-react name, e.g. Code2, Trophy, Rocket, CheckCircle2)",
              },
            ],
          },
          {
            type: "object",
            name: "about",
            label: "About Section",
            fields: [
              { type: "string", name: "intro", label: "Introduction", ui: { component: "textarea" } },
              { type: "string", name: "objective", label: "Career Objective", ui: { component: "textarea" } },
              { type: "string", name: "interests", label: "Interests", list: true },
              { type: "string", name: "strengths", label: "Strengths", list: true },
            ],
          },
          {
            type: "object",
            name: "contact",
            label: "Contact Details",
            fields: [
              { type: "string", name: "email", label: "Email" },
              { type: "string", name: "phone", label: "Phone" },
              { type: "string", name: "linkedin", label: "LinkedIn URL" },
              { type: "string", name: "github", label: "GitHub URL" },
              { type: "string", name: "leetcode", label: "LeetCode URL" },
            ],
          },
          {
            type: "object",
            name: "seo",
            label: "SEO / Metadata",
            fields: [
              { type: "string", name: "title", label: "Page Title" },
              { type: "string", name: "description", label: "Meta Description", ui: { component: "textarea" } },
              { type: "string", name: "keywords", label: "Keywords" },
            ],
          },
        ],
      },
      {
        name: "skills",
        label: "Skills",
        path: "content",
        format: "json",
        match: { include: "skills" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object",
            name: "categories",
            label: "Skill Categories",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.title }) },
            fields: [
              { type: "string", name: "id", label: "ID (unique, no spaces)" },
              { type: "string", name: "title", label: "Category Title" },
              {
                type: "string",
                name: "icon",
                label: "Icon (lucide-react name, e.g. Code2, Database, Wrench)",
              },
              { type: "string", name: "skills", label: "Skills", list: true },
            ],
          },
        ],
      },
      {
        name: "education",
        label: "Education",
        path: "content",
        format: "json",
        match: { include: "education" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object",
            name: "entries",
            label: "Education Entries",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.institution }) },
            fields: [
              { type: "string", name: "institution", label: "Institution" },
              { type: "string", name: "degree", label: "Degree / Course" },
              { type: "string", name: "location", label: "Location" },
              { type: "string", name: "period", label: "Period" },
              { type: "string", name: "score", label: "Score / CGPA / %" },
              { type: "boolean", name: "isCurrent", label: "Currently studying here" },
            ],
          },
        ],
      },
      {
        name: "experience",
        label: "Experience",
        path: "content",
        format: "json",
        match: { include: "experience" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object",
            name: "entries",
            label: "Experience Entries",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.role }) },
            fields: [
              { type: "string", name: "role", label: "Role / Title" },
              { type: "string", name: "organization", label: "Company / Organization" },
              { type: "string", name: "period", label: "Period" },
              { type: "string", name: "location", label: "Location" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              { type: "boolean", name: "isCurrent", label: "Currently working here" },
            ],
          },
        ],
      },
      {
        name: "projects",
        label: "Projects",
        path: "content/projects",
        format: "json",
        fields: [
          { type: "string", name: "name", label: "Project Name" },
          { type: "image", name: "image", label: "Project Image" },
          { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
          { type: "string", name: "technologies", label: "Technologies Used", list: true },
          { type: "string", name: "github", label: "GitHub Repository Link" },
          { type: "string", name: "demo", label: "Live Demo Link (optional)" },
          { type: "string", name: "period", label: "Time Period" },
          { type: "boolean", name: "featured", label: "Featured" },
          { type: "number", name: "order", label: "Display Order" },
        ],
      },
      {
        name: "certifications",
        label: "Certifications",
        path: "content/certifications",
        format: "json",
        fields: [
          { type: "string", name: "name", label: "Certificate Name" },
          { type: "string", name: "organization", label: "Issuing Organization" },
          { type: "image", name: "image", label: "Certificate Image" },
          { type: "string", name: "issueDate", label: "Issue Date" },
          { type: "string", name: "credentialUrl", label: "Credential Link" },
          { type: "number", name: "order", label: "Display Order" },
        ],
      },
    ],
  },
});
