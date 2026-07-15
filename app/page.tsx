import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Certifications } from "@/components/sections/Certifications";
import { Achievements } from "@/components/sections/Achievements";
import { Experience } from "@/components/sections/Experience";
import { Resume } from "@/components/sections/Resume";
import { Contact } from "@/components/sections/Contact";
import { Guestbook } from "@/components/sections/Guestbook";
import {
  getSiteContent,
  getSkills,
  getEducation,
  getExperience,
  getProjects,
  getCertifications,
} from "@/lib/content";

export default function Home() {
  const site = getSiteContent();
  const { categories } = getSkills();
  const { entries: educationEntries } = getEducation();
  const { entries: experienceEntries } = getExperience();
  const projects = getProjects();
  const certifications = getCertifications();

  return (
    <>
      <Navbar name={site.hero.name} />
      <main>
        <Hero hero={site.hero} contact={site.contact} stats={site.stats} />
        <About about={site.about} education={educationEntries} />
        <Skills categories={categories} />
        <Projects projects={projects} />
        <Certifications certifications={certifications} />
        <Achievements stats={site.stats} />
        <Experience entries={experienceEntries} />
        <Resume resumeUrl={site.hero.resumeUrl} />
        <Contact contact={site.contact} location={site.hero.location} />
        <Guestbook />
      </main>
      <Footer contact={site.contact} name={site.hero.name} />
    </>
  );
}
