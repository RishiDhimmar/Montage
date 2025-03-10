import React from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface ModelRendererProps {
  modelPath: string;
  position: [number, number, number];
  onLoad?: () => void;
}

export const ModelRenderer: React.FC<ModelRendererProps> = ({ modelPath, position, onLoad }) => {
  const { scene } = useGLTF(modelPath);

  React.useEffect(() => {
    if (onLoad) onLoad();
  }, [onLoad]);

  return <primitive object={scene} position={position} />;
};
