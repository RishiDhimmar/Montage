import React from "react";
import * as THREE from "three";
import { materials } from "../../utils/materials"; // Ensure this file exports your material definitions
import modelStore from "../../stores/ModelStore";

interface ClonedNode {
  geometry: THREE.BufferGeometry;
  material: THREE.Material | null;
  name: string;
  matrixWorld: THREE.Matrix4;
}

interface Model3DProps {
  id: number;
  nodes: Record<string, ClonedNode>;
  position: [number, number, number];
  rotation: [number, number, number];
}

const Model3D: React.FC<Model3DProps> = ({ id, nodes, position, rotation }) => {
  return (
    <group
      position={modelStore.getPosition(id)}
      rotation={modelStore.getRotation(id)}
    >
      {Object.entries(nodes).map(([key, node]) => {
        // Set visibility based on name conditions
        const visible = !node.name.includes("Ceiling");

        if (node.name.includes("Ceiling")) {
          console.log(node);
        }
        // Override material with cyan if the node's name includes "Node"
        const assignedMaterial = node.name.includes("Node")
          ? materials.cyan
          : node.material ?? undefined;

        return (
          <mesh
            key={key}
            geometry={node.geometry}
            material={assignedMaterial}
            matrixAutoUpdate={false}
            matrix={node.matrixWorld}
            visible={visible}
          />
        );
      })}
    </group>
  );
};

export default Model3D;

