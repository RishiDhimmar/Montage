// import { Canvas } from '@react-three/fiber'
// import { Grid, OrbitControls } from '@react-three/drei';
// import React from 'react'


// function Center() {
//   return (
//     <div className='flex-grow '>
//       <Canvas>
//         <OrbitControls />
//       <Grid args={[15, 15]} cellColor="gray" sectionColor="gray"  />
//       </Canvas>
//     </div>
//   )
// }

// export default Center

// import React, { useRef, useState } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, useGLTF, Grid } from "@react-three/drei";
// import { observer } from "mobx-react-lite";
// import modelStore from "../stores/ModelStore";

// const ModelRenderer: React.FC<{ modelPath: string }> = ({ modelPath }) => {
//   const { scene } = useGLTF(modelPath);
//   return <primitive object={scene} />;
// };

// const Center: React.FC = observer(() => {
//   const canvasRef = useRef<HTMLDivElement>(null);
//   const [is3D, setIs3D] = useState(false); // Toggle State

//   // Handle Drag & Drop
//   const handleDrop = (event: React.DragEvent) => {
//     event.preventDefault();
//     const modelPath = event.dataTransfer.getData("modelPath");
//     if (modelPath) {
//       modelStore.setDraggedModel(modelPath);
//     }
//   };

//   const handleDragOver = (event: React.DragEvent) => {
//     event.preventDefault();
//     event.dataTransfer.dropEffect = "copy";
//   };

//   return (
//     <div
//       ref={canvasRef}
//       className="relative flex-grow bg-gray-200"
//       onDragOver={handleDragOver}
//       onDrop={handleDrop}
//     >
//       {/* Toggle Button */}
//       <button
//         onClick={() => setIs3D(!is3D)}
//         className="absolute top-4 left-4 bg-white px-4 py-2 shadow-md rounded"
//       >
//         {is3D ? "Switch to 2D" : "Switch to 3D"}
//       </button>

//       <Canvas
//         orthographic={!is3D} // ✅ Orthographic for 2D, Perspective for 3D
//         camera={{
//           position: is3D ? [5, 5, 5] : [0, 10, 0], // ✅ Adjust camera positions
//           zoom: is3D ? 1 : 50, // ✅ Zoom in 2D mode
//         }}
//       >
//         <ambientLight intensity={0.5} />
//         <directionalLight position={[2, 2, 2]} />

//         {/* Grid: Visible in 2D, Hidden in 3D */}
//         {!is3D && <Grid args={[15, 15]} cellColor="gray" sectionColor="gray" />}

//         {/* Render Dragged Model */}
//         {modelStore.draggedModel && <ModelRenderer modelPath={modelStore.draggedModel} />}

//         {/* Orbit Controls: Disabled in 2D, Enabled in 3D */}
//         {is3D && <OrbitControls />}
//       </Canvas>
//     </div>
//   );
// });

// export default Center;


import React, { useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, Grid, Edges } from "@react-three/drei";
import { observer } from "mobx-react-lite";
import * as THREE from "three";

const ModelRenderer: React.FC<{ modelPath: string; position: [number, number, number] }> = ({ modelPath, position }) => {
  const { scene } = useGLTF(modelPath);
  return (
    <primitive object={scene} position={position}>
      <Edges color="black" />
    </primitive>
  );
};

// ✅ Component to Manage Camera Reset
const CameraController = ({ is3D }: { is3D: boolean }) => {
  const { camera } = useThree();

  React.useEffect(() => {
    if (is3D) {
      camera.position.set(5, 5, 5);
      camera.lookAt(0, 0, 0);
    } else {
      camera.position.set(0, 10, 0);
      camera.rotation.set(-Math.PI / 2, 0, 0);
      camera.zoom = 50;
    }
    camera.updateProjectionMatrix();
  }, [is3D, camera]);

  return null;
};

// ✅ Drop Handling Inside Canvas
const DropHandler: React.FC<{ addModel: (path: string, position: [number, number, number]) => void }> = ({ addModel }) => {
  const { camera, scene } = useThree();
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  const handlePointerDown = (event: any) => {
    if (event.type === "drop") {
      event.preventDefault();
      const modelPath = event.dataTransfer.getData("modelPath");

      if (modelPath) {
        // Convert screen position to Three.js world position
        const rect = event.currentTarget.getBoundingClientRect();
        pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObjects(scene.children, true);

        let dropPosition: [number, number, number] = [0, 0, 0];

        if (intersects.length > 0) {
          dropPosition = [intersects[0].point.x, intersects[0].point.y, intersects[0].point.z];
        }

        addModel(modelPath, dropPosition);
      }
    }
  };

  return <group onPointerDown={(e) => e.stopPropagation()} onPointerUp={(e) => e.stopPropagation()} />;
};

const Center: React.FC = observer(() => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [is3D, setIs3D] = useState(false);
  const [models, setModels] = useState<{ modelPath: string; position: [number, number, number] }[]>([]);

  // ✅ Store Models with Positions
  const addModel = (modelPath: string, position: [number, number, number]) => {
    setModels((prev) => [...prev, { modelPath, position }]);
  };

  // ✅ Ensure `onDrop` and `onDragOver` exist on the wrapping `<div>`
  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const modelPath = event.dataTransfer.getData("modelPath");

    if (modelPath) {
      const dropPosition: [number, number, number] = [0, 0, 0]; // Default position
      addModel(modelPath, dropPosition);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  };

  return (
    <div ref={canvasRef} className="relative flex-grow bg-gray-200" onDrop={handleDrop} onDragOver={handleDragOver}>
      {/* ✅ Toggle Button */}
      <button
        onClick={() => setIs3D((prev) => !prev)}
        className="absolute top-4 left-4 bg-white px-4 py-2 shadow-md rounded z-10"
      >
        {is3D ? "Switch to 2D" : "Switch to 3D"}
      </button>

      <Canvas orthographic={!is3D} camera={{ position: [0, 10, 0], zoom: 50 }}>
        <CameraController is3D={is3D} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} />

        {/* ✅ Show Grid in 2D, Hide in 3D */}
        {!is3D && <Grid args={[50, 50]} cellColor="gray" sectionColor="gray" />}

        {/* ✅ Handle Drops Inside Canvas */}
        <DropHandler addModel={addModel} />

        {/* ✅ Render All Dropped Models at Correct Positions */}
        {models.map(({ modelPath, position }, index) => (
          <ModelRenderer key={index} modelPath={modelPath} position={position} />
        ))}

        {is3D && <OrbitControls />}
      </Canvas>
    </div>
  );
});

export default Center;
