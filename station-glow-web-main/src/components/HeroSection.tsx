
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import ThreeScene from "./ThreeScene";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Logo from "./Logo";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const timeline = gsap.timeline({
      defaults: { 
        ease: "power3.out",
        duration: 0.8
      }
    });
    
    if (logoRef.current) {
      timeline.fromTo(logoRef.current, 
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1 }
      );
    }
    
    if (headingRef.current && subheadingRef.current && ctaRef.current) {
      timeline.fromTo(headingRef.current, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1 }
      );
      
      timeline.fromTo(subheadingRef.current, 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1 },
        "-=0.4"
      );
      
      timeline.fromTo(ctaRef.current, 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1 },
        "-=0.4"
      );
    }
    
    return () => {
      timeline.kill();
    };
  }, []);
  
  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <div className="absolute inset-0 z-0">
        <ThreeScene 
          className="w-full h-full" 
          intensity={1.5}  
          density={1.2}
          speed={1.2}
          interactive={true}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
      </div>
      
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[20%] left-[10%] w-64 h-64 rounded-full bg-[#0FA0CE]/20 filter blur-[100px]"></div>
        <div className="absolute bottom-[20%] right-[10%] w-80 h-80 rounded-full bg-[#D946EF]/20 filter blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div ref={logoRef} className="mb-6 flex justify-center">
            <Logo size="large" asLink={false} className="mx-auto" />
          </div>
          
          <h1 
            ref={headingRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-gradient glow-effect"
          >
            Your Business Deserves More than a Template
          </h1>
          <p 
            ref={subheadingRef}
            className="text-lg md:text-xl mb-10 text-foreground/90"
          >
            Get a custom-built website that stands out from the competition with cutting-edge technology 
            and innovative design solutions tailored to your specific needs.
          </p>
          
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/#contact">
              <Button size="lg" className="bg-gradient-to-r from-[#0FA0CE] to-[#D946EF] hover:opacity-90 text-white transition-all border-0 glow-effect w-full sm:w-auto">
                Start Your Project Today <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/projects">
              <Button variant="outline" size="lg" className="border-[#D946EF] text-[#D946EF] hover:bg-[#D946EF]/10 w-full sm:w-auto">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-[#D946EF] flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-[#D946EF] animate-float"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
