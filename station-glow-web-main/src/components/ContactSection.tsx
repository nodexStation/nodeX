
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import Logo from "./Logo";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const { toast } = useToast();
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoCardsRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  useEffect(() => {
    const section = sectionRef.current;
    const form = formRef.current;
    const infoCards = infoCardsRef.current;
    
    if (!section || !form || !infoCards) return;
    
    // Form animation
    gsap.from(form, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: section,
        start: "top bottom-=100",
        toggleActions: "play none none none"
      }
    });
    
    // Info cards animation
    gsap.from(infoCards.children, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      scrollTrigger: {
        trigger: infoCards,
        start: "top bottom-=50",
        toggleActions: "play none none none"
      }
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission success
    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };
  
  return (
    <section id="contact" ref={sectionRef} className="py-24 bg-black/30 relative">
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden">
        <div className="absolute top-[20%] right-[10%] w-64 h-64 rounded-full bg-[#D946EF]/10 filter blur-[100px]"></div>
        <div className="absolute bottom-[30%] left-[10%] w-72 h-72 rounded-full bg-[#0FA0CE]/10 filter blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <Logo size="large" asLink={false} showText={false} className="mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Get in Touch
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-foreground/80">
            Have questions about Nodex Station? Ready to transform your business? 
            Our team is here to help you build your next digital experience.
          </p>
          
          <div className="flex items-center justify-center gap-2 mt-4">
            <Mail size={20} className="text-[#D946EF]" />
            <a href="mailto:nodexstation@gmail.com" className="text-[#0FA0CE] hover:text-[#D946EF] transition-colors">
              nodexstation@gmail.com
            </a>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-2">
            <div ref={infoCardsRef} className="space-y-6">
              <Card className="border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
                <CardContent className="pt-6 flex items-start gap-4">
                  <div className="bg-gradient-to-br from-[#0FA0CE] to-[#D946EF] p-3 rounded-lg">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Email Us</h3>
                    <p className="text-gray-300 text-sm mb-1">For general inquiries:</p>
                    <a href="mailto:nodexstation@gmail.com" className="text-[#0FA0CE] text-sm hover:underline">nodexstation@gmail.com</a>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
                <CardContent className="pt-6 flex items-start gap-4">
                  <div className="bg-gradient-to-br from-[#D946EF] to-[#9b87f5] p-3 rounded-lg">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Visit Us</h3>
                    <p className="text-gray-300 text-sm">100 Technology Drive</p>
                    <p className="text-gray-300 text-sm">San Francisco, CA 94103</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
                <CardContent className="pt-6 flex items-start gap-4">
                  <div className="bg-gradient-to-br from-[#9b87f5] to-[#0FA0CE] p-3 rounded-lg">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Call Us</h3>
                    <p className="text-gray-300 text-sm">Sales & Support:</p>
                    <p className="text-[#0FA0CE] text-sm">+1 (555) 123-4567</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
                <CardContent className="pt-6 flex items-start gap-4">
                  <div className="bg-gradient-to-br from-[#0FA0CE] to-[#D946EF] p-3 rounded-lg">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Business Hours</h3>
                    <p className="text-gray-300 text-sm">Monday - Friday: 9AM - 6PM</p>
                    <p className="text-gray-300 text-sm">Weekend: By appointment</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <Card className="border border-white/10 bg-white/5 backdrop-blur-sm">
              <CardContent className="pt-6">
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[#D946EF] focus:ring-[#D946EF]"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your email address"
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[#D946EF] focus:ring-[#D946EF]"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-white">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What is your message about?"
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[#D946EF] focus:ring-[#D946EF]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-white">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      rows={5}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[#D946EF] focus:ring-[#D946EF]"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-[#0FA0CE] to-[#D946EF] hover:opacity-90 text-white transition-all border-0 glow-effect"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
