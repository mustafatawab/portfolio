import HeroSection from "@/views/hero";
import AboutSection from "@/views/about";
import WhatIBuild from "@/views/what-i-build";
import EngagementModels from "@/views/engagement-models";
import Experience from "@/views/experience";
import Projects from "@/views/projects";
import FAQ from "@/views/faq";
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
      <WhatIBuild />
      <EngagementModels />
      <Experience />
      <Projects />
      <FAQ />
      <Contact />
    </>
  );
}
