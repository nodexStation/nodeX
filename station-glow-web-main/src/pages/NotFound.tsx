
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import ThreeBackground from "@/components/ThreeBackground";
import Logo from "@/components/Logo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4 relative">
      <ThreeBackground intensity={1.2} density={0.8} speed={0.8} />
      
      <div className="text-center max-w-md z-10 animate-fade-in">
        <div className="mb-8">
          <Logo size="large" className="mx-auto" />
        </div>
        <h1 className="text-6xl font-bold mb-4 text-gradient glow-effect">404</h1>
        <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
        <p className="text-foreground/80 mb-8">
          The page you're looking for doesn't exist or has been moved.
          Return to the homepage or contact us if you believe this is an error.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link to="/">
            <Button className="bg-gradient-to-r from-[#0FA0CE] to-[#D946EF] hover:opacity-90 text-white transition-all border-0 w-full sm:w-auto glow-effect">
              Return to Home
            </Button>
          </Link>
        </div>
        
        <div className="flex items-center justify-center gap-2 text-foreground/70 hover:text-[#D946EF] transition-colors">
          <Mail size={16} className="text-[#D946EF]" />
          <a href="mailto:nodexstation@gmail.com" className="hover:text-[#0FA0CE] transition-colors">
            nodexstation@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
