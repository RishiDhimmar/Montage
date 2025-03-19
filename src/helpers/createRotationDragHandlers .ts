import { useRef, useCallback } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import modelStore from "../stores/ModelStore";
import { performRaycastFromMouse } from "../utils/PerformRaycastingFromMouse";
import { animateRotation } from "../utils/AnimateRotation";
import { findNearestAngle } from "../utils/FindNearestAngle";

interface DragData {
  initialPointer: THREE.Vector3;
  modelCenter: THREE.Vector3;
  initialRotation: number;
  latestAngleDiff: number;
  initialNodePositions?: THREE.Vector3[];
  lastAppliedRotation?: number;
}

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
      model.rotation?.[1] ?? 0,
      Math.PI * 2
    );

    dragData.current[index] = { 
      initialPointer: pointer, 
      modelCenter: center, 
      initialRotation, 
      latestAngleDiff: 0,
      initialNodePositions: model.nodePositions?.map(pos => 
        new THREE.Vector3().fromArray(Array.isArray(pos) ? pos : [pos.x, pos.y, pos.z])
      ),
      lastAppliedRotation: initialRotation
    };
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
    const iv = new THREE.Vector2(
      data.initialPointer.x - data.modelCenter.x,
      data.initialPointer.z - data.modelCenter.z
    );
    const cv = new THREE.Vector2(
      pointer.x - data.modelCenter.x,
      pointer.z - data.modelCenter.z
    );

    let diff = cv.angleTo(iv);
    if (iv.x * cv.y - iv.y * cv.x < 0) diff = -diff;

    const newRotation = data.initialRotation - diff;

    if (Math.abs(newRotation - (data.lastAppliedRotation ?? data.initialRotation)) > 0.001) {
      modelStore.updateModelRotation(modelStore.selectedModelId!, [0, newRotation, 0]);
      // Removed node position update here
      data.lastAppliedRotation = newRotation;
    }

    data.latestAngleDiff = diff;
  }, [camera, gl]);

  const onPointerUp = useCallback((e: PointerEvent, index: number) => {
    e.stopPropagation();
    (e.target as Element).releasePointerCapture(e.pointerId);

    const model = modelStore.models.find(m => m.id === modelStore.selectedModelId);
    if (!model) return;

    const data = dragData.current[index];
    if (!data) return;

    const start_R = model.rotation[1]; // Current rotation at end of drag
    const currentDeg = THREE.MathUtils.radToDeg(start_R);
    const targetDeg = findNearestAngle(currentDeg);
    const target_R = THREE.MathUtils.degToRad(targetDeg);
    const R_start_drag = data.initialRotation; // Rotation at start of drag

    if (Math.abs(start_R - target_R) > 0.01) {
      animating.current = true;
      animateRotation(
        start_R,
        target_R,
        (animated_R) => {
          modelStore.updateModelRotation(modelStore.selectedModelId!, [0, animated_R, 0]);
          // No node update during animation
        },
        () => {
          // On animation complete, check if rotation was successful
          if (model.nodePositions && data.initialNodePositions && Math.abs(target_R - R_start_drag) > 0.01) {
            const deltaR_total = target_R - R_start_drag;
            updateNodePositionsForRotation(
              model.id,
              data.modelCenter,
              data.initialNodePositions,
              deltaR_total
            );
            // Update initialNodePositions only on successful rotation
            data.initialNodePositions = model.nodePositions.map(pos => 
              new THREE.Vector3().fromArray(Array.isArray(pos) ? pos : [pos.x, pos.y, pos.z])
            );
          }
          animating.current = false;
        }
      );
    } else {
      // If no animation needed, check if current rotation differs from start
      if (Math.abs(start_R - R_start_drag) > 0.01 && model.nodePositions && data.initialNodePositions) {
        const deltaR_total = start_R - R_start_drag;
        updateNodePositionsForRotation(
          model.id,
          data.modelCenter,
          data.initialNodePositions,
          deltaR_total
        );
        data.initialNodePositions = model.nodePositions.map(pos => 
          new THREE.Vector3().fromArray(Array.isArray(pos) ? pos : [pos.x, pos.y, pos.z])
        );
      }
    }

    delete dragData.current[index];
  }, []);

  const updateNodePositionsForRotation = (
    modelId: string | number,
    center: THREE.Vector3,
    initialPositions: THREE.Vector3[],
    rotationY: number
  ) => {
    const rotationMatrix = new THREE.Matrix4().makeRotationY(rotationY);

    const newNodePositions = initialPositions.map(initialPos => {
      const localPos = initialPos.clone().sub(center);
      const rotatedPos = localPos.clone().applyMatrix4(rotationMatrix);
      return rotatedPos.add(center);
    });

    modelStore.setNodePositions(modelId, newNodePositions);
  };

  return { onPointerDown, onPointerMove, onPointerUp };
};