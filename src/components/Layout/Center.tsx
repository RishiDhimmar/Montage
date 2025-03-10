import React, { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrthographicCamera, CameraControls, Grid } from "@react-three/drei";
import { ModelRenderer } from "../Models/ModelRenderer";
import { performRaycastFromMouse } from "../../utils/PerformRaycastingFromMouse";
import { PlaneGeometry } from "three";

interface ModelProps {
  modelPath: string;
  position: [number, number, number];
}

const Center: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [is3D, setIs3D] = useState(false);
  const groundRef = useRef()
  const [models, setModels] = useState<ModelProps[]>([]);

  const addModel = (modelPath: string, position: [number, number, number]) =>
    setModels((prev) => [...prev, { modelPath, position }]);

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const modelPath = event.dataTransfer.getData("modelPath");
    if (!modelPath) return;

    console.log(performRaycastFromMouse(event, canvasRef.current, [groundRef.current]));

    addModel(modelPath, [0, 0, 0]); // Default drop position
  };

  return (
    <div ref={canvasRef} className="relative flex-grow bg-gray-200" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
      <button onClick={() => setIs3D((prev) => !prev)} className="absolute top-4 left-4 bg-white px-4 py-2 shadow-md rounded z-10">
        {is3D ? "Switch to 2D" : "Switch to 3D"}
      </button>

      <Canvas>
        {is3D ? (
          <PerspectiveCamera makeDefault position={[5, 5, 5]} />
        ) : (
          <OrthographicCamera makeDefault position={[0, 10, 0]} zoom={50} />
        )}

        {/* ✅ Disable Rotation */}
        <CameraControls azimuthRotateSpeed={!is3D ? 0 : 1} polarRotateSpeed={!is3D ? 0 : 1} />

        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} />

        <><mesh rotation={[-Math.PI / 2, 0, 0]} ref={groundRef}><planeGeometry args={[50, 50]} /></mesh></>

        {is3D == false ? <Grid args={[50, 50]} cellColor="gray" sectionColor="gray" /> : null }
        {models.map((model, index) => <ModelRenderer key={index} {...model} />)}
      </Canvas>
    </div>
  );
};

export default Center;
