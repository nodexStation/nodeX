
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import Logo from "./Logo";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-nodex-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Logo asLink={true} showText={true} size="medium" className="mb-4" />
            <p className="text-gray-300 mb-4">
              Connecting the world through innovative technology solutions with cutting-edge 3D experiences and responsive design systems.
            </p>
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-[#D946EF]" />
              <a href="mailto:nodexstation@gmail.com" className="text-gray-300 hover:text-white transition-colors">
                nodexstation@gmail.com
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/#features" className="text-gray-300 hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/#about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/#contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/projects" className="text-gray-300 hover:text-white transition-colors">Projects</Link></li>
              <li><Link to="/team" className="text-gray-300 hover:text-white transition-colors">Our Team</Link></li>
              <li><Link to="/vision" className="text-gray-300 hover:text-white transition-colors">Our Vision</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors">Cookies Policy</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors">Accessibility</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors">GDPR Compliance</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Subscribe</h3>
            <p className="text-gray-300 mb-4">
              Stay updated with our latest news, tech insights, and special offers. Join our newsletter today.
            </p>
            <div className="flex gap-2">
              <Input 
                placeholder="Your email" 
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400" 
              />
              <Button className="bg-nodex hover:bg-nodex-accent">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Nodex Station. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="https://twitter.com/nodexstation" className="text-gray-400 hover:text-white transition-colors">
              Twitter
            </a>
            <a href="https://linkedin.com/company/nodexstation" className="text-gray-400 hover:text-white transition-colors">
              LinkedIn
            </a>
            <a href="https://github.com/nodexstation" className="text-gray-400 hover:text-white transition-colors">
              GitHub
            </a>
            <a href="https://instagram.com/nodexstation" className="text-gray-400 hover:text-white transition-colors">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
