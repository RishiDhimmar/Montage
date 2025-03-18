import { useRef, useCallback } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import modelStore from "../stores/ModelStore";
import { performRaycastFromMouse } from "../utils/PerformRaycastingFromMouse";
import {  animateRotation } from "../utils/AnimateRotation";
import {  findNearestAngle } from "../utils/FindNearestAngle";

interface DragData {
  initialPointer: THREE.Vector3;
  modelCenter: THREE.Vector3;
  initialRotation: number;
  latestAngleDiff: number;
}

// Returns an object with pointer event handlers for rotation drag behavior.
export const createRotationDragHandlers = () => {
  const { camera, gl } = useThree();
  const dragData = useRef<Record<number, DragData>>({});
  const animating = useRef(false);

  const onPointerDown = useCallback((e: PointerEvent, index: number) => {
    e.stopPropagation();
    (e.target as Element).setPointerCapture(e.pointerId);
    if (animating.current) {
      gsap.killTweensOf("modelRotation");
      animating.current = false;
    }
    const model = modelStore.models.find(m => m.id === modelStore.selectedModelId);
    if (!model) return;
    const center = new THREE.Vector3(...model.position);
    const hit = performRaycastFromMouse(e, camera, gl);
    if (!hit) return;
    const pointer = hit.clone();
    const initialRotation = THREE.MathUtils.euclideanModulo(
      -(model.rotation?.[1] ?? 0),
      Math.PI * 2
    );
    dragData.current[index] = { initialPointer: pointer, modelCenter: center, initialRotation, latestAngleDiff: 0 };
  }, [camera, gl]);

  const onPointerMove = useCallback((e: PointerEvent, index: number) => {
    e.stopPropagation();
    const model = modelStore.models.find(m => m.id === modelStore.selectedModelId);
    if (!model) return;
    const data = dragData.current[index];
    if (!data) return;
    const hit = performRaycastFromMouse(e, camera, gl);
    if (!hit) return;
    const pointer = hit.clone();
    const iv = new THREE.Vector2(data.initialPointer.x - data.modelCenter.x, data.initialPointer.z - data.modelCenter.z);
    const cv = new THREE.Vector2(pointer.x - data.modelCenter.x, pointer.z - data.modelCenter.z);
    let diff = cv.angleTo(iv);
    if (iv.x * cv.y - iv.y * cv.x < 0) diff = -diff;
    data.latestAngleDiff = diff;
    modelStore.updateModelRotation(modelStore.selectedModelId!, [0, -(data.initialRotation + diff), 0]);
  }, [camera, gl]);

  const onPointerUp = useCallback((e: PointerEvent, index: number) => {
    e.stopPropagation();
    (e.target as Element).releasePointerCapture(e.pointerId);
    const model = modelStore.models.find(m => m.id === modelStore.selectedModelId);
    if (!model) return;
    const data = dragData.current[index];
    if (!data) return;
    const currentRot = data.initialRotation + data.latestAngleDiff;
    const targetDeg = findNearestAngle(THREE.MathUtils.radToDeg(currentRot));
    const targetRad = THREE.MathUtils.degToRad(targetDeg);
    animating.current = true;
    animateRotation(
      currentRot,
      targetRad,
      (rot) => modelStore.updateModelRotation(modelStore.selectedModelId!, [0, -rot, 0]),
      (finalRot) => {
        modelStore.updateModelRotation(modelStore.selectedModelId!, [0, -finalRot, 0]);
        animating.current = false;
      }
    );
    delete dragData.current[index];
  }, [camera, gl]);

  return { onPointerDown, onPointerMove, onPointerUp };
};
