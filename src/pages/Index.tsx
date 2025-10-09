import { lazy, Suspense, useEffect } from "react";
import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import { smoothScrollToElement } from "@/lib/utils";

// Lazy load below-the-fold components
const CategoryShowcase = lazy(() => import("@/components/ProductShowcase"));
const AboutPreview = lazy(() => import("@/components/AboutPreview"));
const ServicesPreview = lazy(() => import("@/components/ServicesPreview"));

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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Yunix Stitches",
    "url": "https://yunixstitches.com",
    "logo": "https://yunixstitches.com/logo.png",
    "description": "Premium fashion boutique in Akure, Nigeria specializing in custom tailoring, bridal couture, and traditional Nigerian attire with contemporary elegance.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Igbatoro Road, Opposite HOB",
      "addressLocality": "Akure",
      "addressRegion": "Ondo State",
      "addressCountry": "NG"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+234-901-989-8642",
      "contactType": "Customer Service"
    },
    "sameAs": [
      "https://instagram.com/yunix_stitches_",
      "https://tiktok.com/@yunix_stitches"
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Yunix Stitches - Premium Fashion Boutique & Custom Tailoring in Akure, Nigeria</title>
        <meta name="description" content="Discover exquisite custom tailoring, bridal couture, and traditional Nigerian fashion in Akure. Premium quality craftsmanship for asoebi, corporate wear, and special occasions." />
        <meta name="keywords" content="fashion boutique Akure, custom tailoring Nigeria, bridal couture Akure, asoebi styles, Nigerian fashion, corporate wear, traditional attire, Ondo State fashion" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Yunix Stitches - Premium Fashion Boutique & Custom Tailoring" />
        <meta property="og:description" content="Discover exquisite custom tailoring, bridal couture, and traditional Nigerian fashion in Akure. Premium quality craftsmanship for every special occasion." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yunixstitches.com" />
        <meta property="og:image" content="https://yunixstitches.com/og-image.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Yunix Stitches - Premium Fashion Boutique" />
        <meta name="twitter:description" content="Discover exquisite custom tailoring, bridal couture, and traditional Nigerian fashion in Akure." />
        <meta name="twitter:image" content="https://yunixstitches.com/og-image.jpg" />
        
        <link rel="canonical" href="https://yunixstitches.com" />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main id="main-content">
        {/* Hero Section */}
        <HeroSection />
        
        <Suspense fallback={<div className="min-h-[400px] flex items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div></div>}>
          {/* Category Showcase */}
          <CategoryShowcase />
          
          {/* About Preview */}
          <AboutPreview />
          
          {/* Services Preview */}
          <ServicesPreview />
        </Suspense>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
