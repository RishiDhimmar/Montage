import {  useRef, useCallback } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import modelStore from "../stores/ModelStore";
import { performRaycastFromMouse } from "../utils/PerformRaycastingFromMouse";
import { animateRotation } from "../utils/AnimateRotation";
import { findNearestAngle } from "../utils/FindNearestAngle";

// Define the DragData type if not already defined.
interface DragData {
  initialPointer: THREE.Vector3;
  modelCenter: THREE.Vector3;
  initialRotation: number;
  latestAngleDiff: number;
  initialNodePositions: {
    startPoint: THREE.Vector3;
    endPoint: THREE.Vector3;
    axis: string;
    farthestNormalPoint: THREE.Vector3;
    normal: THREE.Vector3;
  }[];
  lastAppliedRotation: number;
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

    const model = modelStore.models.find(
      (m) => m.id === modelStore.selectedModelId
    );
    if (!model) return;

    const center = new THREE.Vector3(...model.position);
    const hit = performRaycastFromMouse(e, camera, gl);
    if (!hit) return;

    const pointer = hit.clone();
    const initialRotation = THREE.MathUtils.euclideanModulo(
      model.rotation?.[1] ?? 0,
      Math.PI * 2
    );

    // Store initial node positions for rotation.
    dragData.current[index] = {
      initialPointer: pointer,
      modelCenter: center,
      initialRotation,
      latestAngleDiff: 0,
      initialNodePositions: model.nodePositions
        ? model.nodePositions.map((pos: any) => ({
            startPoint: pos.startPoint.clone(),
            endPoint: pos.endPoint.clone(),
            axis: pos.axis,
            farthestNormalPoint: pos.farthestNormalPoint.clone(),
            normal: pos.normal.clone(),
          }))
        : [],
      lastAppliedRotation: initialRotation,
    };
  }, [camera, gl]);

  const onPointerMove = useCallback((e: PointerEvent, index: number) => {
    e.stopPropagation();

    const model = modelStore.models.find(
      (m) => m.id === modelStore.selectedModelId
    );
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

    if (
      Math.abs(newRotation - (data.lastAppliedRotation ?? data.initialRotation)) >
      0.001
    ) {
      modelStore.updateModelRotation(modelStore.selectedModelId!, [
        0,
        newRotation,
        0,
      ]);
      data.lastAppliedRotation = newRotation;
    }

    data.latestAngleDiff = diff;
  }, [camera, gl]);

  const onPointerUp = useCallback((e: PointerEvent, index: number) => {
    e.stopPropagation();
    (e.target as Element).releasePointerCapture(e.pointerId);

    const model = modelStore.models.find(
      (m) => m.id === modelStore.selectedModelId
    );
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
        },
        () => {
          // On animation complete, update node positions
          if (
            model.nodePositions &&
            data.initialNodePositions &&
            Math.abs(target_R - R_start_drag) > 0.01
          ) {
            const deltaR_total = target_R - R_start_drag;
            updateNodePositionsForRotation(
              model.id,
              data.modelCenter,
              data.initialNodePositions,
              deltaR_total
            );
          }
          animating.current = false;
        }
      );
    } else {
      // If no animation needed, check if current rotation differs from start
      if (
        Math.abs(start_R - R_start_drag) > 0.01 &&
        model.nodePositions &&
        data.initialNodePositions
      ) {
        const deltaR_total = start_R - R_start_drag;
        updateNodePositionsForRotation(
          model.id,
          data.modelCenter,
          data.initialNodePositions,
          deltaR_total
        );
      }
    }

    delete dragData.current[index];
  }, []);

  const updateNodePositionsForRotation = (
    modelId: number,
    center: THREE.Vector3,
    initialPositions: any[],
    rotationY: number
  ) => {
    const rotationMatrix = new THREE.Matrix4().makeRotationY(rotationY);
    // Normalize the rotation for axis swap decision.
    const normalizedRotationY = THREE.MathUtils.euclideanModulo(
      rotationY,
      Math.PI * 2
    );
    const epsilon = 0.01;
    // Swap axes only if rotation is approximately π/2 or 3π/2.
    const swapAxes =
      Math.abs(normalizedRotationY - Math.PI / 2) < epsilon ||
      Math.abs(normalizedRotationY - (3 * Math.PI) / 2) < epsilon;

    const newNodePositions = initialPositions.map((initialPos) => {
      // Process startPoint.
      const localStartPoint = initialPos.startPoint.clone().sub(center);
      const rotatedStartPoint = localStartPoint.clone().applyMatrix4(rotationMatrix);
      const newStartPoint = rotatedStartPoint.add(center.clone());

      // Process endPoint.
      const localEndPoint = initialPos.endPoint.clone().sub(center);
      const rotatedEndPoint = localEndPoint.clone().applyMatrix4(rotationMatrix);
      const newEndPoint = rotatedEndPoint.add(center.clone());

      // Process normal.
      const rotatedNormal = initialPos.normal.clone().applyMatrix4(rotationMatrix);

      // Process farthestNormalPoint.
      const localFarthestPoint = initialPos.farthestNormalPoint.clone().sub(center);
      const rotatedFarthestPoint = localFarthestPoint.clone().applyMatrix4(rotationMatrix);
      const newFarthestPoint = rotatedFarthestPoint.add(center.clone());

      // Determine new axis—flip only if swapAxes is true.
      const newAxis = swapAxes
        ? (initialPos.axis === "x" ? "z" : "x")
        : initialPos.axis;

      return {
        startPoint: newStartPoint,
        endPoint: newEndPoint,
        axis: newAxis,
        farthestNormalPoint: newFarthestPoint,
        normal: rotatedNormal,
        id: modelId,
      };
    });

    modelStore.setNodePositions(modelId, newNodePositions);
  };

  return { onPointerDown, onPointerMove, onPointerUp };
};
