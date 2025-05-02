
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { setupParticleSystem } from "./three/ParticleSystem";
import { setupNodeSystem } from "./three/NodeSystem";
import { setupLighting } from "./three/SceneUtils";
import { Progress } from "./ui/progress";
import { Skeleton } from "./ui/skeleton";
import { useTheme } from "@/contexts/ThemeContext";

interface ThreeSceneProps {
  className?: string;
  intensity?: number;
  density?: number;
  speed?: number;
  interactive?: boolean;
}

const ThreeScene = ({ 
  className = "", 
  intensity = 1, 
  density = 1,
  speed = 1,
  interactive = true
}: ThreeSceneProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const { isDarkMode } = useTheme();
  
  useEffect(() => {
    if (!mountRef.current) return;
    
    let animationFrameId: number;
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        // Simulate loading progress
        const newProgress = Math.min(prev + Math.random() * 15, 90);
        return newProgress;
      });
    }, 200);
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);
    
    // Add a subtle fog to add depth
    scene.fog = new THREE.FogExp2(isDarkMode ? 0x0F0F18 : 0x121212, 0.08);
    
    // Add lighting with adjusted intensity
    const lights = setupLighting(scene, isDarkMode, intensity);
    
    // Add particle system with adjusted density
    const particles = setupParticleSystem(scene, isDarkMode, density);
    
    // Add node system
    const { nodes, connections, updateConnections } = setupNodeSystem(scene, isDarkMode, density);
    
    // Camera position
    camera.position.z = 8;
    
    // Mouse interaction for parallax effect
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
    
    const handleMouseMove = (event: MouseEvent) => {
      if (!interactive) return;
      
      mouseX = (event.clientX - windowHalfX) / 100;
      mouseY = (event.clientY - windowHalfY) / 100;
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    // Complete loading after all scene elements are initialized
    setTimeout(() => {
      clearInterval(progressInterval);
      setLoadingProgress(100);
      setTimeout(() => setLoading(false), 500); // Delay to show 100% progress
    }, 1500);
    
    // Animation loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      // Gentle scene rotation - adjusted by speed parameter
      scene.rotation.y += 0.0005 * speed;
      scene.rotation.x += 0.0002 * speed;
      
      // Smooth camera movement following mouse position
      targetX = mouseX * 0.15;
      targetY = mouseY * 0.15;
      
      scene.rotation.y += 0.005 * (targetX - scene.rotation.y);
      scene.rotation.x += 0.005 * (targetY - scene.rotation.x);
      
      // Move particles slightly - adjusted by speed parameter
      particles.rotation.y += 0.0003 * speed;
      
      // Update connections
      if (Math.random() > 0.95) { // Only update connections occasionally for performance
        updateConnections();
      }
      
      renderer.render(scene, camera);
    };
    
    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    
    window.addEventListener("resize", handleResize);
    animate();
    
    // Clean up
    return () => {
      clearInterval(progressInterval);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Cleanup will be handled by each system's setup function
      renderer.dispose();
    };
  }, [isDarkMode, intensity, density, speed, interactive]);
  
  return (
    <div ref={mountRef} className={`relative ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-10">
          <div className="flex flex-col items-center space-y-6 max-w-xs w-full">
            <Skeleton className="w-16 h-16 rounded-full bg-primary/20 animate-pulse" />
            <Progress value={loadingProgress} className="w-full h-2 bg-primary/20" />
            <p className="text-sm text-gradient animate-pulse">
              Initializing 3D environment...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThreeScene;
