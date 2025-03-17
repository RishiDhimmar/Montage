import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { SceneCamera } from "./SceneCamera";
import modelStore from "../../stores/ModelStore";
import { CameraControls, Grid } from "@react-three/drei";
import { SceneLights } from "./SceneLights";
import ModelManager from "./ModelManager";
import { useThree } from "@react-three/fiber";
import { performRaycastFromMouse } from "../../utils/PerformRaycastingFromMouse";

interface ExperienceProps {}

const Experience = forwardRef((props, ref) => {
  const { gl, camera } = useThree(); // Three.js renderer and camera
  const controlsRef = useRef<any>(null);
  const experienceRef = useRef<any>(null); // ✅ Create a valid React ref

  // Forward a ref to expose functions
  useImperativeHandle(ref, () => ({
    handleDrop: (event: React.DragEvent<HTMLDivElement>) => {
      if (modelStore.is3d) return; // ✅ Disable drop in 3D mode

      const modelPath = event.dataTransfer.getData("modelPath");
      if (!modelPath) return;

      const intersection = performRaycastFromMouse(event.nativeEvent, camera, gl);
      if (intersection) {
        modelStore.addModel(modelPath, [
          intersection.x,
          intersection.y,
          intersection.z,
        ]);
      }
    },
  }));

  return (
    <group ref={experienceRef}> {/* ✅ Ensure group has a valid ref */}
      <SceneCamera is3D={modelStore.is3d} />
      <CameraControls
        makeDefault
        ref={controlsRef}
        minZoom={10}
        azimuthRotateSpeed={modelStore.is3d ? 1 : 0}
        polarRotateSpeed={modelStore.is3d ? 1 : 0}
      />
      <SceneLights />
      {!modelStore.is3d && (
        <Grid args={[150, 150]} cellColor="white" sectionColor="white" />
      )}
      <ModelManager />
    </group>
  );
});

export default Experience;
