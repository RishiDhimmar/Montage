import React, { useRef, useCallback } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import gsap from "gsap";
import modelStore from "../stores/ModelStore";
import { performRaycastFromMouse } from "../utils/PerformRaycastingFromMouse";

interface BoundingBoxSpheresProps {
  corners: THREE.Vector3[] | null;
}

interface DragData {
  initialPointer: THREE.Vector3;
  modelCenter: THREE.Vector3;
  initialRotation: number;
  latestAngleDiff: number;
}

const findNearestAngle = (deg: number): number => {
  const allowed = [0, 90, 180, 270];
  deg = ((deg % 360) + 360) % 360;
  return allowed.reduce((prev, curr) =>
    Math.abs(deg - curr) < Math.abs(deg - prev) ? curr : prev
  );
};


// TODO : Understand this piece of code and fix it
const BoundingBoxSpheres: React.FC<BoundingBoxSpheresProps> = ({ corners }) => {
  if (!corners) return null;

  const { camera, gl } = useThree();
  const dragData = useRef<Record<number, DragData>>({});
  const animating = useRef(false);

  const getModel = useCallback(() => {
    if (modelStore.selectedModelId === null) return null;
    return modelStore.models.find(m => m.id === modelStore.selectedModelId);
  }, []);

  const onDown = useCallback((e: PointerEvent, i: number) => {
    e.stopPropagation();
    (e.target as Element).setPointerCapture(e.pointerId);
    if (animating.current) {
      gsap.killTweensOf("modelRotation");
      animating.current = false;
    }
    const model = getModel();
    if (!model) return;

    const center = new THREE.Vector3(...model.position);
    const hit = performRaycastFromMouse(e, camera, gl);
    if (!hit) return;
    const pointer = hit.clone();

    let rotY = model.rotation?.[1] ?? 0;
    rotY = THREE.MathUtils.euclideanModulo(-rotY, Math.PI * 2);
    dragData.current[i] = { initialPointer: pointer, modelCenter: center, initialRotation: rotY, latestAngleDiff: 0 };
  }, [camera, gl, getModel]);

  const onMove = useCallback((e: PointerEvent, i: number) => {
    e.stopPropagation();
    const model = getModel();
    if (!model) return;
    const data = dragData.current[i];
    if (!data) return;

    const hit = performRaycastFromMouse(e, camera, gl);
    if (!hit) return;
    const pointer = hit.clone();

    const iv = new THREE.Vector2(data.initialPointer.x - data.modelCenter.x, data.initialPointer.z - data.modelCenter.z);
    const cv = new THREE.Vector2(pointer.x - data.modelCenter.x, pointer.z - data.modelCenter.z);
    let diff = cv.angleTo(iv);
    if (iv.x * cv.y - iv.y * cv.x < 0) diff = -diff;
    data.latestAngleDiff = diff;
    const newRot = data.initialRotation + diff;
    modelStore.updateModelRotation(modelStore.selectedModelId!, [0, -newRot, 0]);
  }, [camera, gl, getModel]);

  const onUp = useCallback((e: PointerEvent, i: number) => {
    e.stopPropagation();
    (e.target as Element).releasePointerCapture(e.pointerId);
    const model = getModel();
    if (!model) return;
    const data = dragData.current[i];
    if (!data) return;

    const curRot = data.initialRotation + data.latestAngleDiff;
    const targetDeg = findNearestAngle(THREE.MathUtils.radToDeg(curRot));
    const targetRad = THREE.MathUtils.degToRad(targetDeg);
    let delta = targetRad - curRot;
    if (delta > Math.PI) delta -= Math.PI * 2;
    if (delta < -Math.PI) delta += Math.PI * 2;
    const duration = Math.min(0.5, (Math.abs(delta) / Math.PI) * 0.8);
    const temp = { rot: curRot };

    animating.current = true;
    gsap.to(temp, {
      rot: curRot + delta,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        modelStore.updateModelRotation(modelStore.selectedModelId!, [0, -temp.rot, 0]);
      },
      onComplete: () => {
        modelStore.updateModelRotation(modelStore.selectedModelId!, [0, -targetRad, 0]);
        animating.current = false;
      },
      id: "modelRotation"
    });

    delete dragData.current[i];
  }, [camera, gl, getModel]);

  return (
    <>
      {corners.map((corner, i) => (
        <Html key={i} position={corner} center renderOrder={2}>
          <div
            onPointerDown={(e) => onDown(e as unknown as PointerEvent, i)}
            onPointerMove={(e) => onMove(e as unknown as PointerEvent, i)}
            onPointerUp={(e) => onUp(e as unknown as PointerEvent, i)}
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              background: "white",
              border: "2px solid black",
              pointerEvents: "auto",
              cursor: "pointer"
            }}
          />
        </Html>
      ))}
    </>
  );
};

export default BoundingBoxSpheres;
