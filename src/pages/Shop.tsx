import { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Search, Filter, Grid, List, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import ProductGrid from "@/components/ProductGrid";
import ProductFilter from "@/components/ProductFilter";
import SortOptions from "@/components/SortOptions";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { allProducts, type Product } from "@/data/products";

export type { Product };

const Shop = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [quickFilters, setQuickFilters] = useState<string[]>([]);
  const [displayedCount, setDisplayedCount] = useState(12);

  // Handle URL parameters for category filtering
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [searchParams]);

  // Filter logic
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Category filter
    if (activeCategory !== "all") {
      filtered = filtered.filter(product => product.category === activeCategory);
    }

    // Price range filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Size filter
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(product =>
        product.sizes.some(size => selectedSizes.includes(size))
      );
    }

    // Color filter
    if (selectedColors.length > 0) {
      filtered = filtered.filter(product =>
        product.colors.some(color => selectedColors.includes(color))
      );
    }

    // Quick filters
    quickFilters.forEach(filter => {
      switch (filter) {
        case "new":
          filtered = filtered.filter(product => product.isNew);
          break;
        case "bestsellers":
          filtered = filtered.filter(product => product.isBestseller);
          break;
        case "sale":
          filtered = filtered.filter(product => product.originalPrice);
          break;
        case "in-stock":
          filtered = filtered.filter(product => product.inStock);
          break;
      }
    });

    // Sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "popular":
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        // Featured - keep original order but prioritize bestsellers and new items
        filtered.sort((a, b) => {
          if (a.isBestseller && !b.isBestseller) return -1;
          if (!a.isBestseller && b.isBestseller) return 1;
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return 0;
        });
    }

    return filtered;
  }, [searchQuery, activeCategory, priceRange, selectedSizes, selectedColors, quickFilters, sortBy]);

  const clearAllFilters = () => {
    setSearchQuery("");
    setActiveCategory("all");
    setPriceRange([0, 500000]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setQuickFilters([]);
    setSortBy("featured");
    setDisplayedCount(12);
    toast({
      title: "Filters cleared",
      description: "All filters have been reset"
    });
  };

  // Reset displayed count when filters change
  useEffect(() => {
    setDisplayedCount(12);
  }, [searchQuery, activeCategory, priceRange, selectedSizes, selectedColors, quickFilters, sortBy]);

  const displayedProducts = filteredProducts.slice(0, displayedCount);
  const hasMore = displayedCount < filteredProducts.length;

  const loadMoreProducts = () => {
    setDisplayedCount(prev => Math.min(prev + 12, filteredProducts.length));
  };

  const activeFiltersCount = [
    searchQuery ? 1 : 0,
    activeCategory !== "all" ? 1 : 0,
    priceRange[0] > 0 || priceRange[1] < 500000 ? 1 : 0,
    selectedSizes.length,
    selectedColors.length,
    quickFilters.length
  ].reduce((a, b) => a + b, 0);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Shop Collection - Yunix Stitches",
    "description": "Browse our complete collection of custom fashion pieces including bridal couture, asoebi styles, corporate wear, and traditional Nigerian attire.",
    "url": "https://yunixstitches.com/shop",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": allProducts.length,
      "itemListElement": allProducts.slice(0, 10).map((product, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": product.name,
          "image": product.images[0],
          "offers": {
            "@type": "Offer",
            "price": product.price,
            "priceCurrency": "NGN",
            "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
          }
        }
      }))
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Shop Premium Fashion | Yunix Stitches</title>
        <meta name="description" content="Browse our collection of premium Nigerian fashion including Asoebi wears, corporate attire, bridal robes, and custom tailoring. Quality craftsmanship meets contemporary style." />
        <meta name="keywords" content="Nigerian fashion, Asoebi, corporate wear, bridal robes, custom tailoring, premium clothing, Yunix Stitches shop" />
        <link rel="canonical" href="https://yunixstitches.com/shop" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yunixstitches.com/shop" />
        <meta property="og:title" content="Shop Premium Fashion | Yunix Stitches" />
        <meta property="og:description" content="Browse our collection of premium Nigerian fashion including Asoebi wears, corporate attire, bridal robes, and custom tailoring." />
        <meta property="og:image" content="https://yunixstitches.com/og-shop.jpg" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://yunixstitches.com/shop" />
        <meta property="twitter:title" content="Shop Premium Fashion | Yunix Stitches" />
        <meta property="twitter:description" content="Browse our collection of premium Nigerian fashion including Asoebi wears, corporate attire, bridal robes, and custom tailoring." />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <Navigation />
      
      {/* Breadcrumb */}
      <div className="pt-20 pb-4 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm">
            <Link to="/" className="text-muted-foreground hover:text-primary">Home</Link>
            <span className="mx-2 text-muted-foreground">/</span>
            <span className="text-primary">Shop</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="py-8 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary mb-4">
              Our Collection
            </h1>
            <div className="elegant-divider"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover handcrafted pieces that blend traditional Nigerian artistry with contemporary elegance
            </p>
          </div>
        </div>
      </div>

      <main id="main-content" className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <ProductFilter
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
                selectedSizes={selectedSizes}
                onSizesChange={setSelectedSizes}
                selectedColors={selectedColors}
                onColorsChange={setSelectedColors}
                quickFilters={quickFilters}
                onQuickFiltersChange={setQuickFilters}
                products={allProducts}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Controls */}
            <div className="mb-6">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Mobile Filter Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <ProductFilter
                        activeCategory={activeCategory}
                        onCategoryChange={setActiveCategory}
                        priceRange={priceRange}
                        onPriceRangeChange={setPriceRange}
                        selectedSizes={selectedSizes}
                        onSizesChange={setSelectedSizes}
                        selectedColors={selectedColors}
                        onColorsChange={setSelectedColors}
                        quickFilters={quickFilters}
                        onQuickFiltersChange={setQuickFilters}
                        products={allProducts}
                      />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Active Filters and Controls */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  {/* Active Filters */}
                  {activeFiltersCount > 0 && (
                    <>
                      {searchQuery && (
                        <Badge variant="secondary" className="gap-1">
                          Search: {searchQuery}
                          <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchQuery("")} />
                        </Badge>
                      )}
                      {activeCategory !== "all" && (
                        <Badge variant="secondary" className="gap-1">
                          Category: {allProducts.find(p => p.category === activeCategory)?.categoryName}
                          <X className="h-3 w-3 cursor-pointer" onClick={() => setActiveCategory("all")} />
                        </Badge>
                      )}
                      {quickFilters.map(filter => (
                        <Badge key={filter} variant="secondary" className="gap-1">
                          {filter.replace("-", " ")}
                          <X className="h-3 w-3 cursor-pointer" onClick={() => 
                            setQuickFilters(prev => prev.filter(f => f !== filter))
                          } />
                        </Badge>
                      ))}
                      <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                        Clear all
                      </Button>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {/* View Toggle */}
                  <div className="hidden md:flex border rounded-lg">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="rounded-r-none"
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="rounded-l-none border-l"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Sort Options */}
                  <SortOptions sortBy={sortBy} onSortChange={setSortBy} />
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-muted-foreground">
                Showing {displayedProducts.length} of {filteredProducts.length} products
              </p>
            </div>

            {/* Product Grid */}
            <ProductGrid products={displayedProducts} viewMode={viewMode} />

            {/* Load More */}
            {hasMore && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg" onClick={loadMoreProducts}>
                  Load More Products
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
