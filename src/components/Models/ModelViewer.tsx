import  { Suspense } from "react";
import { useGLTF } from "@react-three/drei";
import EdgeModel from "./EdgeModel";
import Model3D from "./Model3D";
import { observer } from "mobx-react-lite";
import modelStore from "../../stores/ModelStore";

interface ModelRendererProps {
  id: number;
  modelPath: string;
  position: [number, number, number];
  onLoad?: () => void;
}

const ModelViewer: React.FC<ModelRendererProps> = observer(
  ({ id, modelPath, position }) => {
    const { nodes, scene } = useGLTF(modelPath);

    return modelStore.is3d ? (
      <>
        <Model3D
          id={id}
          nodes={nodes}
          position={modelStore.getPosition(id)}
          rotation={modelStore.getRotation(id)}
          scene={scene}
          
        />
      </>
    ) : (
      <Suspense fallback={null}>
        <EdgeModel nodes={nodes} position={position} id={id} scene={scene} />
      </Suspense>
    );
  }
);

export default ModelViewer;


// import { Suspense } from "react";
// import { useGLTF } from "@react-three/drei";
// import EdgeModel from "./EdgeModel";
// import Model3D from "./Model3D";
// import { observer } from "mobx-react-lite";
// import modelStore from "../../stores/ModelStore";
// import * as THREE from "three";

// interface ModelRendererProps {
//   id: number;
//   modelPath: string;
//   position: [number, number, number];
//   onLoad?: () => void;
// }

// interface ClonedNode {
//   geometry: THREE.BufferGeometry;
//   material: THREE.Material | null;
//   name: string;
//   matrixWorld: THREE.Matrix4;
//   parent?: { name: string; visible: boolean };
//   extras?: { tag?: string };
// }

// const ModelViewer: React.FC<ModelRendererProps> = observer(({ id, modelPath, position }) => {
//   const { nodes, scene } = useGLTF(modelPath);

//   // Convert nodes into ClonedNode format
//   const clonedNodes: Record<string, ClonedNode> = Object.fromEntries(
//     Object.entries(nodes).map(([key, node]) => {
//       const object3D = node as THREE.Mesh; // Ensure it's a Mesh

//       return [
//         key,
//         {
//           geometry: object3D.geometry,
//           material: Array.isArray(object3D.material) ? object3D.material[0] : object3D.material || null, // Fix for Material[]
//           name: object3D.name,
//           matrixWorld: object3D.matrixWorld,
//           parent: object3D.parent ? { name: object3D.parent.name, visible: object3D.parent.visible } : undefined,
//           extras: object3D.userData ? { tag: object3D.userData.tag } : undefined,
//         },
//       ];
//     })
//   );

//   return modelStore.is3d ? (
//     <Model3D id={id} nodes={clonedNodes} />
//   ) : (
//     <Suspense fallback={null}>
//       <EdgeModel nodes={clonedNodes} position={position} id={String(id)} scene={scene} /> {/* Fix: Convert id to string */}
//     </Suspense>
//   );
// });

// export default ModelViewer;
