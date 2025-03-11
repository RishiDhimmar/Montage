import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { observer } from "mobx-react-lite";
import modelStore from "../../stores/ModelStore";
import Experience from "../Models/Experience";

const Center: React.FC = observer(() => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<{ handleDrop: (event: React.DragEvent<HTMLDivElement>) => void }>(null);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    if (experienceRef.current && experienceRef.current.handleDrop) {
      experienceRef.current.handleDrop(event);
    }
  };

  return (
    <div
      ref={canvasRef}
      className="relative flex-grow bg-gray-200"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <button
        onClick={() => modelStore.toggle3D()}
        className="absolute top-4 left-4 bg-white px-4 py-2 shadow-md rounded z-10"
      >
        {modelStore.is3d ? "Switch to 2D" : "Switch to 3D"}
      </button>

      <Canvas linear={false}>
        <Experience ref={experienceRef} />
      </Canvas>
    </div>
  );
});

export default Center;
