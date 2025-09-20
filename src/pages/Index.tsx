import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import CategoryShowcase from "@/components/ProductShowcase";
import AboutPreview from "@/components/AboutPreview";
import ServicesPreview from "@/components/ServicesPreview";
import Footer from "@/components/Footer";
import { smoothScrollToElement } from "@/lib/utils";

const Index = () => {
  useEffect(() => {
    // Check if URL has hash and scroll to it
    const hash = window.location.hash;
    if (hash === '#services') {
      // Small delay to ensure component is mounted
      setTimeout(() => {
        smoothScrollToElement('services');
      }, 100);
    } else if (hash === '#about') {
      // Small delay to ensure component is mounted
      setTimeout(() => {
        smoothScrollToElement('about');
      }, 100);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection />
        
        {/* Category Showcase */}
        <CategoryShowcase />
        
        {/* About Preview */}
        <AboutPreview />
        
        {/* Services Preview */}
        <ServicesPreview />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
