/* =============================================================================
   ENJAZCO Home Page — Full website assembly
   Design: Precision Engineering — Blueprint Meets Prestige
   Dark navy-black (#0A0E1A) + Metallic gold (#D4AF37) + Steel blue (#4A7FA5)
   ============================================================================= */

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import WhySection from "@/components/WhySection";
import CommitmentsSection from "@/components/CommitmentsSection";
import OngoingProjectsSection from "@/components/OngoingProjectsSection";
import CertificationsSection from "@/components/CertificationsSection";
import AwardsSection from "@/components/AwardsSection";
import ClientsSection from "@/components/ClientsSection";
import MaintenanceSection from "@/components/MaintenanceSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0E1A]">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <WhySection />
      <CommitmentsSection />
      <OngoingProjectsSection />
      <MaintenanceSection />
      <CertificationsSection />
      <AwardsSection />
      <ClientsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
