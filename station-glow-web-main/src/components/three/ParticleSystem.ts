
import * as THREE from "three";

export const setupParticleSystem = (
  scene: THREE.Scene, 
  isDarkMode: boolean = false,
  density: number = 1
): THREE.Points => {
  // Remove existing particle systems
  scene.children.forEach(child => {
    if (child instanceof THREE.Points) {
      if (child.userData.isParticleSystem) {
        scene.remove(child);
        if (child.geometry) child.geometry.dispose();
        if (child.material) (child.material as THREE.Material).dispose();
      }
    }
  });
  
  // Create particles system with adjusted density
  const particleCount = Math.floor(1200 * density);
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesPosition = new Float32Array(particleCount * 3);
  const particlesSizes = new Float32Array(particleCount);
  const particlesColors = new Float32Array(particleCount * 3);
  
  // Color palette
  const colors = [
    new THREE.Color(0xD946EF), // Magenta
    new THREE.Color(0x0FA0CE), // Cyan
    new THREE.Color(0x9b87f5), // Purple
    new THREE.Color(isDarkMode ? 0x888888 : 0xffffff) // White/Gray
  ];
  
  // Fill positions array with random positions
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    // Create a more interesting distribution
    const radius = 15 * Math.random();
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    
    particlesPosition[i3] = radius * Math.sin(phi) * Math.cos(theta);
    particlesPosition[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    particlesPosition[i3 + 2] = radius * Math.cos(phi);
    
    // Vary particle sizes
    particlesSizes[i] = Math.random() * 3 + 0.5;
    
    // Add color
    const colorIndex = Math.floor(Math.random() * colors.length);
    const color = colors[colorIndex];
    particlesColors[i3] = color.r;
    particlesColors[i3 + 1] = color.g;
    particlesColors[i3 + 2] = color.b;
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlesPosition, 3));
  particlesGeometry.setAttribute('size', new THREE.BufferAttribute(particlesSizes, 1));
  particlesGeometry.setAttribute('color', new THREE.BufferAttribute(particlesColors, 3));
  
  // Create particle materials with improved visuals
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.12,
    sizeAttenuation: true,
    transparent: true,
    opacity: isDarkMode ? 0.7 : 0.9,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  
  const particles = new THREE.Points(particlesGeometry, particlesMaterial);
  particles.userData.isParticleSystem = true;
  scene.add(particles);
  
  // Add cleanup functions to the geometry and material
  particles.userData.dispose = () => {
    particlesGeometry.dispose();
    particlesMaterial.dispose();
  };
  
  return particles;
};
