import React from "react";
import * as THREE from "three";
import { performRaycastFromMouse } from "../../utils/PerformRaycastingFromMouse";

interface DropHandlerProps {
  cameraRef: React.RefObject<THREE.Camera>;
  addModel: (modelPath: string, position: [number, number, number],image: string) => Promise<void>;
  gl: THREE.WebGLRenderer;
}

export const DropHandler: React.FC<DropHandlerProps> = ({ cameraRef, addModel, gl }) => {
  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const modelPath = event.dataTransfer.getData("modelPath");
    const image = event.dataTransfer.getData("image");
    if (!modelPath || !cameraRef.current) return;

    // Get the intersection point on the XZ plane (y = 0)
    const dropPosition = performRaycastFromMouse(event.nativeEvent, cameraRef.current, gl) ?? new THREE.Vector3(0, 0, 0);

    await addModel(modelPath, [dropPosition.x, dropPosition.y, dropPosition.z], image);
  };

  return <div className="absolute w-full h-full" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} />;
};

