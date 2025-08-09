import { Navbar } from "@/components/navbar";
import { HeroSectionV2 } from "@/components/hero-section-v2";
import { FeaturesSection } from "@/components/features-section";
import { HowItWorksSection } from "@/components/how-it-works";
import { CTASection } from "@/components/cta-section";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <HeroSectionV2 />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
    </main>
  );
}
