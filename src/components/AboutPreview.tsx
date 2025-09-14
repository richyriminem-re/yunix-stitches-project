import { Button } from "@/components/ui/button";
import { ArrowRight, Scissors, Heart, Crown, Users } from "lucide-react";

const AboutPreview = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-warm-taupe/20 to-background">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary mb-4 sm:mb-6">
              Where Heritage Meets Innovation
            </h2>
            <div className="elegant-divider mb-4 sm:mb-6"></div>
            
            <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
              For over 15 years, Yunix Stitches has been the premier destination for luxury Nigerian fashion. 
              We blend traditional craftsmanship with contemporary design, creating timeless pieces that 
              celebrate your unique style and cultural identity.
            </p>

            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
              From intricate Ankara designs to elegant Aso-ebi sets, every stitch tells a story of 
              excellence, tradition, and modern sophistication.
            </p>

            {/* Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="flex items-center space-x-3 p-3 sm:p-0">
                <div className={`bg-secondary/20 p-2 sm:p-3 rounded-full flex-shrink-0`}>
                  <Scissors className="h-5 w-5 sm:h-6 sm:w-6 text-secondary" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-primary text-sm sm:text-base">Expert Craftsmanship</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">15+ years experience</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 sm:p-0">
                <div className={`bg-warm-taupe/20 p-2 sm:p-3 rounded-full flex-shrink-0`}>
                  <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-warm-taupe" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-primary text-sm sm:text-base">Cultural Heritage</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">Preserving tradition</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 sm:p-0">
                <div className={`bg-muted-olive/20 p-2 sm:p-3 rounded-full flex-shrink-0`}>
                  <Crown className="h-5 w-5 sm:h-6 sm:w-6 text-muted-olive" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-primary text-sm sm:text-base">Luxury Quality</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">Premium materials</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 sm:p-0">
                <div className="bg-secondary/20 p-2 sm:p-3 rounded-full flex-shrink-0">
                  <Users className="h-5 w-5 sm:h-6 sm:w-6 text-secondary" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-primary text-sm sm:text-base">Client-Centered</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">500+ happy clients</p>
                </div>
              </div>
            </div>

            <Button variant="luxury" size="lg">
              Learn Our Story
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Image/Stats Section */}
          <div className="relative">
            <div className="bg-gradient-luxury rounded-2xl p-8 text-white dark:bg-gradient-to-br dark:from-muted dark:to-accent/80">
              <h3 className="text-2xl font-serif font-bold mb-6 text-center">
                Our Journey in Numbers
              </h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-secondary mb-2">15+</div>
                  <div className="text-sm opacity-90">Years in Fashion</div>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-bold text-secondary mb-2">500+</div>
                  <div className="text-sm opacity-90">Happy Clients</div>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-bold text-secondary mb-2">50+</div>
                  <div className="text-sm opacity-90">Bridal Designs</div>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-bold text-secondary mb-2">1000+</div>
                  <div className="text-sm opacity-90">Custom Pieces</div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-white/10 rounded-lg backdrop-blur-sm dark:bg-black/20">
                <p className="text-sm italic text-center">
                  "Yunix Stitches transformed my vision into the most beautiful wedding dress. 
                  Every detail was perfect!" - Adunni O.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;