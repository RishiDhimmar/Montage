// import { Suspense } from "react";
// import { useGLTF } from "@react-three/drei";
// import EdgeModel from "./EdgeModel";
// import Model3D from "./Model3D";
// import { observer } from "mobx-react-lite";
// import modelStore from "../../stores/ModelStore";

// interface ModelRendererProps {
//   id: number;
//   modelPath: string;
//   position: [number, number, number];
//   onLoad?: () => void;
// }

// const ModelViewer: React.FC<ModelRendererProps> = observer(
//   ({ id, modelPath }) => {
//     const { nodes, scene } = useGLTF(modelPath);

//     return modelStore.is3d ? (
//       <>
//         <Model3D id={id} nodes={nodes} />
//       </>
//     ) : (
//       <Suspense fallback={null}>
//         <EdgeModel id={id} scene={scene} />
//       </Suspense>
//     );
//   }
// );

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
  const { nodes, scene } = useGLTF(modelPath);

  // Convert nodes from useGLTF (Record<string, THREE.Object3D>) into ClonedNode objects.
  const clonedNodes: Record<string, ClonedNode> = {};
  Object.keys(nodes).forEach((key) => {
    const obj = nodes[key];
    // Process only nodes that are meshes (i.e. have a geometry)
    if ((obj as THREE.Mesh).geometry) {
      const mesh = obj as THREE.Mesh;
      // If material is an array, take the first element; otherwise, use it directly.
      const mat = mesh.material;
      clonedNodes[key] = {
        geometry: mesh.geometry,
        material: Array.isArray(mat) ? mat[0] : mat || null,
        name: mesh.name,
        matrixWorld: mesh.matrixWorld,
        parent: mesh.parent ? { name: mesh.parent.name, visible: mesh.parent.visible } : undefined,
      };
    }
  });

  return modelStore.is3d ? (
    <Model3D
      id={id}
      nodes={clonedNodes}
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
