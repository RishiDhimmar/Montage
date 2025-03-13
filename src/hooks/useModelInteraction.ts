import { useCallback, useRef, useState } from "react";
import * as THREE from "three";
import modelStore from "../stores/ModelStore";
import { performRaycastFromMouse } from "../utils/PerformRaycastingFromMouse";

interface UseModelInteractionProps {
  id: number;
  camera: THREE.Camera;
  gl: THREE.WebGLRenderer;
}

export function useModelInteraction({
  id,
  camera,
  gl,
}: UseModelInteractionProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.stopPropagation();
    (e.target as Element).setPointerCapture(e.pointerId);
    setIsDragging(true);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    e.stopPropagation();
    if (isDragging) {
      const intersection = performRaycastFromMouse(e.nativeEvent, camera, gl);
      if (intersection) {
        modelStore.updateModelPosition(id, [intersection.x, 0, intersection.z]);
      }
    }
  }, [isDragging, id, camera, gl]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    e.stopPropagation();
    (e.target as Element).releasePointerCapture(e.pointerId);
    if (isDragging) {
      setIsDragging(false);
    }
  }, [isDragging]);

  return { handlePointerDown, handlePointerMove, handlePointerUp, isDragging };
}
