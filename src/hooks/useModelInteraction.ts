import { useCallback, useRef, useState } from "react";
import * as THREE from "three";
import modelStore from "../stores/ModelStore";
import { performRaycastFromMouse } from "../utils/PerformRaycastingFromMouse";

interface UseModelInteractionProps {
  id: number;
  camera: THREE.Camera;
  gl: THREE.WebGLRenderer;
}

export function useModelInteraction({ id, camera, gl }: UseModelInteractionProps) {
  const [isDragging, setIsDragging] = useState(false);
  const offsetRef = useRef<THREE.Vector3 | null>(null);
  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const hasMovedRef = useRef(false);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.stopPropagation();
    const { clientX, clientY, pointerId, nativeEvent } = e;
    (e.target as Element).setPointerCapture(pointerId);
    setIsDragging(true);
    hasMovedRef.current = false;
    startPosRef.current = { x: clientX, y: clientY };

    // Immediately select the model.
    modelStore.selectModel(id);

    const hit = performRaycastFromMouse(nativeEvent, camera, gl);
    if (hit) {
      const model = modelStore.models.find((m) => m.id === id);
      if (model) {
        const [mx, my, mz] = model.position;
        offsetRef.current = new THREE.Vector3(hit.x - mx, hit.y - my, hit.z - mz);
      }
    }
  }, [camera, gl, id]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    e.stopPropagation();
    if (!isDragging) return;
    const { clientX, clientY, nativeEvent } = e;
    if (startPosRef.current) {
      const dx = clientX - startPosRef.current.x;
      const dy = clientY - startPosRef.current.y;
      if (Math.sqrt(dx * dx + dy * dy) > 5) hasMovedRef.current = true;
    }
    const hit = performRaycastFromMouse(nativeEvent, camera, gl);
    if (hit && offsetRef.current) {
      const newPos = new THREE.Vector3(hit.x - offsetRef.current.x, 0, hit.z - offsetRef.current.z);
      modelStore.updateModelPosition(id, [newPos.x, newPos.y + 0.5, newPos.z]);
    }
  }, [isDragging, id, camera, gl]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    e.stopPropagation();
    (e.target as Element).releasePointerCapture(e.pointerId);
    if (!isDragging) return;
    setIsDragging(false);
    offsetRef.current = null;
    startPosRef.current = null;
    // If a drag occurred, re-select the model.
    if (hasMovedRef.current) modelStore.selectModel(id);
  }, [isDragging, id]);

  return { handlePointerDown, handlePointerMove, handlePointerUp, isDragging };
}
