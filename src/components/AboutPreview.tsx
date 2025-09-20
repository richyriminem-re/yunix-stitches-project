import { Button } from "@/components/ui/button";
import { ArrowRight, Scissors, Heart, Crown, Users } from "lucide-react";

const AboutPreview = () => {
  return (
    <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-warm-taupe/20 to-background">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary mb-4 sm:mb-6">
              Where Heritage Meets Innovation
            </h2>
            <div className="elegant-divider mb-4 sm:mb-6"></div>
            
            <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
              As Nigeria's premier luxury fashion house, Yunix Stitches is the distinguished destination for luxury Nigerian fashion. 
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
                  <p className="text-xs sm:text-sm text-muted-foreground">Master craftsmanship</p>
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
            <div className="bg-gradient-luxury rounded-2xl p-6 sm:p-8 lg:p-10 text-white dark:bg-gradient-to-br dark:from-muted dark:to-accent/80">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold mb-8 sm:mb-10 text-center">
                Our Journey in Numbers
              </h3>
              
              <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-10">
                <div className="text-center p-2 sm:p-4">
                  <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-secondary mb-2 sm:mb-3">100%</div>
                  <div className="text-xs sm:text-sm lg:text-base opacity-90 font-medium">Quality Guarantee</div>
                </div>
                
                <div className="text-center p-2 sm:p-4">
                  <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-secondary mb-2 sm:mb-3">500+</div>
                  <div className="text-xs sm:text-sm lg:text-base opacity-90 font-medium">Happy Clients</div>
                </div>
                
                <div className="text-center p-2 sm:p-4">
                  <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-secondary mb-2 sm:mb-3">50+</div>
                  <div className="text-xs sm:text-sm lg:text-base opacity-90 font-medium">Bridal Designs</div>
                </div>
                
                <div className="text-center p-2 sm:p-4">
                  <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-secondary mb-2 sm:mb-3">1000+</div>
                  <div className="text-xs sm:text-sm lg:text-base opacity-90 font-medium">Custom Pieces</div>
                </div>
              </div>

              <div className="p-4 sm:p-6 bg-white/10 rounded-xl backdrop-blur-sm dark:bg-black/20">
                <p className="text-sm sm:text-base italic text-center leading-relaxed">
                  "Yunix Stitches transformed my vision into the most beautiful wedding dress. 
                  Every detail was perfect!" 
                  <span className="block mt-2 text-xs sm:text-sm font-semibold text-secondary">- Adunni O.</span>
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