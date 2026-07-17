import HeroSection        from "@/components/home/HeroSection";
import StatsSection       from "@/components/home/StatsSection";
import NetworkMap         from "@/components/home/NetworkMap";
import ServicesSection    from "@/components/home/ServicesSection";
import SustainSection     from "@/components/home/SustainSection";
import CSRPreview         from "@/components/home/CSRPreview";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <NetworkMap />
      <ServicesSection />
      <SustainSection />
      <CSRPreview />
    </>
  );
}
