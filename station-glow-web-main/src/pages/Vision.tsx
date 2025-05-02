
import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThreeBackground from "@/components/ThreeBackground";
import Logo from "@/components/Logo";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Vision = () => {
  const sectionRefs = {
    vision: useRef<HTMLDivElement>(null),
    mission: useRef<HTMLDivElement>(null),
    values: useRef<HTMLDivElement>(null),
    future: useRef<HTMLDivElement>(null)
  };
  
  useEffect(() => {
    // Header animation
    const title = document.querySelector('.vision-title');
    const subtitle = document.querySelector('.vision-subtitle');
    
    if (title && subtitle) {
      gsap.from(title, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });
      
      gsap.from(subtitle, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2
      });
    }
    
    // Animate sections when scrolled into view
    Object.values(sectionRefs).forEach(ref => {
      if (!ref.current) return;
      
      gsap.from(ref.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom-=100",
          toggleActions: "play none none none"
        }
      });
    });
    
    // Values animation
    const valueItems = document.querySelectorAll('.value-item');
    
    valueItems.forEach((item, index) => {
      gsap.from(item, {
        x: index % 2 === 0 ? -30 : 30,
        opacity: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: item,
          start: "top bottom-=50",
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
      <ThreeBackground intensity={1.2} density={0.9} speed={0.7} />
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4">
          <div className="text-center my-12">
            <div className="flex justify-center mb-6">
              <Logo size="large" asLink={false} className="mx-auto" />
            </div>
            <h1 className="vision-title text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient glow-effect">
              Our Vision
            </h1>
            <p className="vision-subtitle text-lg md:text-xl max-w-3xl mx-auto mb-12 text-foreground/80">
              Pioneering the future of digital experiences through innovative technology, 
              creative design, and meaningful connections.
            </p>
            
            <div className="relative w-1 h-24 bg-gradient-to-b from-[#0FA0CE] to-[#D946EF] mx-auto"></div>
          </div>
          
          <div ref={sectionRefs.vision} className="max-w-4xl mx-auto my-20 p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
            <h2 className="text-3xl font-bold mb-6 text-gradient">The Nodex Vision</h2>
            <p className="text-lg mb-6 text-foreground/90">
              At Nodex Station, we envision a digital landscape where technology seamlessly enhances human experiences, 
              where businesses of all sizes can harness the full potential of cutting-edge web technologies without 
              compromise, and where innovation is accessible to everyone.
            </p>
            <p className="text-lg mb-6 text-foreground/90">
              We're building a future where immersive 3D experiences, responsive design, and intelligent systems come 
              together to create digital solutions that are not only functional but also emotionally resonant and 
              visually stunning.
            </p>
            <p className="text-lg text-foreground/90">
              Our vision extends beyond creating websites and applications—we're creating digital ecosystems that 
              evolve, adapt, and grow alongside your business, providing lasting value and continuous innovation.
            </p>
          </div>
          
          <div ref={sectionRefs.mission} className="max-w-4xl mx-auto my-20 p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
            <h2 className="text-3xl font-bold mb-6 text-gradient">Our Mission</h2>
            <p className="text-lg mb-6 text-foreground/90">
              Our mission is to transform how businesses connect with their audiences by creating digital experiences 
              that blend technological innovation with human-centered design. We strive to:
            </p>
            
            <ul className="space-y-4 mb-6 pl-6">
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-gradient-to-r from-[#0FA0CE] to-[#D946EF] flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <p className="text-lg text-foreground/90">
                  <span className="font-bold text-[#0FA0CE]">Pioneer innovation</span> - Push the boundaries of what's possible 
                  in web development by embracing emerging technologies and creative approaches.
                </p>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-gradient-to-r from-[#D946EF] to-[#9b87f5] flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <p className="text-lg text-foreground/90">
                  <span className="font-bold text-[#D946EF]">Empower businesses</span> - Equip organizations with digital tools 
                  that enhance their capabilities, reach, and impact in their respective industries.
                </p>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-gradient-to-r from-[#9b87f5] to-[#0FA0CE] flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <p className="text-lg text-foreground/90">
                  <span className="font-bold text-[#9b87f5]">Deliver excellence</span> - Maintain the highest standards of quality, 
                  performance, and reliability in every project we undertake.
                </p>
              </li>
            </ul>
            
            <p className="text-lg text-foreground/90">
              Through our work, we aim to create lasting relationships with our clients based on trust, 
              collaborative problem-solving, and shared success.
            </p>
          </div>
          
          <div ref={sectionRefs.values} className="my-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-6 text-gradient">Our Core Values</h2>
              <p className="text-lg max-w-3xl mx-auto text-foreground/80">
                These principles guide our decisions, shape our culture, and define how we approach our work.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="value-item p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-r from-[#0FA0CE] to-[#D946EF] rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white text-xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#0FA0CE]">Innovation</h3>
                <p className="text-foreground/90">
                  We constantly explore new technologies and approaches to create solutions that stand out in a crowded digital landscape.
                </p>
              </div>
              
              <div className="value-item p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-r from-[#D946EF] to-[#9b87f5] rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white text-xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#D946EF]">Collaboration</h3>
                <p className="text-foreground/90">
                  We believe the best work emerges from close partnerships between our team and our clients, built on clear communication.
                </p>
              </div>
              
              <div className="value-item p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-r from-[#9b87f5] to-[#0FA0CE] rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white text-xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#9b87f5]">Excellence</h3>
                <p className="text-foreground/90">
                  We hold ourselves to the highest standards in code quality, design aesthetics, and user experience in everything we create.
                </p>
              </div>
              
              <div className="value-item p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-r from-[#0FA0CE] to-[#9b87f5] rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white text-xl font-bold">4</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#0FA0CE]">Adaptability</h3>
                <p className="text-foreground/90">
                  We embrace change and remain flexible, continuously evolving our skills and approaches to meet emerging challenges.
                </p>
              </div>
              
              <div className="value-item p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-r from-[#D946EF] to-[#0FA0CE] rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white text-xl font-bold">5</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#D946EF]">Integrity</h3>
                <p className="text-foreground/90">
                  We operate with transparency, honesty, and ethical standards that build trust and foster lasting relationships.
                </p>
              </div>
              
              <div className="value-item p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-r from-[#9b87f5] to-[#D946EF] rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white text-xl font-bold">6</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#9b87f5]">Impact</h3>
                <p className="text-foreground/90">
                  We measure our success by the tangible results we deliver for our clients and the positive difference we make.
                </p>
              </div>
            </div>
          </div>
          
          <div ref={sectionRefs.future} className="max-w-4xl mx-auto my-20">
            <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
              <h2 className="text-3xl font-bold mb-6 text-gradient">Looking to the Future</h2>
              <p className="text-lg mb-6 text-foreground/90">
                As technology continues to evolve at an accelerating pace, we're committed to staying at the forefront 
                of innovation. Our roadmap includes exploring emerging technologies such as:
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-[#0FA0CE] rounded-full mt-2.5 mr-3"></div>
                  <p className="text-foreground/90">Advanced AI integration for more personalized user experiences</p>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-[#D946EF] rounded-full mt-2.5 mr-3"></div>
                  <p className="text-foreground/90">Extended reality (XR) applications that blur the line between physical and digital</p>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-[#9b87f5] rounded-full mt-2.5 mr-3"></div>
                  <p className="text-foreground/90">Web3 technologies that enable new models of digital ownership and interaction</p>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-[#0FA0CE] rounded-full mt-2.5 mr-3"></div>
                  <p className="text-foreground/90">Sustainable development practices that minimize environmental impact</p>
                </li>
              </ul>
              
              <p className="text-lg mb-8 text-foreground/90">
                We invite you to join us on this exciting journey as we shape the future of digital experiences together.
              </p>
              
              <div className="text-center">
                <Button size="lg" className="bg-gradient-to-r from-[#0FA0CE] to-[#D946EF] hover:opacity-90 text-white transition-all border-0 glow-effect">
                  Start Your Project <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Vision;
