import { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import galleryAsoebi from "@/assets/gallery-asoebi.jpg";
import galleryCorset from "@/assets/gallery-corset.jpg";
import galleryCorporate from "@/assets/gallery-corporate.jpg";
import galleryBridal from "@/assets/gallery-bridal.jpg";
import galleryBubu from "@/assets/gallery-bubu.jpg";
import galleryReadyToWear from "@/assets/gallery-readytowear.jpg";

const Gallery = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = [
    {
      id: 1,
      src: galleryAsoebi,
      alt: "Elegant Asoebi Design with Gold Threading",
      category: "Asoebi",
    },
    {
      id: 2,
      src: galleryCorset,
      alt: "Stunning Black Lace Corset Dress",
      category: "Corset",
    },
    {
      id: 3,
      src: galleryCorporate,
      alt: "Navy Corporate Power Suit",
      category: "Corporate",
    },
    {
      id: 4,
      src: galleryBridal,
      alt: "Luxurious Bridal Wedding Gown",
      category: "Bridal",
    },
    {
      id: 5,
      src: galleryBubu,
      alt: "Traditional Purple and Gold Bubu",
      category: "Bubu",
    },
    {
      id: 6,
      src: galleryReadyToWear,
      alt: "Casual White Ready to Wear Dress",
      category: "Ready to Wear",
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "Fashion Gallery - Yunix Stitches",
    "description": "Explore our portfolio of exquisite designs, from bridal couture to traditional Nigerian fashion, showcasing timeless elegance and craftsmanship.",
    "url": "https://yunixstitches.com/gallery"
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Fashion Gallery - View Our Designs | Yunix Stitches</title>
        <meta name="description" content="Explore our stunning collection of fashion designs. View photos of bridal couture, asoebi styles, corporate wear, and traditional Nigerian attire crafted in Akure." />
        <meta name="keywords" content="Nigerian fashion gallery, bridal dress photos, asoebi styles gallery, fashion portfolio Akure, traditional attire designs" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Fashion Gallery - View Our Designs | Yunix Stitches" />
        <meta property="og:description" content="Explore our stunning collection of fashion designs including bridal couture and traditional Nigerian attire." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yunixstitches.com/gallery" />
        <meta property="og:image" content="https://yunixstitches.com/gallery-og-image.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Fashion Gallery | Yunix Stitches" />
        <meta name="twitter:description" content="Explore our stunning collection of fashion designs and traditional Nigerian attire." />
        
        <link rel="canonical" href="https://yunixstitches.com/gallery" />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
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
            <span className="text-primary">Gallery</span>
          </nav>
        </div>
      </div>
      
      <main id="main-content" className="flex-1">
        {/* Header */}
        <section className="py-12 bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary mb-4">
                Our Gallery
              </h1>
              <p className="text-lg text-muted-foreground">
                Explore our collection of exquisite designs and timeless elegance
              </p>
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {galleryImages.map((image) => (
                <div
                  key={image.id}
                  className="group relative aspect-[3/4] overflow-hidden rounded-lg cursor-pointer shadow-soft hover:shadow-luxury transition-all duration-300"
                  onClick={() => setSelectedImage(image.src)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <Badge variant="secondary" className="mb-2">
                        {image.category}
                      </Badge>
                      <h3 className="text-white font-serif text-xl font-semibold">
                        {image.alt}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Image Lightbox */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl p-0 bg-transparent border-none">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute -top-12 right-0 text-white hover:text-secondary transition-colors"
          >
            <X className="h-8 w-8" />
          </button>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Gallery image full view"
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
              loading="lazy"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery;
