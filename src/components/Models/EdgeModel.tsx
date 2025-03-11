// import { Edges } from "@react-three/drei";
// import React from "react";
// import * as THREE from "three";

// function EdgeModel({ nodes, position }) {
//     const whiteMaterial = new THREE.MeshBasicMaterial({ color: "white" });
//     const cyanMaterial = new THREE.MeshBasicMaterial({ color: "cyan", transparent: true, opacity: 0.5 });
//   return (
//     <group position={position}>
        
//       {Object.keys(nodes).map((key) => {
//         const node = nodes[key];
//         if (!node.isMesh || node.name.includes("Roof")) return null;
        

//         return (
//           <mesh
//             key={key}
//             geometry={node.geometry}
//             material={(node.name.includes("Node") && cyanMaterial)  || whiteMaterial}
//             matrix={node.matrixWorld} // Use world matrix for global placement
//             matrixAutoUpdate={false}  // Prevent automatic matrix updates
//           >
//             <Edges color={node.name.includes("Wall") ? "black" : "gray"} lineWidth={1} threshold={1} />
//           </mesh>
//         );
//       })}
//     </group>
//   );
// }

// export default EdgeModel;
// import { Edges } from "@react-three/drei";
// import React, { useMemo } from "react";
// import * as THREE from "three";

// function EdgeModel({ nodes, position }) {
//   // Define materials to ensure consistency
//   const materials = useMemo(() => ({
//     white: new THREE.MeshBasicMaterial({ color: "white" }),
//     gray: new THREE.MeshBasicMaterial({ color: "#f3f3f0" }),
//     cyan: new THREE.MeshBasicMaterial({ color: "cyan", transparent: true, opacity: 0.5 }),
//   }), []);

//   // Store processed nodes to ensure stability across re-renders
//   const processedNodes = useMemo(() => {
//     const clonedNodes = {};
//     for (const key of Object.keys(nodes)) {
//       const node = nodes[key];
//       if (!node.isMesh ) continue;
//       if(node.name.includes("Roof")) continue;
//       console.log(node.name)

//       // Clone geometry and apply transformations
//       const clonedGeometry = node.geometry.clone();
//       clonedGeometry.applyMatrix4(node.matrixWorld);

//       // Store cloned nodes with proper materials
//       clonedNodes[key] = {
//         geometry: clonedGeometry,
//         material: node.name.includes("Node") ? materials.cyan : node.name.includes("Floor") ? materials.gray : materials.white,
//         name: node.name
//       };
//     }
//     return clonedNodes;
//   }, [nodes, materials]);

//   return (
//     <group position={position}>
//       {Object.keys(processedNodes).map((key) => {
//         const { geometry, material, name } = processedNodes[key];
//         return (
//           <mesh key={key} geometry={geometry} material={material} >
//             <Edges color={name.includes("Wall") ? "black" : "gray"} lineWidth={1} threshold={1} />
//           </mesh>
//         );
//       })}
//     </group>
//   );
// }

// export default EdgeModel;

import { Edges } from "@react-three/drei";
import React, { useMemo } from "react";
import * as THREE from "three";

function EdgeModel({ nodes, position }) {
  // Define materials with stable references
  const materials = useMemo(() => ({
    white: new THREE.MeshBasicMaterial({ color: "white" }),
    gray: new THREE.MeshBasicMaterial({ color: "#f3f3f0" }),
    cyan: new THREE.MeshBasicMaterial({ color: "cyan", transparent: true, opacity: 0.5 }),
  }), []);

  // Store processed nodes to ensure stability across re-renders
  const processedNodes = useMemo(() => {
    const clonedNodes = {};
    
    for (const key of Object.keys(nodes)) {
      const node = nodes[key];
      if (!node.isMesh || node.name.includes("Roof")) continue;

      console.log("Processing node:", node.name);

      // Clone geometry properly and apply transformation
      const clonedGeometry = node.geometry.clone();
      clonedGeometry.applyMatrix4(new THREE.Matrix4().copy(node.matrixWorld)); 

      // Store cloned nodes with stable material references
      clonedNodes[key] = {
        geometry: clonedGeometry,
        material: node.name.includes("Node") 
          ? materials.cyan 
          : node.name.includes("Floor") 
          ? materials.gray 
          : materials.white,
        name: node.name
      };
    }
    return clonedNodes;
  }, [nodes]); // Removed `materials` from dependencies to prevent unnecessary re-renders

  return (
    <group position={position}>
      {Object.keys(processedNodes).map((key) => {
        const { geometry, material, name } = processedNodes[key];
        return (
          <mesh key={`${key}-${Date.now()}`} geometry={geometry} material={material}>
            <Edges color={name.includes("Wall") ? "black" : "gray"} lineWidth={1} threshold={1} />
          </mesh>
        );
      })}
    </group>
  );
}

export default EdgeModel;

