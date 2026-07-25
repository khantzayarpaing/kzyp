import { Navigation } from "@/components/landing/Navigation";
import { Hero } from "@/components/landing/Hero";
import { CustomerProblem } from "@/components/landing/CustomerProblem";
import { Benefits } from "@/components/landing/Benefits";
import { Services } from "@/components/landing/Services";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { EnquiryForm } from "@/components/landing/EnquiryForm";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <CustomerProblem />
        <Benefits />
        <Services />
        <HowItWorks />
        <EnquiryForm />
      </main>
      <Footer />
    </>
  );
}
