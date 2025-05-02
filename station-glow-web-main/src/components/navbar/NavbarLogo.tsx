
import Logo from "../Logo";

interface NavbarLogoProps {
  href?: string;
}

const NavbarLogo = ({ href = "#" }: NavbarLogoProps) => {
  return (
    <Logo 
      asLink={true} 
      showText={true} 
      size="medium" 
      className="hover:opacity-90 transition-all duration-300" 
    />
  );
};

export default NavbarLogo;
