
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ServicesDropdownProps {
  isMobile?: boolean;
  onItemClick?: () => void;
}

const ServicesDropdown = ({ isMobile = false, onItemClick }: ServicesDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = () => {
    if (onItemClick) {
      onItemClick();
    }
  };

  return (
    <div className={isMobile ? "" : "relative"}>
      <button 
        onClick={toggleDropdown}
        className={`flex items-center gap-1 text-foreground hover:text-[#D946EF] transition-colors ${
          isMobile ? "justify-between py-2 w-full" : ""
        }`}
      >
        <span>Services</span> {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      
      {isOpen && (
        <div 
          className={`
            ${isMobile 
              ? "pl-4 space-y-2 border-l-2 border-[#D946EF]/20" 
              : "absolute top-full left-0 mt-2 w-64 bg-black/90 backdrop-blur-md rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/10 p-4 z-50"
            }
          `}
        >
          <ServiceLink href="#web-dev" label="Web Development (MERN)" onClick={handleItemClick} isMobile={isMobile} />
          <ServiceLink href="#threejs" label="3D Experiences (Three.js)" onClick={handleItemClick} isMobile={isMobile} />
          <ServiceLink href="#wordpress" label="WordPress Solutions" onClick={handleItemClick} isMobile={isMobile} />
          <ServiceLink href="#app-dev" label="Mobile App Development" onClick={handleItemClick} isMobile={isMobile} />
          <ServiceLink href="#ui-ux" label="UI/UX Design" onClick={handleItemClick} isMobile={isMobile} />
          <ServiceLink href="#digital-marketing" label="Digital Marketing" onClick={handleItemClick} isMobile={isMobile} />
          <ServiceLink href="#video-editing" label="Video Editing" onClick={handleItemClick} isMobile={isMobile} />
        </div>
      )}
    </div>
  );
};

interface ServiceLinkProps {
  href: string;
  label: string;
  onClick?: () => void;
  isMobile?: boolean;
}

const ServiceLink = ({ href, label, onClick, isMobile = false }: ServiceLinkProps) => (
  <a 
    href={href} 
    className={`
      text-foreground hover:text-[#0FA0CE] transition-colors
      ${isMobile ? "py-2 block" : "py-2 flex items-center gap-2"}
    `}
    onClick={onClick}
  >
    {label}
  </a>
);

export default ServicesDropdown;
