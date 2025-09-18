import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, Search, ShoppingBag, User, ChevronDown, Calendar, ArrowRight } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent("Hello! I'm interested in booking a consultation for custom tailoring.");
    window.open(`https://wa.me/2348123456789?text=${message}`, '_blank');
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  const categories = [
    { name: "Asoebi Wears", href: "/categories/asoebi-wears" },
    { name: "Corset", href: "/categories/corset" },
    { name: "Corporate Wears", href: "/categories/corporate-wears" },
    { name: "Ready to Wear", href: "/categories/ready-to-wear" },
    { name: "Bubu", href: "/categories/bubu" },
    { name: "Bridal Robe", href: "/categories/bridal-robe" },
    { name: "Wedding Gowns", href: "/categories/wedding-gowns" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-md border-b border-border z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="block">
              <h1 className="text-2xl font-serif font-bold text-primary hover:text-secondary transition-colors duration-300">
                Yunix Stitches
              </h1>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.slice(0, 2).map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-secondary transition-colors duration-200 font-medium"
                >
                  {item.name}
                </a>
              ))}
              
              {/* Categories Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-foreground hover:text-secondary transition-colors duration-200 font-medium focus:outline-none">
                  Categories
                  <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-background border-border shadow-luxury">
                  {categories.map((category) => (
                    <DropdownMenuItem key={category.name} asChild>
                      <a
                        href={category.href}
                        className="flex w-full px-2 py-2 text-sm text-foreground hover:text-secondary hover:bg-accent transition-colors cursor-pointer"
                      >
                        {category.name}
                      </a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {navItems.slice(2).map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-secondary transition-colors duration-200 font-medium"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingBag className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Button>
            <ThemeToggle />
            <Button 
              variant="bronze" 
              size="lg"
              className="ml-2"
              onClick={handleWhatsAppContact}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Book A Fitting
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-background border-border">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-lg font-medium text-foreground hover:text-secondary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </a>
                  ))}
                  <div className="pt-4 border-t border-border">
                    <Button 
                      variant="bronze" 
                      size="lg"
                      className="w-full mb-4"
                      onClick={handleWhatsAppContact}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Book A Fitting
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <div className="flex space-x-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <User className="h-4 w-4 mr-2" />
                        Account
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Cart (0)
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;