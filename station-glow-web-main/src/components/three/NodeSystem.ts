
import * as THREE from "three";
import gsap from "gsap";

interface NodeSystemReturn {
  nodes: THREE.Mesh[];
  connections: THREE.Line[];
  updateConnections: () => void;
}

export const setupNodeSystem = (
  scene: THREE.Scene, 
  isDarkMode: boolean = false,
  density: number = 1
): NodeSystemReturn => {
  // Remove existing nodes and connections
  scene.children.forEach(child => {
    if ((child instanceof THREE.Mesh && child.userData.isNode) || 
        (child instanceof THREE.Line && child.userData.isConnection)) {
      scene.remove(child);
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach(mat => mat.dispose());
        } else {
          child.material.dispose();
        }
      }
    }
  });
  
  // Create nodes and connections with adjusted density
  const nodeCount = Math.floor(25 * density);
  const nodes: THREE.Mesh[] = [];
  const connections: THREE.Line[] = [];
  const nodePositions: THREE.Vector3[] = [];
  
  // Create node materials with colors adjusted for dark mode and enhanced glowing effect
  const nodeMaterials = [
    new THREE.MeshStandardMaterial({ 
      color: 0xD946EF,
      roughness: isDarkMode ? 0.3 : 0.2,
      metalness: isDarkMode ? 0.8 : 0.9,
      emissive: 0xD946EF,
      emissiveIntensity: isDarkMode ? 0.6 : 0.5
    }),
    new THREE.MeshStandardMaterial({ 
      color: 0x0FA0CE,
      roughness: isDarkMode ? 0.3 : 0.2,
      metalness: isDarkMode ? 0.8 : 0.9,
      emissive: 0x0FA0CE,
      emissiveIntensity: isDarkMode ? 0.6 : 0.5
    }),
    new THREE.MeshStandardMaterial({ 
      color: 0x9b87f5,
      roughness: isDarkMode ? 0.3 : 0.2,
      metalness: isDarkMode ? 0.8 : 0.9,
      emissive: 0x9b87f5,
      emissiveIntensity: isDarkMode ? 0.6 : 0.5
    })
  ];
  
  // Create more varied node geometries
  const nodeGeometries = [
    new THREE.SphereGeometry(0.15, 16, 16),
    new THREE.OctahedronGeometry(0.18, 0),
    new THREE.DodecahedronGeometry(0.17, 0),
    new THREE.IcosahedronGeometry(0.16, 0)
  ];
  
  // Create nodes in random positions
  for (let i = 0; i < nodeCount; i++) {
    // Select random material and geometry
    const materialIndex = Math.floor(Math.random() * nodeMaterials.length);
    const geometryIndex = Math.floor(Math.random() * nodeGeometries.length);
    
    const node = new THREE.Mesh(nodeGeometries[geometryIndex], nodeMaterials[materialIndex]);
    
    // Create a more interesting distribution of nodes
    const radius = 8 * Math.random();
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);
    
    node.position.set(x, y, z);
    node.userData.isNode = true;
    nodePositions.push(new THREE.Vector3(x, y, z));
    nodes.push(node);
    scene.add(node);
    
    // Add a subtle pulse animation to each node
    gsap.to(node.scale, {
      x: 1.3,
      y: 1.3,
      z: 1.3,
      duration: 2 + Math.random() * 3,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      delay: Math.random() * 2
    });
    
    // Animate each node with GSAP
    gsap.to(node.position, {
      x: x + (Math.random() - 0.5) * 2,
      y: y + (Math.random() - 0.5) * 2,
      z: z + (Math.random() - 0.5) * 2,
      duration: 4 + Math.random() * 10,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });
  }
  
  // Create connections between nearby nodes with improved visuals
  const connectionMaterials = [
    new THREE.LineBasicMaterial({ 
      color: 0xD946EF,
      transparent: true,
      opacity: isDarkMode ? 0.4 : 0.5,
      linewidth: 1.5
    }),
    new THREE.LineBasicMaterial({ 
      color: 0x0FA0CE,
      transparent: true,
      opacity: isDarkMode ? 0.4 : 0.5,
      linewidth: 1.5
    }),
    new THREE.LineBasicMaterial({ 
      color: 0x9b87f5,
      transparent: true,
      opacity: isDarkMode ? 0.4 : 0.5,
      linewidth: 1.5
    })
  ];
  
  // Function to update connections between nodes as they move
  const updateConnections = () => {
    connections.forEach(line => {
      scene.remove(line);
      if (line.geometry) line.geometry.dispose();
    });
    
    connections.length = 0;
    
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const distance = nodes[i].position.distanceTo(nodes[j].position);
        
        if (distance < 3.5) {  // Increased connection distance for more connections
          const materialIndex = Math.floor(Math.random() * connectionMaterials.length);
          const geometry = new THREE.BufferGeometry().setFromPoints([
            nodes[i].position,
            nodes[j].position
          ]);
          
          const line = new THREE.Line(geometry, connectionMaterials[materialIndex]);
          line.userData.isConnection = true;
          connections.push(line);
          scene.add(line);
          
          // Add subtle pulsing opacity to connections
          if (Math.random() > 0.7) {
            const material = line.material as THREE.LineBasicMaterial;
            const baseOpacity = material.opacity || 0.5;
            
            gsap.to(material, {
              opacity: baseOpacity * 0.4,
              duration: 1 + Math.random() * 2,
              yoyo: true,
              repeat: -1,
              ease: "sine.inOut"
            });
          }
        }
      }
    }
  };

  // Initial connection setup
  updateConnections();
  
  // Add cleanup function to ThreeJS objects
  scene.userData.disposeNodeSystem = () => {
    nodeGeometries.forEach(geometry => geometry.dispose());
    nodeMaterials.forEach(material => material.dispose());
    connectionMaterials.forEach(material => material.dispose());
    
    connections.forEach(connection => {
      if (connection.geometry) connection.geometry.dispose();
    });
  };

  return { nodes, connections, updateConnections };
};
