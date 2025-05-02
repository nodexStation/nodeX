
import { Button } from "@/components/ui/button";
import ServicesDropdown from "./ServicesDropdown";
import { Link } from "react-router-dom";

const DesktopNav = () => {
  return (
    <>
      <div className="hidden md:flex items-center gap-8">
        <ServicesDropdown />
        <NavLink href="#features" label="Features" />
        <NavLink href="#about" label="About" />
        <NavLink href="#contact" label="Contact" />
        <Link to="/projects" className="text-foreground hover:text-[#D946EF] transition-colors">Projects</Link>
        <Link to="/team" className="text-foreground hover:text-[#D946EF] transition-colors">Team</Link>
      </div>
      
      <div className="hidden md:block">
        <Link to="/#contact">
          <Button className="bg-gradient-to-r from-[#0FA0CE] to-[#D946EF] hover:opacity-90 text-white transition-colors border-0">
            Get Started
          </Button>
        </Link>
      </div>
    </>
  );
};

interface NavLinkProps {
  href: string;
  label: string;
}

const NavLink = ({ href, label }: NavLinkProps) => (
  <a 
    href={href} 
    className="text-foreground hover:text-[#D946EF] transition-colors"
  >
    {label}
  </a>
);

export default DesktopNav;
