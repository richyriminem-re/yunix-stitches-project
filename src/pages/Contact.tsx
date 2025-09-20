import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Instagram, 
  Send,
  CheckCircle,
  User,
  Calendar
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Please provide more details (minimum 10 characters)"),
  contactMethod: z.enum(["email", "phone", "whatsapp"]),
  eventDate: z.string().optional()
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
      contactMethod: "email",
      eventDate: ""
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
    });
    
    form.reset();
    setIsSubmitting(false);
  };

  const handleWhatsAppContact = (service?: string) => {
    const message = service 
      ? `Hi! I'm interested in ${service}. I'd like to schedule a consultation.`
      : "Hi! I'd like to learn more about your services and schedule a consultation.";
    
    const whatsappUrl = `https://wa.me/2349019898642?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const businessHours = [
    { day: "Monday - Friday", time: "9:00 AM - 6:00 PM" },
    { day: "Saturday", time: "10:00 AM - 4:00 PM" },
    { day: "Sunday", time: "By Appointment" }
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone",
      description: "Call us directly for immediate assistance",
      value: "+234 901 989 8642",
      action: "tel:+2349019898642"
    },
    {
      icon: Mail,
      title: "Email",
      description: "Send us a detailed message",
      value: "hello@yunixstitches.com",
      action: "mailto:hello@yunixstitches.com"
    },
    {
      icon: "whatsapp",
      title: "WhatsApp",
      description: "Quick chat and consultations",
      value: "Chat with us",
      action: () => handleWhatsAppContact()
    },
    {
      icon: Instagram,
      title: "Instagram",
      description: "Follow our latest collections",
      value: "@yunix_stitches_",
      action: "https://instagram.com/yunix_stitches_"
    },
    {
      icon: "tiktok",
      title: "TikTok",
      description: "Watch our fashion content",
      value: "@yunix_stitches",
      action: "https://tiktok.com/@yunix_stitches"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Breadcrumb */}
      <div className="pt-20 pb-4 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm">
            <button 
              onClick={() => navigate("/")} 
              className="text-muted-foreground hover:text-primary cursor-pointer"
            >
              Home
            </button>
            <span className="mx-2 text-muted-foreground">/</span>
            <span className="text-primary">Contact</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-warm-taupe/20 to-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary mb-6">
              Get In Touch
            </h1>
            <div className="elegant-divider"></div>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Ready to create something extraordinary? Let's discuss your vision and bring your dream outfit to life. 
              From bridal couture to custom tailoring, we're here to make your style dreams a reality.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="outline" className="text-sm font-medium">
                <CheckCircle className="h-4 w-4 mr-2" />
                Free Consultation
              </Badge>
              <Badge variant="outline" className="text-sm font-medium">
                <CheckCircle className="h-4 w-4 mr-2" />
                Custom Design
              </Badge>
              <Badge variant="outline" className="text-sm font-medium">
                <CheckCircle className="h-4 w-4 mr-2" />
                Premium Quality
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method) => {
              const Icon = method.icon;
              return (
                <Card key={method.title} className="text-center hover:shadow-luxury transition-all duration-300 group cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary/10 mb-4 group-hover:bg-secondary/20 transition-colors">
                      {method.icon === "whatsapp" ? (
                        <i className="fa-brands fa-whatsapp text-xl text-secondary" />
                      ) : method.icon === "tiktok" ? (
                        <i className="fa-brands fa-tiktok text-xl text-secondary" />
                      ) : (
                        <Icon className="h-6 w-6 text-secondary" />
                      )}
                    </div>
                    <h3 className="font-serif font-semibold text-lg mb-2">{method.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{method.description}</p>
                    <a
                      href={typeof method.action === 'string' ? method.action : '#'}
                      onClick={typeof method.action === 'function' ? method.action : undefined}
                      className="text-secondary font-medium hover:text-secondary/80 transition-colors"
                    >
                      {method.value}
                    </a>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-serif font-bold text-primary mb-6">Visit Our Atelier</h2>
                <div className="space-y-6">
                  
                  {/* Address */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Location</h3>
                      <p className="text-muted-foreground">
                        Igbatoro Road, Opposite HOB<br />
                        (After Federal Secretariat)<br />
                        Alagbaka, Akure, Ondo State, Nigeria
                      </p>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                      <Clock className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Business Hours</h3>
                      <div className="space-y-1">
                        {businessHours.map((schedule) => (
                          <div key={schedule.day} className="flex justify-between text-muted-foreground">
                            <span>{schedule.day}</span>
                            <span>{schedule.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Quick WhatsApp */}
                  <Card className="bg-gradient-to-r from-secondary/10 to-secondary/5 border-secondary/20">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <i className="fa-brands fa-whatsapp text-2xl text-secondary" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">Need Quick Help?</h3>
                          <p className="text-muted-foreground text-sm">Get instant support via WhatsApp</p>
                        </div>
                        <Button 
                          onClick={() => handleWhatsAppContact()}
                          className="btn-bronze"
                        >
                          Chat Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;