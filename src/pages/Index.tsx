import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ProductShowcase from "@/components/ProductShowcase";
import AboutPreview from "@/components/AboutPreview";
import ServicesPreview from "@/components/ServicesPreview";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection />
        
        {/* Product Showcase */}
        <ProductShowcase />
        
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
