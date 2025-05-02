
import { Link } from "react-router-dom";

interface LogoProps {
  size?: "small" | "medium" | "large";
  showText?: boolean;
  asLink?: boolean;
  className?: string;
}

const Logo = ({ 
  size = "medium", 
  showText = true, 
  asLink = true,
  className = "" 
}: LogoProps) => {
  const sizes = {
    small: "h-8 w-8 text-lg",
    medium: "h-10 w-10 text-xl",
    large: "h-16 w-16 text-2xl",
  };

  const logoContent = (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`${sizes[size]} rounded-full bg-gradient-to-r from-[#0FA0CE] via-[#9b87f5] to-[#D946EF] flex items-center justify-center border border-white/10 shadow-lg glow-effect`}>
        <span className="text-white font-bold">N</span>
      </div>
      {showText && (
        <span className={`font-bold text-gradient ${size === "small" ? "text-xl" : size === "medium" ? "text-2xl" : "text-3xl"}`}>
          Nodex Station
        </span>
      )}
    </div>
  );

  if (asLink) {
    return <Link to="/" className="transition-transform hover:scale-105">{logoContent}</Link>;
  }

  return logoContent;
};

export default Logo;
