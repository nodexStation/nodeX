
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { setupParticleSystem } from "./three/ParticleSystem";
import { setupNodeSystem } from "./three/NodeSystem";
import { setupLighting } from "./three/SceneUtils";
import { useTheme } from "@/contexts/ThemeContext";

interface ThreeBackgroundProps {
  intensity?: number;
  density?: number;
  speed?: number;
  interactive?: boolean;
}

const ThreeBackground = ({
  intensity = 1.2,
  density = 0.8,
  speed = 1,
  interactive = true
}: ThreeBackgroundProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useTheme();
  
  useEffect(() => {
    if (!mountRef.current) return;
    
    let animationFrameId: number;
    
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
    <div ref={mountRef} className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
    </div>
  );
};

export default ThreeBackground;
