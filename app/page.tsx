import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { TrustedBy } from "@/components/portfolio/TrustedBy";
import { About } from "@/components/portfolio/About";
import { Expertise } from "@/components/portfolio/Expertise";
import { SkillsAndTools } from "@/components/portfolio/SkillsAndTools";
import { Experience } from "@/components/portfolio/Experience";
import { SelectedWork } from "@/components/portfolio/SelectedWork";
import { Awards } from "@/components/portfolio/Awards";
import { EducationAndCertifications } from "@/components/portfolio/EducationAndCertifications";
import { Testimonials } from "@/components/portfolio/Testimonials";
import { Contact } from "@/components/portfolio/Contact";
import { ClosingCta } from "@/components/portfolio/ClosingCta";
import { Footer } from "@/components/portfolio/Footer";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-[#0071e3] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <TrustedBy />
        <About />
        <Expertise />
        <SkillsAndTools />
        <Experience />
        <SelectedWork />
        <Awards />
        <EducationAndCertifications />
        <Testimonials />
        <Contact />
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}
