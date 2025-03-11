// import { useGLTF } from "@react-three/drei";
// import React, { useMemo } from "react";
// import EdgeModel from "./EdgeModel";

// interface ModelRendererProps {
//   modelPath: string;
//   position: [number, number, number];
//   onLoad?: () => void;
//   is3D: boolean;
// }

// export const ModelViewer: React.FC<ModelRendererProps> = ({ is3D, modelPath, position, onLoad }) => {
//   const { nodes, scene } = useGLTF(modelPath);

//   // Always create a fresh copy of nodes when switching between 3D and 2D
//   const clonedNodes = useMemo(() => {
//     const cloned = {};
//     for (const key in nodes) {
//       cloned[key] = nodes[key].clone();
//     }
//     return cloned;
//   }, [nodes, is3D]); // Ensures re-computation when switching modes

//   React.useEffect(() => {
//     if (onLoad) onLoad();
//   }, [onLoad]);

//   return is3D ? <primitive object={scene} position={position} /> : <EdgeModel nodes={clonedNodes} position={position} />;
// };

// export default ModelViewer;
import React, { useMemo, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import EdgeModel from "./EdgeModel";
import { observer } from "mobx-react-lite";
import modelStore from "../../stores/ModelStore";

interface ModelRendererProps {
  modelPath: string;
  position: [number, number, number];
  onLoad?: () => void;
  is3D: boolean;
}

export const ModelViewer: React.FC<ModelRendererProps> = observer(({ is3D, modelPath, position, onLoad }) => {
  const { nodes, scene } = useGLTF(modelPath);

  // Deep clone nodes so that materials and geometries are duplicated
  const clonedNodes = useMemo(() => {
    const cloned: Record<string, THREE.Object3D> = {};
    for (const key in nodes) {
      const node = nodes[key] as THREE.Object3D;
      const nodeClone = node.clone();
      // Clone material if it exists
      if ((node as THREE.Mesh).material) {
        nodeClone.material = (node as THREE.Mesh).material.clone();
      }
      // Clone geometry if it exists
      if ((node as THREE.Mesh).geometry) {
        nodeClone.geometry = (node as THREE.Mesh).geometry.clone();
      }
      cloned[key] = nodeClone;
    }
    return cloned;
  }, [nodes, is3D]); // Recompute when switching modes

  useEffect(() => {
    if (onLoad) onLoad();
  }, [onLoad]);

  return modelStore.is3d ? (
    <primitive object={scene} position={position} />
  ) : (
    <EdgeModel nodes={clonedNodes} position={position} />
  );
})

export default ModelViewer;
