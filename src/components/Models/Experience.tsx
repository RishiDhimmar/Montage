import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { SceneCamera } from "./SceneCamera";
import modelStore from "../../stores/ModelStore";
import { Grid, OrbitControls } from "@react-three/drei";
import { SceneLights } from "./SceneLights";
import { GroundPlane } from "./GroundPlane";
import ModelManager from "./ModelManager";
import { useThree } from "@react-three/fiber";
import { performRaycastFromMouse } from "../../utils/PerformRaycastingFromMouse";
import * as THREE from "three";

interface ExperienceProps {}

const Experience = forwardRef<any, ExperienceProps>((props, ref) => {
  const { gl, camera } = useThree(); // Safe to use inside Canvas
  const groundRef = useRef<THREE.Mesh | null>(null);
  const [cursorPosition, setCursorPosition] = useState(new THREE.Vector3(0, 0, 0));

  // Expose a drop handler via ref
  useImperativeHandle(ref, () => ({
    handleDrop: (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const modelPath = event.dataTransfer.getData("modelPath");
      if (!modelPath) return;

      // Raycast using the event, camera, and gl from Three.js
      const intersections = performRaycastFromMouse(
        event.nativeEvent,
        camera,
        [groundRef.current!],
        gl
      );
      if (intersections.length > 0) {
        const dropPosition = intersections[0].point;
        modelStore.addModel(modelPath, [dropPosition.x, dropPosition.y, dropPosition.z]);
      }
    },
  }));

  // Update cursor position on pointer move
  const handlePointerMove = (event: React.PointerEvent) => {
    const intersections = performRaycastFromMouse(
      event.nativeEvent,
      camera,
      [groundRef.current!],
      gl
    );
    if (intersections.length > 0) {
      setCursorPosition(intersections[0].point);
    }
  };

  return (
    <group onPointerMove={handlePointerMove}>
      <SceneCamera is3D={modelStore.is3d} />
      {modelStore.is3d ? <OrbitControls /> : <OrbitControls enableRotate={false} />}
      <SceneLights />
      <GroundPlane groundRef={groundRef} />
      {!modelStore.is3d && <Grid args={[150, 150]} cellColor="gray" sectionColor="gray" />}
      <ModelManager />
      {/* Sphere to indicate current cursor position */}
      <mesh position={cursorPosition}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshNormalMaterial />
      </mesh>
    </group>
  );
});

export default Experience;
