import React from "react";
import * as THREE from "three";
import { performRaycastFromMouse } from "../../utils/PerformRaycastingFromMouse";

interface DropHandlerProps {
  cameraRef: React.RefObject<THREE.Camera>;
  groundRef: React.RefObject<THREE.Mesh>;
  addModel: (modelPath: string, position: [number, number, number]) => Promise<void>;
}

export const DropHandler: React.FC<DropHandlerProps> = ({ cameraRef, groundRef, addModel }) => {
  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const modelPath = event.dataTransfer.getData("modelPath");
    if (!modelPath || !cameraRef.current || !groundRef.current) return;

    const intersections = performRaycastFromMouse(event.nativeEvent, cameraRef.current, [groundRef.current]);
    const dropPosition = intersections[0]?.point ?? new THREE.Vector3(0, 0, 0);

    await addModel(modelPath, [dropPosition.x, dropPosition.y, dropPosition.z]).then(() => {
      if (!cameraRef.current) return;
      cameraRef.current.position.set(0, 10, 0);
    });
  };

  return <div className="absolute w-full h-full" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} />;
};
