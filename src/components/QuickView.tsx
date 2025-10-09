import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Heart, Share2, ShoppingBag, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { type Product } from "@/data/products";
import { useToast } from "@/hooks/use-toast";

interface QuickViewProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const QuickView = ({ product, isOpen, onClose }: QuickViewProps) => {
  const { toast } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWhatsAppOrder = () => {
    if (!selectedSize || !selectedColor) {
      toast({
        title: "Please select options",
        description: "Please select both size and color before ordering.",
        variant: "destructive"
      });
      return;
    }

    const message = encodeURIComponent(
      `Hi! I'm interested in the "${product.name}" priced at ₦${product.price.toLocaleString()}. 
Size: ${selectedSize}, Color: ${selectedColor}. 
Could you provide more details about availability and delivery?`
    );
    window.open(`https://wa.me/234901989864?text=${message}`, '_blank');
    onClose();
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} ${isWishlisted ? "removed from" : "added to"} your wishlist`
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Product link copied to clipboard"
      });
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const formatPrice = (price: number) => `₦${price.toLocaleString()}`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden" aria-describedby="quick-view-description">
        <DialogHeader>
          <DialogTitle className="sr-only">{product.name} - Quick View</DialogTitle>
        </DialogHeader>
        <p id="quick-view-description" className="sr-only">
          Quick view of {product.name}. Browse images, select size and color, and order via WhatsApp.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
              <img
                src={product.images[currentImageIndex]}
                alt={`${product.name} - View ${currentImageIndex + 1} of ${product.images.length}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              
              {/* Stock Status Overlay */}
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Badge variant="destructive" className="text-white">Out of Stock</Badge>
                </div>
              )}
              
              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                    onClick={prevImage}
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                    onClick={nextImage}
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col space-y-2">
                {product.isNew && (
                  <Badge className="bg-muted-olive text-white font-medium">New</Badge>
                )}
                {product.isBestseller && (
                  <Badge className="bg-secondary text-secondary-foreground font-medium">Bestseller</Badge>
                )}
                {product.originalPrice && (
                  <Badge variant="destructive">
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </Badge>
                )}
              </div>
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex ? 'border-primary' : 'border-border'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                    aria-label={`View image ${index + 1}`}
                    aria-current={index === currentImageIndex}
                  >
                    <img
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6 overflow-y-auto max-h-[70vh]">
            {/* Category & Title */}
            <div>
              <span className="text-sm text-muted-foreground font-medium">
                {product.categoryName}
              </span>
              <h2 className="text-2xl font-serif font-bold text-primary mt-1">
                {product.name}
              </h2>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) 
                        ? 'fill-secondary text-secondary' 
                        : 'text-gray-300'
                    }`} 
                  />
                ))}
              </div>
              <span className="font-medium">{product.rating}</span>
              <span className="text-muted-foreground">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              {product.stockCount && product.stockCount <= 5 && (
                <p className="text-sm text-destructive mt-1">
                  Only {product.stockCount} left in stock!
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            <Separator />

            {/* Size Selection */}
            <div>
              <h4 className="font-semibold mb-3">Size</h4>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSize(size)}
                    className="min-w-[3rem]"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h4 className="font-semibold mb-3">Color</h4>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedColor(color)}
                    className="min-w-[4rem]"
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Tags */}
            <div>
              <h4 className="font-semibold mb-3">Features</h4>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="capitalize">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                className="w-full btn-bronze text-lg h-12"
                onClick={handleWhatsAppOrder}
                disabled={!product.inStock}
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                {product.inStock ? 'Order via WhatsApp' : 'Out of Stock'}
              </Button>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={toggleWishlist}
                >
                  <Heart className={`h-4 w-4 mr-2 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                  {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickView;