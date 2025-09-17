import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Eye, ShoppingBag, Star } from "lucide-react";
import CategoryFilter from "@/components/CategoryFilter";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";

const ProductShowcase = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const allProducts = [
    {
      id: 1,
      name: "Emerald Elegance Aso-Ebi",
      category: "asoebi-wears",
      categoryName: "Asoebi Wears",
      price: "₦185,000",
      originalPrice: "₦220,000",
      image: product1,
      rating: 4.9,
      reviews: 24,
      isNew: true,
      description: "Luxurious emerald green Aso-ebi with intricate gold beadwork and modern tailoring."
    },
    {
      id: 2,
      name: "Vintage Lace Corset",
      category: "corset",
      categoryName: "Corset",
      price: "₦45,000",
      image: product2,
      rating: 4.8,
      reviews: 22,
      description: "Handcrafted corset with vintage lace details and perfect fit."
    },
    {
      id: 3,
      name: "Executive Power Suit",
      category: "corporate-wears",
      categoryName: "Corporate Wears",
      price: "₦85,000",
      image: product3,
      rating: 4.7,
      reviews: 33,
      isNew: true,
      description: "Professional corporate suit with modern tailoring and premium fabric."
    },
    {
      id: 4,
      name: "Summer Casual Dress",
      category: "ready-to-wear",
      categoryName: "Ready to Wear",
      price: "₦25,000",
      image: product1,
      rating: 4.5,
      reviews: 41,
      description: "Comfortable and stylish ready-to-wear dress for everyday elegance."
    },
    {
      id: 5,
      name: "Royal Blue Bubu",
      category: "bubu",
      categoryName: "Bubu",
      price: "₦75,000",
      image: product2,
      rating: 4.9,
      reviews: 17,
      isBestseller: true,
      description: "Traditional bubu with contemporary flair and rich embroidery."
    },
    {
      id: 6,
      name: "Silk Bridal Robe",
      category: "bridal-robe",
      categoryName: "Bridal Robe",
      price: "₦35,000",
      image: product3,
      rating: 4.7,
      reviews: 15,
      description: "Luxurious silk bridal robe with delicate lace trim."
    },
    {
      id: 7,
      name: "Champagne Dreams Wedding Gown",
      category: "wedding-gowns",
      categoryName: "Wedding Gowns",
      price: "₦450,000",
      image: product1,
      rating: 5.0,
      reviews: 18,
      isBestseller: true,
      description: "Exquisite wedding gown with traditional lace and contemporary silhouette."
    }
  ];

  const filteredProducts = activeCategory === "all" 
    ? allProducts 
    : allProducts.filter(product => product.category === activeCategory);

  const handleWhatsAppOrder = (product: typeof allProducts[0]) => {
    const message = encodeURIComponent(
      `Hi! I'm interested in the "${product.name}" priced at ${product.price}. Could you provide more details about sizing and delivery?`
    );
    window.open(`https://wa.me/2348123456789?text=${message}`, '_blank');
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary mb-4">
            Featured Collection
          </h2>
          <div className="elegant-divider"></div>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Discover our handcrafted pieces that blend traditional Nigerian artistry 
            with contemporary elegance.
          </p>
        </div>

        {/* Category Filter */}
        <CategoryFilter 
          activeCategory={activeCategory} 
          onCategoryChange={setActiveCategory} 
        />

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="product-card group border-0 shadow-soft hover:shadow-luxury">
              <div className="relative overflow-hidden rounded-t-lg">
                {/* Product Image */}
                <img 
                  src={product.image}
                  alt={product.name}
                  className="product-image w-full h-64 sm:h-72 md:h-80 object-cover transition-transform duration-500"
                />
                
                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2 sm:space-x-4">
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/20 p-2">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/20 p-2">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="bronze" 
                    onClick={() => handleWhatsAppOrder(product)}
                    className="px-3 py-2"
                  >
                    <ShoppingBag className="h-4 w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Order</span>
                  </Button>
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  {product.isNew && (
                    <Badge className="bg-muted-olive text-white font-medium">New</Badge>
                  )}
                  {product.isBestseller && (
                    <Badge className="bg-secondary text-secondary-foreground font-medium">Bestseller</Badge>
                  )}
                </div>
              </div>

              <CardContent className="p-4 sm:p-6">
                <div className="mb-2">
                  <span className="text-xs sm:text-sm text-muted-foreground font-medium">
                    {product.categoryName}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-serif font-semibold text-primary mb-2 group-hover:text-secondary transition-colors line-clamp-2">
                  {product.name}
                </h3>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 sm:w-4 sm:h-4 ${
                          i < Math.floor(product.rating) 
                            ? 'fill-secondary text-secondary' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-xs sm:text-sm text-muted-foreground">({product.reviews} reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                    <span className="text-lg sm:text-xl font-bold text-primary">
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                {/* WhatsApp Order Button */}
                <Button 
                  className="w-full btn-outline-bronze min-h-[44px] text-sm sm:text-base"
                  onClick={() => handleWhatsAppOrder(product)}
                >
                  Order via WhatsApp
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View More */}
        <div className="text-center mt-12">
          <Button variant="luxury" size="lg" className="px-12">
            View All Collection
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;