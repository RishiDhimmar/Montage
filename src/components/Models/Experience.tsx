import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
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

  // Expose a drop handler via ref
  useImperativeHandle(ref, () => ({
    handleDrop: (event: React.DragEvent<HTMLDivElement>) => {
      //   event.preventDefault();
      const modelPath = event.dataTransfer.getData("modelPath");
      if (!modelPath) return;

      // Raycast using the event, camera, and gl from Three.js
      const intersection = performRaycastFromMouse(
        event.nativeEvent,
        camera,
        gl
      );
      if (intersection) {
        const dropPosition = intersection;
        modelStore.addModel(modelPath, [
          dropPosition.x,
          dropPosition.y,
          dropPosition.z,
        ]);
      }
    },
  }));

  return (
    <group>
      <SceneCamera is3D={modelStore.is3d} cameraRef={camera} />
      <OrbitControls enableRotate={modelStore.is3d} makeDefault />
      <SceneLights />
      <GroundPlane groundRef={groundRef} />
      {!modelStore.is3d && (<Grid args={[150, 150]}  cellColor="white" sectionColor="white" /> )}
      <ModelManager />
    </group>
  );
});

export default Experience;
