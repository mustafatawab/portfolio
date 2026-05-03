import HeroSection from "@/views/hero";
import AboutSection from "@/views/about";
import Skills from "@/views/skills";
import Services from "@/views/services";
import Projects from "@/views/projects";
import Contact from "@/views/contact";
import Experience from "@/views/experience";
import Education from "@/views/education";
import Certifications from "@/views/certifications";
import TechStack from "@/views/tech-stack";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <Skills />
      <Services />
      <Projects />
      <Education />
      <Certifications />
      <Experience />
      <Contact />
    </>
  );
}
