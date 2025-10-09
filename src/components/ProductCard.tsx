import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Eye, ShoppingBag, Star, Share2 } from "lucide-react";
import { type Product } from "@/data/products";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
  viewMode?: "grid" | "list";
  onQuickView?: (product: Product) => void;
}

const ProductCard = ({ product, viewMode = "grid", onQuickView }: ProductCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message = encodeURIComponent(
      `Hi! I'm interested in the "${product.name}" priced at ₦${product.price.toLocaleString()}. Could you provide more details about sizing and delivery?`
    );
    window.open(`https://wa.me/234901989864?text=${message}`, '_blank');
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} ${isWishlisted ? "removed from" : "added to"} your wishlist`
    });
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
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

  const formatPrice = (price: number) => `₦${price.toLocaleString()}`;

  if (viewMode === "list") {
    return (
      <Card className="product-card group border-0 shadow-soft hover:shadow-luxury cursor-pointer" onClick={handleCardClick}>
        <div className="flex flex-col md:flex-row">
          <div className="relative w-full md:w-64 h-64 overflow-hidden rounded-t-lg md:rounded-l-lg md:rounded-t-none">
            <img 
              src={product.images[currentImageIndex]}
              alt={`${product.name} - ${product.categoryName}`}
              className="product-image w-full h-full object-cover transition-transform duration-500"
              loading="lazy"
            />
            
            {/* Stock Status */}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Badge variant="destructive" className="text-white">Out of Stock</Badge>
              </div>
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

            {/* Quick Actions */}
            <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button 
                size="sm" 
                variant="ghost" 
                className="text-white hover:bg-white/20 p-2"
                onClick={(e) => { e.stopPropagation(); toggleWishlist(e); }}
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                className="text-white hover:bg-white/20 p-2"
                onClick={(e) => { e.stopPropagation(); onQuickView?.(product); }}
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                className="text-white hover:bg-white/20 p-2"
                onClick={(e) => { e.stopPropagation(); handleShare(e); }}
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <CardContent className="flex-1 p-6">
            <div className="flex flex-col h-full">
              <div className="mb-2">
                <span className="text-sm text-muted-foreground font-medium">
                  {product.categoryName}
                </span>
              </div>

              <h3 className="text-xl font-serif font-semibold text-primary mb-2 group-hover:text-secondary transition-colors">
                {product.name}
              </h3>

              <p className="text-muted-foreground mb-4 flex-1">
                {product.description}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
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
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
              </div>

              {/* Sizes and Colors */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="text-sm text-muted-foreground">Sizes:</span>
                  {product.sizes.slice(0, 4).map(size => (
                    <Badge key={size} variant="outline" className="text-xs">{size}</Badge>
                  ))}
                  {product.sizes.length > 4 && <span className="text-xs text-muted-foreground">+{product.sizes.length - 4}</span>}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Colors:</span>
                  <div className="flex gap-1">
                    {product.colors.slice(0, 3).map(color => (
                      <div key={color} className="w-4 h-4 rounded-full border-2 border-border bg-muted" title={color}></div>
                    ))}
                    {product.colors.length > 3 && <span className="text-xs text-muted-foreground">+{product.colors.length - 3}</span>}
                  </div>
                </div>
              </div>

              {/* Price and Actions */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                <Button 
                  className="btn-outline-bronze"
                  onClick={(e) => { e.stopPropagation(); handleWhatsAppOrder(e); }}
                  disabled={!product.inStock}
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Order via WhatsApp
                </Button>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  }

  // Grid view (default)
  return (
    <Card 
      className="product-card group border-0 shadow-soft hover:shadow-luxury h-full flex flex-col cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div className="relative overflow-hidden rounded-t-lg">
        {/* Product Image - Mobile Optimized Aspect Ratio */}
        <img 
          src={product.images[currentImageIndex]}
          alt={`${product.name} - ${product.categoryName}`}
          className="product-image w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Stock Status */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="destructive" className="text-white text-xs">Out of Stock</Badge>
          </div>
        )}
        
        {/* Mobile Quick Actions - Always Visible */}
        <div className="absolute top-3 right-3 md:hidden">
          <Button 
            size="sm" 
            variant="ghost" 
            className="w-8 h-8 p-0 bg-black/30 hover:bg-black/50 text-white rounded-full"
            onClick={(e) => { e.stopPropagation(); toggleWishlist(e); }}
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
        </div>
        
        {/* Desktop Overlay Actions */}
        <div className="hidden md:flex absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center space-x-4">
          <Button 
            size="sm" 
            variant="ghost" 
            className="text-white hover:bg-white/20 p-2"
            onClick={(e) => { e.stopPropagation(); onQuickView?.(product); }}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            className="text-white hover:bg-white/20 p-2"
            onClick={(e) => { e.stopPropagation(); toggleWishlist(e); }}
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
          <Button 
            size="sm" 
            variant="bronze" 
            onClick={(e) => { e.stopPropagation(); handleWhatsAppOrder(e); }}
            disabled={!product.inStock}
            className="px-3 py-2"
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Order
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            className="text-white hover:bg-white/20 p-2"
            onClick={(e) => { e.stopPropagation(); handleShare(e); }}
          >
            <Share2 className="h-4 w-4" />
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
          {product.originalPrice && (
            <Badge variant="destructive" className="text-xs px-2 py-1">
              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
            </Badge>
          )}
        </div>

        {/* Stock Count - Mobile Optimized */}
        {product.inStock && product.stockCount && product.stockCount <= 5 && (
          <div className="absolute bottom-2 right-2">
            <Badge variant="secondary" className="text-xs px-2 py-1">
              {product.stockCount} left
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-3 sm:p-4 md:p-6 flex flex-col flex-grow">
        {/* Category - Smaller on mobile */}
        <div className="mb-1">
          <span className="text-xs sm:text-sm text-muted-foreground font-medium">
            {product.categoryName}
          </span>
        </div>

        {/* Product Name - Larger and more prominent on mobile */}
        <h3 className="text-sm sm:text-base md:text-lg font-serif font-semibold text-primary mb-2 group-hover:text-secondary transition-colors line-clamp-2 leading-tight">
          {product.name}
        </h3>

        {/* Price - More prominent on mobile */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-col">
            <span className="text-base sm:text-lg md:text-xl font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs sm:text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Rating - Simplified for mobile */}
        <div className="flex items-center gap-1 mb-3">
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

        {/* Size and Color Indicators - Simplified for mobile */}
        <div className="flex justify-between items-center mb-3 sm:mb-4 flex-grow">
          <div className="flex items-center gap-1">
            <div className="flex gap-1">
              {product.colors.slice(0, 2).map(color => (
                <div key={color} className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border border-border bg-muted" title={color}></div>
              ))}
              {product.colors.length > 2 && <span className="text-xs text-muted-foreground">+{product.colors.length - 2}</span>}
            </div>
          </div>
          <div className="flex gap-1">
            {product.sizes.slice(0, 2).map(size => (
              <Badge key={size} variant="outline" className="text-xs px-1 py-0 h-5">{size}</Badge>
            ))}
            {product.sizes.length > 2 && <span className="text-xs text-muted-foreground">+{product.sizes.length - 2}</span>}
          </div>
        </div>

        {/* View Product Button - Touch Optimized */}
        <Button 
          className="w-full btn-outline-bronze min-h-[44px] text-sm font-medium"
          onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`); }}
        >
          <Eye className="h-4 w-4 mr-2" />
          VIEW
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;