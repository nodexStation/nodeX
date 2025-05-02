
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

gsap.registerPlugin(ScrollTrigger);

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
  gradientFrom?: string;
  gradientTo?: string;
}

const FeatureCard = ({ 
  title, 
  description, 
  icon, 
  delay = 0, 
  gradientFrom = "#0FA0CE", 
  gradientTo = "#D946EF" 
}: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    
    gsap.fromTo(card, 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=50",
          toggleActions: "play none none reset"
        },
        delay: delay
      }
    );
    
    return () => {
      // Cleanup only the ScrollTrigger for this particular card
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === card) {
          trigger.kill();
        }
      });
    };
  }, [delay]);
  
  return (
    <Card ref={cardRef} className="border border-white/10 bg-white/5 overflow-hidden group card-hover backdrop-blur-sm">
      <div className={`absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-20 bg-gradient-to-br`} 
           style={{background: `linear-gradient(to bottom right, ${gradientFrom}, ${gradientTo})`}} />
      <CardHeader>
        <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-gradient-to-br"
             style={{background: `linear-gradient(to bottom right, ${gradientFrom}, ${gradientTo})`}}>
          {icon}
        </div>
        <CardTitle className="text-xl font-bold text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base text-gray-300">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
