import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useWishlist } from "@/hooks/use-wishlist";
import { useToast } from "@/hooks/use-toast";

const Wishlist = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();

  const handleWhatsAppOrder = (productName: string, price: number) => {
    const message = encodeURIComponent(
      `Hi! I'm interested in the "${productName}" from my wishlist, priced at ₦${price.toLocaleString()}. Could you provide more details?`
    );
    window.open(`https://wa.me/234901989864?text=${message}`, '_blank');
  };

  const handleRemoveItem = (productId: number, productName: string) => {
    removeFromWishlist(productId);
    toast({
      title: "Removed from wishlist",
      description: `${productName} has been removed from your wishlist`
    });
  };

  const handleClearAll = () => {
    clearWishlist();
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>My Wishlist | Yunix Stitches</title>
        <meta name="description" content="View your saved fashion items and favorite designs from Yunix Stitches. Keep track of the styles you love." />
        <link rel="canonical" href="https://yunixstitches.com/wishlist" />
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
            <span className="text-primary">Wishlist</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-4">
              <Heart className="h-8 w-8 text-secondary fill-secondary" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary mb-4">
              My Wishlist
            </h1>
            <p className="text-lg text-muted-foreground">
              {wishlist.length === 0 
                ? "Your wishlist is empty. Start adding your favorite items!"
                : `${wishlist.length} item${wishlist.length !== 1 ? 's' : ''} saved for later`
              }
            </p>
          </div>
        </div>
      </section>

      {/* Wishlist Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {wishlist.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-muted rounded-full mb-6">
                <Heart className="h-12 w-12 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-serif font-semibold text-primary mb-4">
                Your wishlist is empty
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Explore our collections and save your favorite items to your wishlist
              </p>
              <Button onClick={() => navigate("/shop")} size="lg">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Browse Shop
              </Button>
            </div>
          ) : (
            <>
              {/* Clear All Button */}
              <div className="flex justify-end mb-6">
                <Button 
                  variant="outline" 
                  onClick={handleClearAll}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear All
                </Button>
              </div>

              {/* Wishlist Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.map((product) => (
                  <Card 
                    key={product.id} 
                    className="group hover:shadow-luxury transition-all duration-300 cursor-pointer"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img 
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      
                      {/* Remove Button */}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-3 right-3 w-8 h-8 p-0 bg-black/50 hover:bg-black/70 text-white rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveItem(product.id, product.name);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col space-y-1">
                        {product.isNew && (
                          <Badge className="bg-muted-olive text-white font-medium text-xs">New</Badge>
                        )}
                        {product.isBestseller && (
                          <Badge className="bg-secondary text-secondary-foreground font-medium text-xs">Best</Badge>
                        )}
                        {product.originalPrice && (
                          <Badge variant="destructive" className="text-xs">
                            -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                          </Badge>
                        )}
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <div className="mb-2">
                        <span className="text-sm text-muted-foreground font-medium">
                          {product.categoryName}
                        </span>
                      </div>

                      <h3 className="text-lg font-serif font-semibold text-primary mb-2 group-hover:text-secondary transition-colors">
                        {product.name}
                      </h3>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex flex-col">
                          <span className="text-xl font-bold text-primary">
                            ₦{product.price.toLocaleString()}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              ₦{product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>

                      <Button 
                        className="w-full"
                        variant="bronze"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWhatsAppOrder(product.name, product.price);
                        }}
                        disabled={!product.inStock}
                      >
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Order via WhatsApp
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Wishlist;
