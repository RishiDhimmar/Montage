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
  const { gl, camera } = useThree();
  const controlsRef = useRef<any>(null);
  const experienceRef = useRef<any>(null); 

  // Forward a ref to expose functions
  useImperativeHandle(ref, () => ({
    handleDrop: (event: React.DragEvent<HTMLDivElement>) => {
      if (modelStore.is3d) return; 

      const modelPath = event.dataTransfer.getData("modelPath");
      const image = event.dataTransfer.getData("image");
      if (!modelPath || !image) return;

      const intersection = performRaycastFromMouse(event.nativeEvent, camera, gl);
      if (intersection) {
        modelStore.addModel(modelPath, 
          image, [
          intersection.x,
          intersection.y,
          intersection.z,
        ], [0, 0, 0]);
      }
    },
  }));

  return (
    <group ref={experienceRef}> 
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
