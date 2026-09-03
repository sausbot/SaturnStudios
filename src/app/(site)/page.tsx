import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { ContactCta } from "@/components/ContactCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <ContactCta />
    </>
  );
}
