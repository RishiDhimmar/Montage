import React, { useMemo, useEffect, Suspense } from "react";
import { useGLTF } from "@react-three/drei";
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
  ({ id,  modelPath, position, onLoad }) => {
    const { nodes, scene } = useGLTF(modelPath);

    // Deep clone nodes for EdgeModel mode
    const clonedNodes = useMemo(() => {
      const cloned: Record<string, THREE.Object3D> = {};
      for (const key in nodes) {
        const node = nodes[key] as THREE.Object3D;
        const nodeClone = node.clone();
        if ((node as THREE.Mesh).material) {
          nodeClone.material = (node as THREE.Mesh).material.clone();
        }
        if ((node as THREE.Mesh).geometry) {
          nodeClone.geometry = (node as THREE.Mesh).geometry.clone();
        }
        cloned[key] = nodeClone;
      }
      return cloned;
    }, [nodes]);

    useEffect(() => {
      if (onLoad) onLoad();
    }, [onLoad]);

    return modelStore.is3d ? (
      <Model3D id={id} nodes={nodes} position={modelStore.getPosition(id)} rotation={modelStore.getRotation(id)} scene={scene} />
    ) : (
      <Suspense fallback={null}>
        <EdgeModel  nodes={clonedNodes} position={position} id={id}  />
      </Suspense>
    );
  }
);

export default ModelViewer;
