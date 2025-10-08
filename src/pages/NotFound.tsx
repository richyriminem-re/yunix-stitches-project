import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-luxury flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>404 - Page Not Found | Yunix Stitches</title>
        <meta name="description" content="Sorry, the page you're looking for doesn't exist. Return to Yunix Stitches to explore our premium fashion collection." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://yunixstitches.com" />
      </Helmet>
      
      <div className="text-center text-white max-w-lg mx-auto">
        <div className="mb-8">
          <h1 className="text-8xl font-serif font-bold text-secondary mb-4">404</h1>
          <h2 className="text-3xl font-serif font-semibold mb-4">Page Not Found</h2>
          <p className="text-lg opacity-90 leading-relaxed">
            Sorry, we couldn't find the page you're looking for. 
            It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Button 
            variant="bronze" 
            size="lg"
            onClick={() => window.history.back()}
            className="px-8"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => window.location.href = "/"}
            className="px-8 border-white text-white hover:bg-white hover:text-primary"
          >
            <Home className="mr-2 h-5 w-5" />
            Return Home
          </Button>
        </div>

        <div className="mt-12 p-6 bg-white/10 rounded-lg backdrop-blur-sm">
          <p className="text-sm opacity-90">
            Looking for something specific? Contact us on WhatsApp and we'll help you find what you need.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
