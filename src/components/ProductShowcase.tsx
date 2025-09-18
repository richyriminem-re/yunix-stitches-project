import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import CategoryFilter from "@/components/CategoryFilter";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";

const CategoryShowcase = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");

  const allCategories = [
    {
      id: "asoebi-wears",
      name: "Asoebi",
      subtitle: "Traditional Wear",
      image: product1,
      description: "Luxurious traditional pieces with intricate beadwork and modern tailoring."
    },
    {
      id: "corset",
      name: "Corset",
      subtitle: "Vintage Style",
      image: product2,
      description: "Handcrafted corsets with vintage lace details and perfect fit."
    },
    {
      id: "corporate-wears",
      name: "Corporate",
      subtitle: "Professional Wear",
      image: product3,
      description: "Professional attire with modern tailoring and premium fabrics."
    },
    {
      id: "ready-to-wear",
      name: "Ready to Wear",
      subtitle: "Casual Style",
      image: product1,
      description: "Comfortable and stylish pieces for everyday elegance."
    },
    {
      id: "bubu",
      name: "Bubu",
      subtitle: "Contemporary",
      image: product2,
      description: "Traditional bubu with contemporary flair and rich embroidery."
    },
    {
      id: "bridal-robe",
      name: "Bridal Robe",
      subtitle: "Luxury Robes",
      image: product3,
      description: "Luxurious silk robes with delicate lace trim for special moments."
    },
    {
      id: "wedding-gowns",
      name: "Wedding Gowns",
      subtitle: "Bridal Collection",
      image: product1,
      description: "Exquisite gowns with traditional lace and contemporary silhouettes."
    }
  ];

  const filteredCategories = activeCategory === "all" 
    ? allCategories 
    : allCategories.filter(category => category.id === activeCategory);

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/shop?category=${categoryId}`);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary mb-4">
            Shop by Category
          </h2>
          <div className="elegant-divider"></div>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Explore our diverse collection of handcrafted pieces, each category 
            showcasing unique artistry and contemporary elegance.
          </p>
        </div>

        {/* Category Filter */}
        <CategoryFilter 
          activeCategory={activeCategory} 
          onCategoryChange={setActiveCategory} 
        />

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {filteredCategories.map((category) => (
            <Card 
              key={category.id} 
              className="category-card group bg-card border border-border rounded-lg shadow-soft hover:shadow-md h-full flex flex-col cursor-pointer transition-all duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
              onClick={() => handleCategoryClick(category.id)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCategoryClick(category.id);
                }
              }}
            >
              <div className="relative overflow-hidden rounded-t-lg">
                {/* Category Image */}
                <img 
                  src={category.image}
                  alt={`${category.name} - ${category.subtitle}`}
                  className="w-full h-32 sm:h-36 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center">
                    <p className="text-xs sm:text-sm font-medium">View Collection</p>
                  </div>
                </div>
              </div>

              <CardContent className="p-4 flex flex-col flex-grow text-center">
                {/* Category Name */}
                <h3 className="text-base sm:text-lg font-serif font-bold text-primary mb-1 group-hover:text-secondary transition-colors">
                  {category.name}
                </h3>

                {/* Category Subtitle */}
                <p className="text-xs sm:text-sm text-muted-foreground/80 mb-3 font-medium">
                  {category.subtitle}
                </p>

                {/* Category Description - Line Clamped */}
                <p className="text-xs sm:text-sm text-muted-foreground flex-grow leading-relaxed mb-4 line-clamp-2">
                  {category.description}
                </p>

                {/* Explore Button - Mobile First */}
                <Button 
                  className="w-full btn-bronze min-h-[44px] text-xs sm:text-sm font-medium mt-auto"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCategoryClick(category.id);
                  }}
                >
                  Explore
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View More */}
        <div className="text-center mt-12">
          <Button 
            variant="luxury" 
            size="lg" 
            className="px-12"
            onClick={() => navigate('/shop')}
          >
            View All Collection
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;