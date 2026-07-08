import HeroSection from "@/views/hero";
import AboutSection from "@/views/about";
import Projects from "@/views/projects";
import Contact from "@/views/contact";
import { JsonLd, personSchema, breadcrumbSchema } from "@/lib/json-ld";

export default function Home() {
  return (
    <>
      <JsonLd data={personSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://mustafatawab.com" },
        ])}
      />
      <HeroSection />
      <AboutSection />
      <Projects />
      <Contact />
    </>
  );
}
