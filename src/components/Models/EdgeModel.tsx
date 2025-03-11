import { Edges } from "@react-three/drei";
import React from "react";
import * as THREE from "three";

function EdgeModel({ nodes, position }) {
    const whiteMaterial = new THREE.MeshBasicMaterial({ color: "white" });
    const cyanMaterial = new THREE.MeshBasicMaterial({ color: "cyan", transparent: true, opacity: 0.5 });
    const grayMaterial = new THREE.MeshBasicMaterial({ color: "lightgray" , transparent: true});
  return (
    <group position={position}>
        
      {Object.keys(nodes).map((key) => {
        const node = nodes[key];
        const copyNode = node.clone();
        if (!copyNode.isMesh || copyNode.name.includes("Roof")) return null;
        

        return (
          <mesh
            key={key}
            geometry={copyNode.geometry}
            material={(copyNode.name.includes("Node") && cyanMaterial)  || whiteMaterial}
            matrix={copyNode.matrixWorld} // Use world matrix for global placement
            matrixAutoUpdate={false}  // Prevent automatic matrix updates
          >
            <Edges color={copyNode.name.includes("Wall") ? "black" : "gray"} lineWidth={1} threshold={15} />
          </mesh>
        );
      })}
    </group>
  );
}

export default EdgeModel;
