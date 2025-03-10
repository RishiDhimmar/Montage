import React, { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrthographicCamera, CameraControls, Grid } from "@react-three/drei";
import { ModelRenderer } from "../Models/ModelRenderer";
import { performRaycastFromMouse } from "../../utils/PerformRaycastingFromMouse";
import * as THREE from "three";

interface ModelProps {
  modelPath: string;
  position: [number, number, number];
}

const Center: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const groundRef = useRef<THREE.Mesh | null>(null);
  const cameraRef = useRef<THREE.Camera | null>(null);
  const controlsRef = useRef<CameraControls | null>(null);
  let dropLocation = new THREE.Vector3(0, 0, 0);

  const [is3D, setIs3D] = useState(false);
  const [models, setModels] = useState<ModelProps[]>([]);

  const addModel = (modelPath: string, position: [number, number, number]) => {
    setModels((prev) => [...prev, { modelPath, position }]);
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const modelPath = event.dataTransfer.getData("modelPath");
    if (!modelPath || !cameraRef.current || !groundRef.current || !controlsRef.current) return;

    // Store camera position and rotation
    const intersections = performRaycastFromMouse(event.nativeEvent, cameraRef.current, [groundRef.current]);
    dropLocation = intersections[0]?.point ?? new THREE.Vector3(0, 0, 0);    
    addModel(modelPath, [dropLocation.x, dropLocation.y, dropLocation.z]);

    // Reapply camera position and rotation

    
  };

  const resetCamera = (point : THREE.Vector3) => {
    if (cameraRef.current) {
      console.log(point)
      cameraRef.current.position.set(point.x, 10, point.z);
    }
  };

  return (
    <div ref={canvasRef} className="relative flex-grow bg-gray-200" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
      <button onClick={() => setIs3D((prev) => !prev)} className="absolute top-4 left-4 bg-white px-4 py-2 shadow-md rounded z-10">
        {is3D ? "Switch to 2D" : "Switch to 3D"}
      </button>

      <Canvas>
        {is3D ? (
          <PerspectiveCamera makeDefault position={[5, 5, 5]} ref={cameraRef as React.MutableRefObject<THREE.PerspectiveCamera>} />
        ) : (
          <OrthographicCamera makeDefault position={[0, 2, 0]} zoom={50} ref={cameraRef as React.MutableRefObject<THREE.OrthographicCamera>} />
        )}

        <CameraControls makeDefault azimuthRotateSpeed={!is3D ? 0 : 2} polarRotateSpeed={!is3D ? 0 : 2} ref={controlsRef} dampingFactor={0} />

        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} />

        <mesh rotation={[-Math.PI / 2, 0, 0]} ref={groundRef} position={[0, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <meshBasicMaterial visible={false} />
        </mesh>

        {!is3D && <Grid args={[50, 50]} cellColor="gray" sectionColor="gray" />}

        {models.map((model, index) => (
          <ModelRenderer key={index} {...model} onLoad={() => resetCamera(dropLocation)} />
        ))}
      </Canvas>
    </div>
  );
};

export default Center;
