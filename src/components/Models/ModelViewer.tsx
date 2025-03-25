// import React, { Suspense } from "react";
// import { useGLTF } from "@react-three/drei";
// import EdgeModel from "./EdgeModel";
// import Model3D from "./Model3D";
// import { observer } from "mobx-react-lite";
// import modelStore from "../../stores/ModelStore";
// import * as THREE from "three";

// // Define the ClonedNode interface expected by Model3D.
// export interface ClonedNode {
//   geometry: THREE.BufferGeometry;
//   material: THREE.Material | null;
//   name: string;
//   matrixWorld: THREE.Matrix4;
//   parent?: { name: string; visible: boolean };
//   extras?: { tag?: string };
// }

// interface ModelViewerProps {
//   id: number;
//   modelPath: string;
//   position: [number, number, number];
//   onLoad?: () => void;
// }

// const ModelViewer: React.FC<ModelViewerProps> = observer(({ id, modelPath, position }) => {
//   const { nodes, scene } = useGLTF(modelPath);

 
//   return modelStore.is3d ? (
//     <Model3D
//       id={id}
//       nodes={nodes}
//       position={position}
//       rotation={modelStore.getRotation(id) || [0, 0, 0]}
//     />
//   ) : (
//     <Suspense fallback={null}>
//       <EdgeModel id={id} scene={scene as THREE.Group} />
//     </Suspense>
//   );
// });

// export default ModelViewer;


import React, { Suspense } from "react";
import { useGLTF } from "@react-three/drei";
import EdgeModel from "./EdgeModel";
import Model3D from "./Model3D";
import { observer } from "mobx-react-lite";
import modelStore from "../../stores/ModelStore";
import * as THREE from "three";

// Define the ClonedNode interface expected by Model3D.
export interface ClonedNode {
  geometry: THREE.BufferGeometry;
  material: THREE.Material | null;
  name: string;
  matrixWorld: THREE.Matrix4;
  parent?: { name: string; visible: boolean };
  extras?: { tag?: string };
}

interface ModelViewerProps {
  id: number;
  modelPath: string;
  position: [number, number, number];
  onLoad?: () => void;
}

const ModelViewer: React.FC<ModelViewerProps> = observer(({ id, modelPath, position }) => {
  const { nodes: gltfNodes, scene } = useGLTF(modelPath);

  // Convert nodes to ClonedNode type
  const nodes: Record<string, ClonedNode> = Object.fromEntries(
    Object.entries(gltfNodes)
      .filter(([, node]) => node instanceof THREE.Mesh) // Ensure only Mesh objects
      .map(([key, node]) => {
        const mesh = node as THREE.Mesh;
        return [
          key,
          {
            geometry: mesh.geometry,
            material: Array.isArray(mesh.material) ? mesh.material[0] : mesh.material || null, // Ensure single material
            name: mesh.name,
            matrixWorld: mesh.matrixWorld,
            parent: mesh.parent ? { name: mesh.parent.name, visible: mesh.parent.visible } : undefined,
          },
        ];
      })
  );

  return modelStore.is3d ? (
    <Model3D
      id={id}
      nodes={nodes}
      position={position}
      rotation={modelStore.getRotation(id) || [0, 0, 0]}
    />
  ) : (
    <Suspense fallback={null}>
      <EdgeModel id={id} scene={scene as THREE.Group} />
    </Suspense>
  );
});

export default ModelViewer;
