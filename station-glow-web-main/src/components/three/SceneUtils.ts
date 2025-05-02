
import * as THREE from "three";

export const setupLighting = (
  scene: THREE.Scene, 
  isDarkMode: boolean = false,
  intensity: number = 1
): THREE.Light[] => {
  // Clean up any existing lights
  scene.children.forEach(child => {
    if (child instanceof THREE.Light) {
      scene.remove(child);
    }
  });
  
  const lights: THREE.Light[] = [];
  
  // Adjust light intensities based on theme and intensity parameter
  const ambientIntensity = isDarkMode ? 0.5 * intensity : 1 * intensity;
  const pointIntensity1 = isDarkMode ? 30 * intensity : 50 * intensity;
  const pointIntensity2 = isDarkMode ? 25 * intensity : 40 * intensity;
  const pointIntensity3 = isDarkMode ? 15 * intensity : 25 * intensity;
  
  // Ambient light for base illumination
  const ambientLight = new THREE.AmbientLight(0x404040, ambientIntensity);
  scene.add(ambientLight);
  lights.push(ambientLight);
  
  // Main colored lights for dramatic effect
  const pointLight = new THREE.PointLight(0xD946EF, pointIntensity1);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);
  lights.push(pointLight);
  
  const pointLight2 = new THREE.PointLight(0x0FA0CE, pointIntensity2);
  pointLight2.position.set(-5, -5, 2);
  scene.add(pointLight2);
  lights.push(pointLight2);
  
  // Add a third light for more dynamic lighting
  const pointLight3 = new THREE.PointLight(0x9b87f5, pointIntensity3);
  pointLight3.position.set(0, 5, -5);
  scene.add(pointLight3);
  lights.push(pointLight3);
  
  return lights;
};
