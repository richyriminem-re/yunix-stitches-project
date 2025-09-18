import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Eye, ShoppingBag, Star } from "lucide-react";
import CategoryFilter from "@/components/CategoryFilter";
import { useToast } from "@/hooks/use-toast";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";

const ProductShowcase = () => {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState("all");
  const [wishlistedItems, setWishlistedItems] = useState<Set<number>>(new Set());

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
      inStock: true,
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
      inStock: true,
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
      inStock: true,
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
      inStock: true,
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
      inStock: true,
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
      inStock: true,
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
      inStock: true,
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

  const toggleWishlist = (productId: number, productName: string) => {
    const newWishlisted = new Set(wishlistedItems);
    const isWishlisted = wishlistedItems.has(productId);
    
    if (isWishlisted) {
      newWishlisted.delete(productId);
    } else {
      newWishlisted.add(productId);
    }
    
    setWishlistedItems(newWishlisted);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: `${productName} ${isWishlisted ? "removed from" : "added to"} your wishlist`
    });
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
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 auto-rows-fr">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="product-card group border-0 shadow-soft hover:shadow-luxury h-full flex flex-col">
              <div className="relative overflow-hidden rounded-t-lg">
                {/* Product Image - Mobile Optimized */}
                <img 
                  src={product.image}
                  alt={product.name}
                  className="product-image w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover transition-transform duration-500"
                />
                
                {/* Mobile Quick Actions - Always Visible */}
                <div className="absolute top-3 right-3 md:hidden">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="w-8 h-8 p-0 bg-black/30 hover:bg-black/50 text-white rounded-full"
                    onClick={() => toggleWishlist(product.id, product.name)}
                  >
                    <Heart className={`h-4 w-4 ${wishlistedItems.has(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                </div>
                
                {/* Desktop Overlay Actions */}
                <div className="hidden md:flex absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center space-x-2 sm:space-x-4">
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/20 p-2">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-white hover:bg-white/20 p-2"
                    onClick={() => toggleWishlist(product.id, product.name)}
                  >
                    <Heart className={`h-4 w-4 ${wishlistedItems.has(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
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

                {/* Badges - Mobile Optimized */}
                <div className="absolute top-2 left-2 flex flex-col space-y-1">
                  {product.isNew && (
                    <Badge className="bg-muted-olive text-white font-medium text-xs px-2 py-1">New</Badge>
                  )}
                  {product.isBestseller && (
                    <Badge className="bg-secondary text-secondary-foreground font-medium text-xs px-2 py-1">Best</Badge>
                  )}
                </div>
              </div>

              <CardContent className="p-3 sm:p-4 md:p-6 flex flex-col flex-grow">
                {/* Category - Mobile Optimized */}
                <div className="mb-1">
                  <span className="text-xs sm:text-sm text-muted-foreground font-medium">
                    {product.categoryName}
                  </span>
                </div>

                {/* Product Name - Mobile Optimized */}
                <h3 className="text-sm sm:text-base md:text-lg font-serif font-semibold text-primary mb-2 group-hover:text-secondary transition-colors line-clamp-2 leading-tight">
                  {product.name}
                </h3>

                {/* Price - More prominent on mobile */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex flex-col">
                    <span className="text-base sm:text-lg md:text-xl font-bold text-primary">
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs sm:text-sm text-muted-foreground line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                {/* Rating - Simplified for mobile */}
                <div className="flex items-center gap-1 mb-3 flex-grow">
                  <div className="flex space-x-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 ${
                          i < Math.floor(product.rating) 
                            ? 'fill-secondary text-secondary' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-xs font-medium">{product.rating}</span>
                  <span className="text-xs text-muted-foreground hidden sm:inline">({product.reviews})</span>
                </div>

                {/* WhatsApp Order Button - Touch Optimized */}
                <Button 
                  className="w-full btn-outline-bronze min-h-[44px] text-sm font-medium"
                  onClick={() => handleWhatsAppOrder(product)}
                  disabled={!product.inStock}
                >
                  {product.inStock ? (
                    <>
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Order via WhatsApp</span>
                      <span className="sm:hidden">Order Now</span>
                    </>
                  ) : 'Out of Stock'}
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