
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FeatureCard from "./FeatureCard";
import { Code, Smartphone, Laptop, Mail, Settings, Globe } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const subheading = subheadingRef.current;
    
    if (!section || !heading || !subheading) return;
    
    // Heading animation
    gsap.fromTo(heading, 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heading,
          start: "top bottom-=100",
          toggleActions: "play none none none"
        }
      }
    );
    
    // Subheading animation
    gsap.fromTo(subheading, 
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: subheading,
          start: "top bottom-=80",
          toggleActions: "play none none none"
        }
      }
    );
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === heading || trigger.vars.trigger === subheading) {
          trigger.kill();
        }
      });
    };
  }, []);
  
  const features = [
    {
      title: "Web Development (MERN)",
      description: "Full-stack web development using MongoDB, Express.js, React, and Node.js for powerful, scalable applications.",
      icon: <Code className="h-6 w-6 text-white" />,
      gradientFrom: "#0FA0CE",
      gradientTo: "#7E69AB"
    },
    {
      title: "3D Experiences (Three.js)",
      description: "Immersive 3D experiences that bring your digital presence to life with interactive and engaging elements.",
      icon: <Globe className="h-6 w-6 text-white" />,
      gradientFrom: "#D946EF",
      gradientTo: "#9b87f5"
    },
    {
      title: "WordPress Solutions",
      description: "Custom WordPress websites with tailored themes and plugins for easy content management.",
      icon: <Settings className="h-6 w-6 text-white" />,
      gradientFrom: "#9b87f5",
      gradientTo: "#0FA0CE"
    },
    {
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications that deliver exceptional user experiences.",
      icon: <Smartphone className="h-6 w-6 text-white" />,
      gradientFrom: "#D946EF",
      gradientTo: "#0FA0CE"
    },
    {
      title: "UI/UX Design",
      description: "User-centered design that balances aesthetic appeal with functional usability and accessibility.",
      icon: <Laptop className="h-6 w-6 text-white" />,
      gradientFrom: "#9b87f5",
      gradientTo: "#D946EF"
    },
    {
      title: "Digital Marketing",
      description: "Strategic digital marketing services to increase visibility, engage audiences, and drive conversions.",
      icon: <Mail className="h-6 w-6 text-white" />,
      gradientFrom: "#0FA0CE",
      gradientTo: "#9b87f5"
    }
  ];
  
  return (
    <section id="features" ref={sectionRef} className="py-24 bg-black/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 
            ref={headingRef}
            className="text-3xl md:text-4xl font-bold mb-4 text-gradient"
          >
            Our Services
          </h2>
          <p 
            ref={subheadingRef}
            className="text-lg max-w-2xl mx-auto text-foreground/80"
          >
            Discover how Nodex Station can transform your digital ecosystem with our comprehensive suite of services.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={index * 0.1}
              gradientFrom={feature.gradientFrom}
              gradientTo={feature.gradientTo}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
