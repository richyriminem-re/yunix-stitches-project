import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Calendar, ShoppingBag } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  const handleWhatsAppContact = () => {
    const message = encodeURIComponent("Hello! I'm interested in booking a consultation for custom tailoring.");
    window.open(`https://wa.me/2348123456789?text=${message}`, '_blank');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage}
          alt="Elegant Nigerian fashion model in Yunix Stitches design"
          className="w-full h-full object-cover"
        />
        <div className="hero-overlay absolute inset-0"></div>
      </div>

      {/* Decorative Pattern */}
      <div className="adire-pattern absolute inset-0 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-1 mb-6">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-premium-gold text-premium-gold drop-shadow-lg" />
              ))}
            </div>
            <span className="text-sm sm:text-base text-premium-gold font-semibold drop-shadow-sm">Trusted by 500+ clients</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif font-bold leading-tight mb-4 sm:mb-6">
            Yunix Stitches
          </h1>
          
          <div className="elegant-divider"></div>
          
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light mb-4 text-warm-taupe">
            Crafting Elegance, Stitch by Stitch
          </p>
          
          <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed text-gray-200 px-2">
            Where traditional Nigerian heritage meets contemporary luxury. 
            Experience bespoke tailoring that celebrates your unique style and cultural identity.
          </p>
        </div>

        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-center sm:space-y-0 sm:space-x-6 mb-8 sm:mb-12">
          <Button 
            size="lg" 
            variant="bronze" 
            className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 font-semibold min-h-[48px]"
            onClick={handleWhatsAppContact}
          >
            <Calendar className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            Book A Fitting
            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          
          <Button 
            size="lg" 
            variant="outline-inverse" 
            className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 font-semibold min-h-[48px]"
          >
            <ShoppingBag className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            Shop Now
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/20 dark:bg-black/20 dark:border-white/10">
            <div className="text-xl sm:text-2xl font-bold text-secondary mb-1">15+</div>
            <div className="text-xs sm:text-sm text-gray-300 dark:text-gray-400">Years Experience</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/20 dark:bg-black/20 dark:border-white/10">
            <div className="text-xl sm:text-2xl font-bold text-secondary mb-1">500+</div>
            <div className="text-xs sm:text-sm text-gray-300 dark:text-gray-400">Happy Clients</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/20 dark:bg-black/20 dark:border-white/10">
            <div className="text-xl sm:text-2xl font-bold text-secondary mb-1">100%</div>
            <div className="text-xs sm:text-sm text-gray-300 dark:text-gray-400">Custom Fit Guarantee</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;