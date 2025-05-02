
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThreeBackground from "@/components/ThreeBackground";
import Logo from "@/components/Logo";
import { Card, CardContent } from "@/components/ui/card";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: "Alex Morgan",
    role: "Founder & CEO",
    bio: "With over 15 years of experience in web development and digital innovation, Alex leads Nodex Station with a vision to transform how businesses connect with technology.",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5",
    social: {
      twitter: "alexmorgan",
      linkedin: "alex-morgan-nodex",
      github: "alexmorgan-dev"
    }
  },
  {
    name: "Sophia Chen",
    role: "Creative Director",
    bio: "Award-winning designer with expertise in UX/UI and brand identity. Sophia ensures that every Nodex Station project delivers an exceptional visual experience.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    social: {
      twitter: "sophiachen",
      linkedin: "sophia-chen-creative",
      github: "sophia-design"
    }
  },
  {
    name: "Marcus Johnson",
    role: "Lead Developer",
    bio: "Full-stack developer specialized in React and Three.js. Marcus brings technical excellence and innovative solutions to every project we undertake.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    social: {
      twitter: "marcusdev",
      linkedin: "marcus-johnson-dev",
      github: "marcusj-code"
    }
  },
  {
    name: "Elena Torres",
    role: "3D Graphics Specialist",
    bio: "Expert in WebGL and Three.js with background in game development. Elena creates immersive 3D experiences that set our projects apart.",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6",
    social: {
      twitter: "elenatorres3d",
      linkedin: "elena-torres-3d",
      github: "elena-3d"
    }
  },
  {
    name: "David Kim",
    role: "Backend Engineer",
    bio: "Specialized in scalable backend architecture and database optimization. David ensures our applications perform flawlessly even under heavy load.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    social: {
      twitter: "davidkimdev",
      linkedin: "david-kim-backend",
      github: "davidkim-code"
    }
  },
  {
    name: "Olivia Martinez",
    role: "Marketing Strategist",
    bio: "Digital marketing expert with a focus on growth strategies. Olivia helps our clients maximize their online presence and reach their target audience.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
    social: {
      twitter: "oliviamarketing",
      linkedin: "olivia-martinez-marketing",
      github: "olivia-strategy"
    }
  }
];

const Team = () => {
  useEffect(() => {
    const title = document.querySelector('.team-title');
    const description = document.querySelector('.team-description');
    const teamCards = document.querySelectorAll('.team-card');
    
    if (title && description) {
      gsap.from(title, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });
      
      gsap.from(description, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2
      });
    }
    
    teamCards.forEach((card, index) => {
      gsap.from(card, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=100",
          toggleActions: "play none none none"
        },
        delay: 0.1 * index
      });
    });
    
    // Clean up
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <ThreeBackground intensity={1} density={0.7} speed={0.9} />
      <Navbar />
      
      <main className="flex-grow pt-20 container mx-auto px-4">
        <div className="text-center my-12">
          <div className="flex justify-center mb-6">
            <Logo size="large" asLink={false} className="mx-auto" />
          </div>
          <h1 className="team-title text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient glow-effect">
            Meet Our Team
          </h1>
          <p className="team-description text-lg md:text-xl max-w-3xl mx-auto mb-16 text-foreground/80">
            We're a diverse team of creatives, developers, and strategists united by our passion 
            for building exceptional digital experiences that push technological boundaries.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {teamMembers.map((member, index) => (
            <Card key={index} className="team-card border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-4">
                  <h3 className="text-white text-xl font-bold">{member.name}</h3>
                  <p className="text-[#0FA0CE]">{member.role}</p>
                </div>
              </div>
              
              <CardContent className="p-6">
                <p className="text-foreground/90 mb-6 text-sm">
                  {member.bio}
                </p>
                
                <div className="flex space-x-3">
                  <a href={`https://twitter.com/${member.social.twitter}`} className="text-foreground/70 hover:text-[#0FA0CE] transition-colors">
                    <Twitter size={18} />
                  </a>
                  <a href={`https://linkedin.com/in/${member.social.linkedin}`} className="text-foreground/70 hover:text-[#0FA0CE] transition-colors">
                    <Linkedin size={18} />
                  </a>
                  <a href={`https://github.com/${member.social.github}`} className="text-foreground/70 hover:text-[#0FA0CE] transition-colors">
                    <Github size={18} />
                  </a>
                  <a href={`mailto:${member.social.twitter}@nodexstation.com`} className="text-foreground/70 hover:text-[#D946EF] transition-colors">
                    <Mail size={18} />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 mb-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gradient">
            Join Our Team
          </h2>
          <p className="text-center text-lg mb-8">
            We're always looking for talented individuals to join our team. If you're passionate about creating 
            exceptional digital experiences, we'd love to hear from you.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="border border-white/10 bg-white/5">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Senior React Developer</h3>
                <p className="text-sm text-foreground/80 mb-4">
                  Join our frontend team to build cutting-edge web applications with React and Three.js.
                </p>
                <Button variant="outline" className="w-full border-[#0FA0CE] text-[#0FA0CE] hover:bg-[#0FA0CE]/10">
                  Apply Now
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border border-white/10 bg-white/5">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">UX/UI Designer</h3>
                <p className="text-sm text-foreground/80 mb-4">
                  Create beautiful and intuitive user interfaces that delight our clients and their customers.
                </p>
                <Button variant="outline" className="w-full border-[#D946EF] text-[#D946EF] hover:bg-[#D946EF]/10">
                  Apply Now
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border border-white/10 bg-white/5">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Backend Developer</h3>
                <p className="text-sm text-foreground/80 mb-4">
                  Build robust and scalable backend systems with Node.js and modern database technologies.
                </p>
                <Button variant="outline" className="w-full border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5]/10">
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center">
            <Button size="lg" className="bg-gradient-to-r from-[#0FA0CE] to-[#D946EF] hover:opacity-90 text-white transition-all border-0 glow-effect">
              View All Positions
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Team;
