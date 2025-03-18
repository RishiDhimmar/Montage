// import React, { forwardRef, useImperativeHandle, useRef } from "react";
// import { SceneCamera } from "./SceneCamera";
// import modelStore from "../../stores/ModelStore";
// import { CameraControls, Grid, OrbitControls } from "@react-three/drei";
// import { SceneLights } from "./SceneLights";
// import ModelManager from "./ModelManager";
// import { useThree } from "@react-three/fiber";
// import { performRaycastFromMouse } from "../../utils/PerformRaycastingFromMouse";

// interface ExperienceProps {}

// const Experience = forwardRef((props, ref) => {
//   const { gl, camera } = useThree();
//   const controlsRef = useRef<any>(null);
//   const experienceRef = useRef<any>(null); 

//   // Forward a ref to expose functions
//   useImperativeHandle(ref, () => ({
//     handleDrop: (event: React.DragEvent<HTMLDivElement>) => {
//       if (modelStore.is3d) return; 

//       const modelPath = event.dataTransfer.getData("modelPath");
//       const image = event.dataTransfer.getData("image");
//       if (!modelPath || !image) return;

//       const intersection = performRaycastFromMouse(
//         event.nativeEvent,
//         camera,
//         gl
//       );
//       if (intersection) {
//         modelStore.addModel(modelPath, 
//           image, [
//           intersection.x,
//           intersection.y + 0.5,
//           intersection.z,
//         ], [0, 0, 0]);
//       }
//     },
//   }));

//   return (
//     <group ref={experienceRef}>
//       {" "}
//       {/* ✅ Ensure group has a valid ref */}

//       <SceneCamera is3D={modelStore.is3d} />
//       <CameraControls
//         makeDefault
//         ref={controlsRef}
//         minZoom={10}
//         maxZoom={300}
//         azimuthRotateSpeed={modelStore.is3d ? 1 : 0}
//         polarRotateSpeed={modelStore.is3d ? 1 : 0}
//       />
//       <SceneLights />
//       {!modelStore.is3d && (
//         <>
//           <Grid args={[150, 150]} cellColor="white" sectionColor="white" onClick={() => {
//             console.log("first")
//           }}/>
//         </>
//       )}
//       <ModelManager />
//     </group>
//   );
// });

// export default Experience;


// import React, { forwardRef, useImperativeHandle, useRef } from "react";
// import { SceneCamera } from "./SceneCamera";
// import modelStore from "../../stores/ModelStore";
// import { CameraControls, Grid } from "@react-three/drei";
// import { SceneLights } from "./SceneLights";
// import ModelManager from "./ModelManager";
// import { useThree } from "@react-three/fiber";
// import { performRaycastFromMouse } from "../../utils/PerformRaycastingFromMouse";

// const Experience = forwardRef((props, ref) => {
//   const { gl, camera } = useThree();
//   const controlsRef = useRef<any>(null);
//   const experienceRef = useRef<any>(null);

//   useImperativeHandle(ref, () => ({
//     handleDrop: (event: React.DragEvent<HTMLDivElement>) => {
//       if (modelStore.is3d) return;

//       const modelPath = event.dataTransfer.getData("modelPath");
//       const image = event.dataTransfer.getData("image");
//       const noOfBathRooms = Number(event.dataTransfer.getData("noOfBathRooms") || "0");
//       const noOfBedRooms = Number(event.dataTransfer.getData("noOfBedRooms") || "0");
//       const size = Number(event.dataTransfer.getData("size") || "1000");
//       const price = Number(event.dataTransfer.getData("price") || "0");
      
//       if (!modelPath || !image) return;

//       const intersection = performRaycastFromMouse(event.nativeEvent, camera, gl);
//       if (intersection) {
//         modelStore.addModel(
//           modelPath,
//           image,
//           [intersection.x, intersection.y + 0.5, intersection.z],
//           [0, 0, 0],
//           noOfBathRooms,
//           noOfBedRooms,
//           size,
//           price
//         );
//       }
//     },
//   }));

//   return (
//     <group ref={experienceRef}>
//       <SceneCamera is3D={modelStore.is3d} />
//       <CameraControls
//         makeDefault
//         ref={controlsRef}
//         minZoom={10}
//         maxZoom={300}
//         azimuthRotateSpeed={modelStore.is3d ? 1 : 0}
//         polarRotateSpeed={modelStore.is3d ? 1 : 0}
//       />
//       <SceneLights />
//       {!modelStore.is3d && <Grid args={[150, 150]} cellColor="white" sectionColor="white" />}
//       <ModelManager />
//     </group>
//   );
// });

// export default Experience;


import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { SceneCamera } from "./SceneCamera";
import modelStore from "../../stores/ModelStore";
import { CameraControls, Grid,  } from "@react-three/drei";
import { SceneLights } from "./SceneLights";
import ModelManager from "./ModelManager";
import { useThree } from "@react-three/fiber";
import { performRaycastFromMouse } from "../../utils/PerformRaycastingFromMouse";

// interface ExperienceProps {}

const Experience = forwardRef((props, ref) => {
  const { gl, camera } = useThree();
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
      const intersection = performRaycastFromMouse(event.nativeEvent, camera, gl);
      if (intersection) {
        // Call addModel with data from the dragged module
        modelStore.addModel(
          draggedModule.model, 
          draggedModule.image,
          draggedModule.name,
          [intersection.x, intersection.y + 0.5, intersection.z],
          [0, 0, 0],
          draggedModule.noOfBathRooms,
          draggedModule.noOfBedRooms,
          draggedModule.size,
          draggedModule.price
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
      <SceneLights />
      {!modelStore.is3d && (
        <>
          <Grid args={[150, 150]} cellColor="white" sectionColor="white" cellSize={10}/>
        </>
      )}
      <ModelManager />
    </group>
  );
});

export default Experience;
