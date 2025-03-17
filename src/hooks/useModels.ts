import { useState } from "react";
import * as THREE from "three";

export interface ModelProps {
  modelPath: string;
  image: string;
  position: [number, number, number];
}

export const useModels = (cameraRef: React.RefObject<THREE.Camera>) => {
  const [models, setModels] = useState<ModelProps[]>([]);
  const [lastDropPosition, setLastDropPosition] = useState(new THREE.Vector3(0, 0, 0));
  const addModel = (modelPath: string, image: string, position: [number, number, number]): Promise<void> => {
    return new Promise((resolve) => {
      setModels((prev) => [...prev, { modelPath, image, position }]);
      setLastDropPosition(new THREE.Vector3(...position));
      resolve();
    });
  };

  return { models, addModel };
};
