import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Scissors, Crown, Users, Palette, ArrowRight } from "lucide-react";

const ServicesPreview = () => {
  const services = [
    {
      icon: Crown,
      title: "Bridal Couture",
      description: "Exquisite wedding gowns and traditional bridal wear designed to make your special day unforgettable.",
      features: ["Custom wedding dresses", "Traditional bridal attire", "Bridal party coordination", "Fittings included"],
      price: "Starting from ₦300,000",
      color: "muted-olive"
    },
    {
      icon: Scissors,
      title: "Custom Tailoring",
      description: "Personalized designs crafted to your exact measurements and style preferences.",
      features: ["Bespoke designs", "Perfect fit guarantee", "Premium fabrics", "Multiple fittings"],
      price: "Starting from ₦75,000",
      color: "secondary"
    },
    {
      icon: Users,
      title: "Aso-Ebi Collections",
      description: "Coordinated outfits for special events, parties, and celebrations with matching accessories.",
      features: ["Group coordination", "Matching accessories", "Bulk discounts", "Event styling"],
      price: "Starting from ₦45,000",
      color: "warm-taupe"
    },
    {
      icon: Palette,
      title: "Style Consultation",
      description: "Professional styling advice to help you choose the perfect designs and fabrics for any occasion.",
      features: ["Personal styling session", "Fabric selection guidance", "Color coordination", "Wardrobe planning"],
      price: "₦25,000 per session",
      color: "metallic-bronze"
    }
  ];

  const handleWhatsAppBooking = (service: typeof services[0]) => {
    const message = encodeURIComponent(
      `Hello! I'd like to book a consultation for ${service.title}. Could you please provide more details about the process and available appointments?`
    );
    window.open(`https://wa.me/2348123456789?text=${message}`, '_blank');
  };

  return (
    <section id="services" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-background">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary mb-4">
            Our Premium Services
          </h2>
          <div className="elegant-divider"></div>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            From custom tailoring to bridal couture, we offer comprehensive fashion services 
            that celebrate Nigerian culture with modern elegance.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="group hover:shadow-luxury transition-all duration-300 border-0 bg-background/80 backdrop-blur-sm">
                <CardContent className="p-4 sm:p-6 lg:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6">
                    <div className={`bg-${service.color}/20 p-3 sm:p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300 self-start`}>
                      <IconComponent className={`h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-${service.color}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-serif font-semibold text-primary mb-2 sm:mb-3 group-hover:text-secondary transition-colors">
                        {service.title}
                      </h3>
                      
                      <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                        {service.description}
                      </p>

                      <ul className="space-y-1 sm:space-y-2 mb-4 sm:mb-6">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-xs sm:text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-2 sm:mr-3 flex-shrink-0"></div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                        <div>
                          <span className="text-lg sm:text-xl font-bold text-primary">{service.price}</span>
                        </div>
                        
                        <Button 
                          variant="outline-bronze" 
                          onClick={() => handleWhatsAppBooking(service)}
                          className="w-full sm:w-auto group-hover:bg-secondary group-hover:text-secondary-foreground transition-all min-h-[44px] text-sm sm:text-base"
                        >
                          Book Now
                          <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-12 sm:mt-16 text-center bg-gradient-luxury rounded-2xl p-6 sm:p-8 lg:p-12 text-white">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold mb-4">
            Ready to Create Your Dream Outfit?
          </h3>
          <p className="text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto px-2">
            Schedule a consultation with our expert designers and bring your vision to life. 
            We'll guide you through every step of the process.
          </p>
          
          <Button size="lg" variant="bronze" className="w-full sm:w-auto px-6 sm:px-8 min-h-[48px] text-sm sm:text-base">
            Book Free Consultation
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;