import { useRef } from "react";
import * as THREE from "three";
import modelStore from "../stores/ModelStore";
import { performRaycastFromMouse } from "../utils/PerformRaycastingFromMouse";

export function useModelInteraction({ id, camera, gl }) {
  const dragState = useRef({
    offset: null as THREE.Vector3 | null,
    startPos: null as THREE.Vector2 | null,
    isDragging: false
  });

  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    const target = e.target as Element;
    target.setPointerCapture(e.pointerId);
    dragState.current.isDragging = true;
    
    modelStore.selectModel(id);
    const hit = performRaycastFromMouse(e.nativeEvent, camera, gl);
    if (!hit) return;

    const model = modelStore.getModel(id);
    dragState.current.offset = new THREE.Vector3().subVectors(
      new THREE.Vector3(...model.position), 
      hit
    );
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragState.current.isDragging) return;
    const hit = performRaycastFromMouse(e.nativeEvent, camera, gl);
    if (hit && dragState.current.offset) {
      modelStore.updateModelPosition(id, hit.add(dragState.current.offset).toArray());
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    (e.target as Element).releasePointerCapture(e.pointerId);
    dragState.current = { offset: null, startPos: null, isDragging: false };
  };

  return { handlePointerDown, handlePointerMove, handlePointerUp };
}