import  { useMemo, useEffect, Suspense } from "react";
import { ContactShadows, useGLTF } from "@react-three/drei";
import * as THREE from "three";
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
