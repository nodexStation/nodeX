
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThreeBackground from "@/components/ThreeBackground";
import Logo from "@/components/Logo";
import { Card, CardContent } from "@/components/ui/card";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Modern E-commerce Platform",
    description: "A full-featured online shopping platform with real-time inventory, customer accounts, and integrated payment processing.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
    tags: ["Three.js", "React", "Node.js", "MongoDB"]
  },
  {
    title: "Healthcare Management System",
    description: "Sophisticated patient management system with appointment scheduling, medical records, and analytics dashboard.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
    tags: ["React", "Express", "PostgreSQL", "GSAP"]
  },
  {
    title: "Finance Analytics Dashboard",
    description: "Interactive data visualization tool for financial analysis with real-time market data integration and predictive modeling.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    tags: ["Three.js", "D3.js", "React", "TypeScript"]
  },
  {
    title: "Educational Learning Platform",
    description: "Interactive e-learning system with course management, student progress tracking, and integrated video conferencing.",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8",
    tags: ["MERN Stack", "WebRTC", "GSAP"]
  },
  {
    title: "Real Estate Virtual Tours",
    description: "Immersive 3D property tours with interactive elements, floor plans, and integrated contact forms for inquiries.",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    tags: ["Three.js", "React", "WebGL", "Firebase"]
  },
  {
    title: "Fitness Tracking Application",
    description: "Personal health and fitness tracking app with custom workout plans, progress visualization, and social features.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
    tags: ["React Native", "Node.js", "MongoDB"]
  }
];

const Projects = () => {
  useEffect(() => {
    // Animate elements when they come into view
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
      gsap.fromTo(card, 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            toggleActions: "play none none none"
          },
          delay: index * 0.1
        }
      );
    });
    
    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <ThreeBackground intensity={0.8} density={0.6} speed={0.8} />
      <Navbar />
      
      <main className="flex-grow pt-20 container mx-auto px-4">
        <div className="text-center my-12">
          <div className="flex justify-center mb-6">
            <Logo size="large" asLink={false} className="mx-auto" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient glow-effect">
            Our Projects
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-12 text-foreground/80">
            Explore our portfolio of cutting-edge web applications, innovative 3D experiences, 
            and creative digital solutions that we've delivered for clients across various industries.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <Card key={index} className="project-card border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden hover:shadow-lg hover:border-[#0FA0CE]/40 transition-all duration-300">
              <div className="h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="text-sm text-foreground/80 mb-4">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span 
                      key={i}
                      className="text-xs px-2 py-1 bg-[#0FA0CE]/10 text-[#0FA0CE] rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-2 border-[#D946EF]/40 text-[#D946EF] hover:bg-[#D946EF]/10"
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mb-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gradient">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-8 text-foreground/80">
            Let's transform your vision into reality with our cutting-edge technology and creative expertise.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-[#0FA0CE] to-[#D946EF] hover:opacity-90 text-white transition-all border-0 glow-effect">
            Contact Us Today <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Projects;
