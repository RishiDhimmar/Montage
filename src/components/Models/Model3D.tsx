import React from "react";
import * as THREE from "three";
import { materials } from "../../utils/materials"; 
import modelStore from "../../stores/ModelStore";

interface ClonedNode {
  geometry: THREE.BufferGeometry;
  material: THREE.Material | null;
  name: string;
  matrixWorld: THREE.Matrix4;
  parent?: { name: string; visible: boolean };
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
      scale={modelStore.getScale(id) || [1, 1, 1]}
    >
      {Object.entries(nodes).map(([key, node]) => {

        // Hide node if its name contains "Roof" or if its parent's name is "Ceiling"
        if (node.name.includes("Roof") || node.name.includes("Ceil") || (node.parent && node.parent.name.includes("Ceiling"))) {
          return null;

        }
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
          />
        );
      })}
    </group>
  );
};

export default Model3D;
