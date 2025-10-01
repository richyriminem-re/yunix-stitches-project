import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = [
    {
      id: 1,
      src: "/src/assets/product-1.jpg",
      alt: "Elegant Asoebi Design",
      category: "Asoebi",
    },
    {
      id: 2,
      src: "/src/assets/product-2.jpg",
      alt: "Stunning Corset Dress",
      category: "Corset",
    },
    {
      id: 3,
      src: "/src/assets/product-3.jpg",
      alt: "Corporate Elegance",
      category: "Corporate",
    },
    {
      id: 4,
      src: "/src/assets/hero-image.jpg",
      alt: "Bridal Collection",
      category: "Bridal",
    },
    {
      id: 5,
      src: "/src/assets/product-1.jpg",
      alt: "Traditional Bubu",
      category: "Bubu",
    },
    {
      id: 6,
      src: "/src/assets/product-2.jpg",
      alt: "Ready to Wear",
      category: "Ready to Wear",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1 pt-20">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              alt="Gallery image"
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery;
