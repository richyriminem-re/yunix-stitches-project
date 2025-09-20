import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ChevronLeft, Heart, Share2, Star, Minus, Plus, Truck, Shield, RotateCcw, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

// Import product data - this should be extracted to a data file in a real app
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";

export interface Product {
  id: number;
  name: string;
  category: string;
  categoryName: string;
  price: number;
  originalPrice?: number;
  images: string[];
  rating: number;
  reviews: number;
  isNew?: boolean;
  isBestseller?: boolean;
  description: string;
  sizes: string[];
  colors: string[];
  inStock: boolean;
  stockCount?: number;
  tags: string[];
}

const allProducts: Product[] = [
  {
    id: 1,
    name: "Emerald Elegance Aso-Ebi",
    category: "asoebi-wears",
    categoryName: "Asoebi Wears",
    price: 185000,
    originalPrice: 220000,
    images: [product1, product2, product3],
    rating: 4.9,
    reviews: 24,
    isNew: true,
    description: "Luxurious emerald green Aso-ebi with intricate gold beadwork and modern tailoring. This stunning piece features hand-embroidered details and premium quality fabric that drapes beautifully. Perfect for special occasions and formal events.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Emerald", "Navy", "Burgundy"],
    inStock: true,
    stockCount: 5,
    tags: ["luxury", "traditional", "beadwork"]
  },
  {
    id: 2,
    name: "Vintage Lace Corset",
    category: "corset",
    categoryName: "Corset",
    price: 45000,
    images: [product2, product1],
    rating: 4.8,
    reviews: 22,
    description: "Handcrafted corset with vintage lace details and perfect fit. Made with premium materials and featuring adjustable lacing for the perfect silhouette.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Ivory", "Black", "Blush"],
    inStock: true,
    tags: ["vintage", "lace", "fitted"]
  },
  {
    id: 3,
    name: "Executive Power Suit",
    category: "corporate-wears",
    categoryName: "Corporate Wears",
    price: 85000,
    images: [product3, product2],
    rating: 4.7,
    reviews: 15,
    description: "Professional tailored suit perfect for corporate settings. Made with high-quality fabric and expert craftsmanship for a powerful, confident look.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Charcoal", "Navy", "Black"],
    inStock: true,
    tags: ["professional", "tailored", "modern"]
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const product = allProducts.find(p => p.id === parseInt(id || ""));

  useEffect(() => {
    if (!product) {
      navigate("/404", { replace: true });
    }
  }, [product, navigate]);

  if (!product) {
    return null;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleWhatsAppOrder = () => {
    const message = `Hi! I'm interested in ordering the ${product.name} (₦${product.price.toLocaleString()})${selectedSize ? ` in size ${selectedSize}` : ''}${selectedColor ? ` in ${selectedColor}` : ''}, quantity: ${quantity}. Please send me more details.`;
    const whatsappUrl = `https://wa.me/2348123456789?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Redirecting to WhatsApp",
      description: "You'll be connected with our team shortly.",
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out this amazing ${product.name} at Yunix Stitches`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Product link has been copied to clipboard.",
      });
    }
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: isWishlisted ? "Item removed from your wishlist" : "Item saved to your wishlist",
    });
  };

  const savings = product.originalPrice ? product.originalPrice - product.price : 0;
  const savingsPercentage = product.originalPrice ? Math.round((savings / product.originalPrice) * 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Mobile Header */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleWishlist}
              className={cn(
                "p-2",
                isWishlisted && "text-red-500"
              )}
            >
              <Heart className={cn("h-4 w-4", isWishlisted && "fill-current")} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="p-2"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6 lg:px-6 lg:py-8">
        {/* Breadcrumb - Hidden on mobile */}
        <div className="mb-6 hidden lg:block">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/shop">Shop</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={`/shop?category=${product.category}`}>
                    {product.categoryName}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{product.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:gap-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <Badge variant="secondary" className="bg-primary text-primary-foreground">
                    New
                  </Badge>
                )}
                {product.isBestseller && (
                  <Badge variant="secondary" className="bg-accent text-accent-foreground">
                    Bestseller
                  </Badge>
                )}
                {savingsPercentage > 0 && (
                  <Badge variant="destructive">
                    -{savingsPercentage}%
                  </Badge>
                )}
              </div>

              {/* Desktop Actions */}
              <div className="absolute top-4 right-4 hidden lg:flex flex-col gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={handleWishlist}
                  className={cn(
                    "h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background",
                    isWishlisted && "text-red-500"
                  )}
                >
                  <Heart className={cn("h-4 w-4", isWishlisted && "fill-current")} />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={handleShare}
                  className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Thumbnail Navigation */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={cn(
                      "aspect-square overflow-hidden rounded-lg border-2 transition-colors",
                      selectedImageIndex === index
                        ? "border-primary"
                        : "border-transparent hover:border-muted-foreground/25"
                    )}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Product Header */}
            <div className="space-y-4">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
                  {product.name}
                </h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Link
                    to={`/shop?category=${product.category}`}
                    className="hover:text-foreground transition-colors"
                  >
                    {product.categoryName}
                  </Link>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-muted-foreground"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-muted-foreground">
                  ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold lg:text-3xl">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through lg:text-xl">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                {savings > 0 && (
                  <p className="text-sm text-green-600 dark:text-green-400">
                    You save {formatPrice(savings)} ({savingsPercentage}%)
                  </p>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                <div className={cn(
                  "h-2 w-2 rounded-full",
                  product.inStock ? "bg-green-500" : "bg-red-500"
                )} />
                <span className={cn(
                  "text-sm font-medium",
                  product.inStock ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                )}>
                  {product.inStock ? "In Stock" : "Out of Stock"}
                  {product.stockCount && product.stockCount <= 10 && (
                    <span className="ml-1 text-muted-foreground">
                      ({product.stockCount} left)
                    </span>
                  )}
                </span>
              </div>
            </div>

            <Separator />

            {/* Product Options */}
            <div className="space-y-6">
              {/* Size Selection */}
              {product.sizes.length > 0 && (
                <div className="space-y-3">
                  <label className="text-sm font-medium">
                    Size {selectedSize && <span className="text-muted-foreground">({selectedSize})</span>}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <Button
                        key={size}
                        variant={selectedSize === size ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedSize(size)}
                        className="min-w-12"
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.colors.length > 0 && (
                <div className="space-y-3">
                  <label className="text-sm font-medium">
                    Color {selectedColor && <span className="text-muted-foreground">({selectedColor})</span>}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <Button
                        key={color}
                        variant={selectedColor === color ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedColor(color)}
                      >
                        {color}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Quantity</label>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <Separator />

            {/* Actions */}
            <div className="space-y-4">
              <Button
                onClick={handleWhatsAppOrder}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                size="lg"
                disabled={!product.inStock}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Order via WhatsApp
              </Button>
              
              <div className="grid grid-cols-2 gap-3 lg:hidden">
                <Button
                  variant="outline"
                  onClick={handleWishlist}
                  className={cn(
                    isWishlisted && "text-red-500 border-red-200 dark:border-red-800"
                  )}
                >
                  <Heart className={cn("mr-2 h-4 w-4", isWishlisted && "fill-current")} />
                  {isWishlisted ? "Saved" : "Save"}
                </Button>
                <Button variant="outline" onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>

          </div>
        </div>

        {/* Product Details Accordion */}
        <div className="mt-12 max-w-4xl">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="description">
              <AccordionTrigger className="text-left">
                Product Description
              </AccordionTrigger>
              <AccordionContent className="prose prose-sm dark:prose-invert max-w-none">
                <p>{product.description}</p>
                {product.tags.length > 0 && (
                  <div className="mt-4">
                    <p className="font-medium mb-2">Features:</p>
                    <div className="flex flex-wrap gap-1">
                      {product.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="capitalize">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="size-guide">
              <AccordionTrigger className="text-left">
                Size Guide & Measurements
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Our garments are tailored to fit perfectly. Please refer to the size chart below:
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Size</th>
                          <th className="text-left py-2">Bust (inches)</th>
                          <th className="text-left py-2">Waist (inches)</th>
                          <th className="text-left py-2">Hips (inches)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b"><td className="py-2">XS</td><td>32-34</td><td>24-26</td><td>34-36</td></tr>
                        <tr className="border-b"><td className="py-2">S</td><td>34-36</td><td>26-28</td><td>36-38</td></tr>
                        <tr className="border-b"><td className="py-2">M</td><td>36-38</td><td>28-30</td><td>38-40</td></tr>
                        <tr className="border-b"><td className="py-2">L</td><td>38-40</td><td>30-32</td><td>40-42</td></tr>
                        <tr><td className="py-2">XL</td><td>40-42</td><td>32-34</td><td>42-44</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </div>
      </main>

      {/* Mobile Sticky Bottom Actions */}
      <div className="sticky bottom-0 z-40 bg-background border-t p-4 lg:hidden">
        <Button
          onClick={handleWhatsAppOrder}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
          size="lg"
          disabled={!product.inStock}
        >
          <MessageCircle className="mr-2 h-5 w-5" />
          Order via WhatsApp • {formatPrice(product.price * quantity)}
        </Button>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;