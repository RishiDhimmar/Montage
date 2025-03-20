import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { SceneCamera } from "./SceneCamera";
import modelStore from "../../stores/ModelStore";
import dragStore from "../../stores/DragStore";
import { CameraControls, Grid,  } from "@react-three/drei";
import ModelManager from "./ModelManager";
import { useThree } from "@react-three/fiber";
import { performRaycastFromMouse } from "../../utils/PerformRaycastingFromMouse";
import ScreenshotButton from "./ScreenshotButton";
import SceneLights2D from "./SceneLights2D";
import * as THREE from "three";
import SceneLights3D from "./SceneLights3D";

const Experience = forwardRef((props, ref) => {
  const { gl, camera } = useThree();
  gl.shadowMap = THREE.PCFSoftShadowMap;
  const controlsRef = useRef<any>(null);
  const experienceRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    handleDrop: (event: React.DragEvent<HTMLDivElement>) => {
      if (modelStore.is3d) return;

      event.preventDefault();
      // Instead of reading from dataTransfer, retrieve the module data from dragStore
      const draggedModule = dragStore.currentModule;
      if (!draggedModule) return;

      // Use raycasting to determine drop position
      const intersection = performRaycastFromMouse(
        event.nativeEvent,
        camera,
        gl
      );
      if (intersection) {

        modelStore.addModel(
          draggedModule.model,
          draggedModule.image,
          draggedModule.name,
          [intersection.x, 0, intersection.z],
          [0, 0, 0],
          [],
          draggedModule.noOfBathRooms,
          draggedModule.noOfBedRooms,
          draggedModule.size,
          draggedModule.price,
          draggedModule.id,
        );
      }
      // Clear the drag store
      dragStore.clearCurrentModule();
    },
  }));

  return (
    <group ref={experienceRef}>
      <SceneCamera is3D={modelStore.is3d} />
      <CameraControls
        makeDefault
        ref={controlsRef}
        minZoom={10}
        maxZoom={300}
        azimuthRotateSpeed={modelStore.is3d ? 1 : 0}
        polarRotateSpeed={modelStore.is3d ? 1 : 0}
      />
      {modelStore.is3d !== true ? <SceneLights2D /> : <SceneLights3D />}
      {!modelStore.is3d ? (
        <Grid args={[150, 150]} cellColor="white" sectionColor="white" />
      ) : <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[150, 150]} /><meshStandardMaterial /></mesh>}

      <ModelManager />
      {/* <Html position={[0,0,0]}>
        <ScreenshotButton />
      </Html> */}
    </group>
  );
});

export default Experience;
