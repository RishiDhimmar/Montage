import { Edges } from "@react-three/drei";
import React from "react";

function EdgeModel({ nodes, position }) {
  return (
    <group position={position}>
      {Object.keys(nodes).map((key) => {
        const node = nodes[key];

        if (node.isMesh) {
        if(node.name.includes("Roof")) return null
          // Clone the node to avoid modifying the original
          const clonedGeometry = node.geometry.clone();
          clonedGeometry.applyMatrix4(node.matrixWorld);

          

          return (
            <mesh key={key} geometry={clonedGeometry}>
              <Edges color={"black"} threshold={15}/>
            </mesh>
          );
        }
        return null;
      })}
    </group>
  );
}

export default EdgeModel;
