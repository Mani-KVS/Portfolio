import fs from "fs";
import path from "path";

const contentDir = path.join(process.cwd(), "content");

export interface SiteContent {
  hero: {
    name: string;
    role: string;
    tagline: string;
    profileImage: string;
    resumeUrl: string;
    location: string;
    workstationImage: string;
    workstationImageAlt: string;
  };
  stats: {
    label: string;
    value: number;
    suffix: string;
    icon: string;
  }[];
  about: {
    intro: string;
    objective: string;
    interests: string[];
    strengths: string[];
  };
  contact: {
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    leetcode: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  skills: string[];
}

export interface EducationEntry {
  institution: string;
  degree: string;
  location: string;
  period: string;
  score: string;
  isCurrent?: boolean;
}

export interface ExperienceEntry {
  role: string;
  organization: string;
  period: string;
  location: string;
  description: string;
  isCurrent?: boolean;
}

export interface Project {
  slug: string;
  name: string;
  image: string;
  description: string;
  technologies: string[];
  github: string;
  demo?: string;
  period: string;
  featured: boolean;
  order: number;
}

export interface Certification {
  slug: string;
  name: string;
  organization: string;
  image: string;
  issueDate: string;
  credentialUrl: string;
  order: number;
}

function readJson<T>(filePath: string): T {
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

export function getSiteContent(): SiteContent {
  return readJson<SiteContent>(path.join(contentDir, "site.json"));
}

export function getSkills(): { categories: SkillCategory[] } {
  return readJson(path.join(contentDir, "skills.json"));
}

export function getEducation(): { entries: EducationEntry[] } {
  return readJson(path.join(contentDir, "education.json"));
}

export function getExperience(): { entries: ExperienceEntry[] } {
  const file = path.join(contentDir, "experience.json");
  if (!fs.existsSync(file)) return { entries: [] };
  return readJson(file);
}

export function getProjects(): Project[] {
  const dir = path.join(contentDir, "projects");
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
  const projects = files.map((file) => {
    const data = readJson<Omit<Project, "slug">>(path.join(dir, file));
    return { ...data, slug: file.replace(".json", "") };
  });
  return projects.sort((a, b) => a.order - b.order);
}

export function getCertifications(): Certification[] {
  const dir = path.join(contentDir, "certifications");
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
  const certs = files.map((file) => {
    const data = readJson<Omit<Certification, "slug">>(path.join(dir, file));
    return { ...data, slug: file.replace(".json", "") };
  });
  return certs.sort((a, b) => a.order - b.order);
}
