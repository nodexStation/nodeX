
import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Logo from "./Logo";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const image = imageRef.current;
    const stats = statsRef.current;
    
    if (!section || !content || !image || !stats) return;
    
    gsap.from(content, {
      x: -50,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: section,
        start: "top bottom-=100",
        toggleActions: "play none none none"
      }
    });
    
    gsap.from(image, {
      x: 50,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: section,
        start: "top bottom-=100",
        toggleActions: "play none none none"
      }
    });
    
    gsap.from(stats.children, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.2,
      scrollTrigger: {
        trigger: stats,
        start: "top bottom-=50",
        toggleActions: "play none none none"
      }
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <section id="about" ref={sectionRef} className="py-24 relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-[30%] left-[5%] w-72 h-72 rounded-full bg-[#0FA0CE]/10 filter blur-[100px]"></div>
        <div className="absolute bottom-[20%] right-[15%] w-80 h-80 rounded-full bg-[#D946EF]/10 filter blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-center mb-12">
          <Logo size="large" asLink={false} className="mx-auto" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div ref={contentRef}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
              About Nodex Station
            </h2>
            
            <p className="text-lg mb-6 text-foreground/90">
              Founded in 2023, Nodex Station has quickly established itself as a leader in connectivity solutions and digital infrastructure. Our mission is to bridge the gap between complex technology and seamless user experience through innovative 3D graphics and responsive design.
            </p>
            
            <p className="text-lg mb-8 text-foreground/90">
              With a team of experienced engineers, designers, and visionaries, we're building the tools that will power the next generation of digital innovation. Our platform enables businesses to connect, analyze, and optimize their operations like never before through our cutting-edge Three.js implementations and GSAP animations.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/team">
                <Button className="bg-gradient-to-r from-[#0FA0CE] to-[#9b87f5] hover:opacity-90 text-white border-0 glow-effect">
                  Our Team
                </Button>
              </Link>
              <Link to="/vision">
                <Button variant="outline" className="border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5]/10">
                  Our Vision
                </Button>
              </Link>
            </div>
          </div>
          
          <div ref={imageRef} className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full rounded-lg border border-[#0FA0CE]/30"></div>
            <div className="absolute -bottom-4 -right-4 w-full h-full rounded-lg border border-[#D946EF]/30"></div>
            <div className="relative z-10 rounded-lg overflow-hidden shadow-xl glow-effect">
              <img
                src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
                alt="Nodex Station Development"
                className="w-full h-auto rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-tl from-[#0FA0CE]/20 to-[#D946EF]/20 mix-blend-overlay"></div>
            </div>
          </div>
        </div>
        
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          <StatCard 
            number="97%" 
            label="Client Satisfaction" 
            description="Our clients rate their satisfaction with our products and services" 
          />
          <StatCard 
            number="120+" 
            label="Projects Completed" 
            description="Successful projects delivered to clients worldwide" 
          />
          <StatCard 
            number="15+" 
            label="Industry Awards" 
            description="Recognition for our innovative solutions and designs" 
          />
          <StatCard 
            number="24/7" 
            label="Client Support" 
            description="Round-the-clock assistance for all client needs" 
          />
        </div>
      </div>
    </section>
  );
};

interface StatCardProps {
  number: string;
  label: string;
  description: string;
}

const StatCard = ({ number, label, description }: StatCardProps) => (
  <div className="p-6 border border-white/10 bg-white/5 rounded-lg backdrop-blur-sm">
    <h3 className="text-3xl font-bold text-gradient mb-2">{number}</h3>
    <h4 className="text-lg font-semibold text-white mb-2">{label}</h4>
    <p className="text-gray-300 text-sm">{description}</p>
  </div>
);

export default AboutSection;
