// import React, { useRef, useState } from "react";
// import { Canvas } from "@react-three/fiber";
// import { CameraControls, Grid } from "@react-three/drei";
// import { SceneCamera } from "../Models/SceneCamera";
// import { SceneLights } from "../Models/SceneLights";
// import { GroundPlane } from "../Models/GroundPlane";
// import { ModelRenderer } from "../Models/ModelRenderer";
// import { useModels } from "../../hooks/useModels";
// import { performRaycastFromMouse } from "../../utils/PerformRaycastingFromMouse";
// import * as THREE from "three";
// import ModelViewer from "../Models/ModelViewer";

// const Center: React.FC = () => {
//   const canvasRef = useRef<HTMLDivElement>(null);
//   const groundRef = useRef<THREE.Mesh | null>(null);
//   const cameraRef = useRef<THREE.Camera | null>(null);
//   const controlsRef = useRef<CameraControls | null>(null);
//   const [is3D, setIs3D] = useState(false);
//   const { models, addModel, resetCamera } = useModels(cameraRef);

//   const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault();
//     const modelPath = event.dataTransfer.getData("modelPath");
//     if (!modelPath || !cameraRef.current || !groundRef.current) return;

//     const intersections = performRaycastFromMouse(event.nativeEvent, cameraRef.current, [groundRef.current]);
//     const dropPosition = intersections[0]?.point ?? new THREE.Vector3(0, 0, 0);

//     await addModel(modelPath, [dropPosition.x, dropPosition.y, dropPosition.z]).then(() => {
//       if (!cameraRef.current) return;
//       cameraRef.current.position.set(0, 10, 0);
//     });
//   };

//   return (
//     <div ref={canvasRef} className="relative flex-grow bg-gray-200" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
//       <button onClick={() => setIs3D((prev) => !prev)} className="absolute top-4 left-4 bg-white px-4 py-2 shadow-md rounded z-10">
//         {is3D ? "Switch to 2D" : "Switch to 3D"}
//       </button>

//       <Canvas linear={false}>
//         <SceneCamera is3D={is3D} cameraRef={cameraRef} />
//         <CameraControls makeDefault azimuthRotateSpeed={!is3D ? 0 : 2} polarRotateSpeed={!is3D ? 0 : 2} ref={controlsRef} dampingFactor={0} />
//         <SceneLights />
//         <GroundPlane groundRef={groundRef} />
//         {!is3D && <Grid args={[150, 150]} cellColor="gray" sectionColor="gray" />}

//         {models.map((model, index) => (
//           <ModelViewer is3D={is3D} key={index} {...model} />
//         ))}
//       </Canvas>
//     </div>
//   );
// };

// export default Center;
import React, { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { CameraControls, Grid } from "@react-three/drei";
import { SceneCamera } from "../Models/SceneCamera";
import { SceneLights } from "../Models/SceneLights";
import { GroundPlane } from "../Models/GroundPlane";
import { performRaycastFromMouse } from "../../utils/PerformRaycastingFromMouse";
import * as THREE from "three";
import ModelViewer from "../Models/ModelViewer";
import { observer } from "mobx-react-lite";
import modelStore from "../../stores/ModelStore"; // Import MobX store
import ModelManager from "../Models/ModelManager";

const Center: React.FC = observer(() => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const groundRef = useRef<THREE.Mesh | null>(null);
  const cameraRef = useRef<THREE.Camera | null>(null);
  const controlsRef = useRef<CameraControls | null>(null);

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const modelPath = event.dataTransfer.getData("modelPath");
    if (!modelPath || !cameraRef.current || !groundRef.current) return;

    const intersections = performRaycastFromMouse(event.nativeEvent, cameraRef.current, [groundRef.current]);
    const dropPosition = intersections[0]?.point ?? new THREE.Vector3(0, 0, 0);

    modelStore.addModel(modelPath, [dropPosition.x, dropPosition.y, dropPosition.z]); // Use MobX store
    if (cameraRef.current) {
      cameraRef.current.position.set(0, 10, 0);
    }
  };

  return (
    <div ref={canvasRef} className="relative flex-grow bg-gray-200" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
      <button onClick={() => modelStore.toggle3D()} className="absolute top-4 left-4 bg-white px-4 py-2 shadow-md rounded z-10">
        {modelStore.is3d ? "Switch to 2D" : "Switch to 3D"}
      </button>

      <Canvas linear={false}>
        <SceneCamera is3D={modelStore.is3d} cameraRef={cameraRef} />
        <CameraControls makeDefault azimuthRotateSpeed={!modelStore.is3d ? 0 : 2} polarRotateSpeed={!modelStore.is3d ? 0 : 2} ref={controlsRef} dampingFactor={0} />
        <SceneLights />
        <GroundPlane groundRef={groundRef} />
        {!modelStore.is3d && <Grid args={[150, 150]} cellColor="gray" sectionColor="gray" />}

        {/* {modelStore.models.map((model) => (
          <ModelViewer is3D={is3D} key={model.id} {...model} />
        ))} */}
        <ModelManager />
      </Canvas>
    </div>
  );
});

export default Center;
