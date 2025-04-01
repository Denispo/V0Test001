import HeroSection from "@/components/sections/hero-section"
import ServicesSection from "@/components/sections/services-section"
import ImplementationSection from "@/components/sections/implementation-section"
import AboutSection from "@/components/sections/about-section"
import TestimonialsSection from "@/components/sections/testimonials-section"
import ContactSection from "@/components/sections/contact-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ServicesSection />
      <ImplementationSection />
      <AboutSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
  )
}

