
import { Button } from "@/components/ui/button";
import ServicesDropdown from "./ServicesDropdown";
import { Link } from "react-router-dom";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  if (!isOpen) return null;
  
  return (
    <div className="md:hidden py-4 mt-4 bg-black/90 backdrop-blur-md rounded-lg shadow-lg border border-white/10">
      <div className="flex flex-col space-y-4 px-4">
        <ServicesDropdown isMobile={true} onItemClick={onClose} />
        
        <NavLink href="#features" label="Features" onClick={onClose} />
        <NavLink href="#about" label="About" onClick={onClose} />
        <NavLink href="#contact" label="Contact" onClick={onClose} />
        
        <Link 
          to="/projects" 
          className="text-foreground hover:text-[#D946EF] transition-colors py-2" 
          onClick={onClose}
        >
          Projects
        </Link>
        
        <Link 
          to="/team" 
          className="text-foreground hover:text-[#D946EF] transition-colors py-2" 
          onClick={onClose}
        >
          Team
        </Link>
        
        <Link 
          to="/vision" 
          className="text-foreground hover:text-[#D946EF] transition-colors py-2" 
          onClick={onClose}
        >
          Our Vision
        </Link>
        
        <Link to="/#contact" onClick={onClose}>
          <Button 
            className="bg-gradient-to-r from-[#0FA0CE] to-[#D946EF] hover:opacity-90 text-white transition-colors w-full border-0"
          >
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
};

interface NavLinkProps {
  href: string;
  label: string;
  onClick?: () => void;
}

const NavLink = ({ href, label, onClick }: NavLinkProps) => (
  <a 
    href={href} 
    className="text-foreground hover:text-[#D946EF] transition-colors py-2"
    onClick={onClick}
  >
    {label}
  </a>
);

export default MobileMenu;
