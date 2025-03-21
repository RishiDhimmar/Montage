import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { observer } from "mobx-react-lite";
import modelStore from "../../stores/ModelStore";
import Experience from "../Models/Experience";
import CanvasToolbar from "../Toolbars/CanvasToolbar";
import * as THREE from "three";

interface CenterProps {
  onToggleLeft: () => void;
  onToggleRight: () => void;
  isLeftOpen: boolean;
  isRightOpen: boolean;
}

const Center: React.FC<CenterProps> = observer(
  ({ onToggleLeft, onToggleRight, isLeftOpen, isRightOpen }) => {
    const canvasRef = useRef<HTMLDivElement>(null);
    const experienceRef = useRef<{
      handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
    }>(null);

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
      if (experienceRef.current?.handleDrop) {
        experienceRef.current.handleDrop(event);
      }
    };

    const leftSidebarWidth = isLeftOpen ? 440 : 80;
    const rightSidebarWidth = isRightOpen ? 360 : 0;

    return (
      <div
        ref={canvasRef}
        className="absolute inset-0 bg-gray-200"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="bg-white">
          <CanvasToolbar />
        </div>

        <button
          onClick={onToggleLeft}
          className="absolute bottom-4 hover:bg-gray-200 px-4 py-2 rounded z-10"
          style={{ left: `${leftSidebarWidth + 20}px` }}
        >
          <img
            src={isLeftOpen ? "/left-close.svg" : "/left-open.svg"}
            alt="Toggle left sidebar"
            className="w-6 h-6"
          />
        </button>

        <button
          onClick={onToggleRight}
          className="absolute bottom-4 hover:bg-gray-200 px-4 py-2 rounded z-10"
          style={{ right: `${rightSidebarWidth + 20}px` }}
        >
          <img
            src={isRightOpen ? "/left-open.svg" : "/left-close.svg"}
            alt="Toggle right sidebar"
            className="w-6 h-6"
          />
        </button>

        <Canvas
          shadows
          gl={{ antialias: true, preserveDrawingBuffer: true }}
          linear={false}
          className="w-full h-full"
          style={{ background: modelStore.is3d ? "#eeeeee" : "#ffffff" }}
          onPointerMissed={() => modelStore.selectModel(null)}
          onCreated={({ gl }) => {
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = THREE.PCFSoftShadowMap; // Set for smoother shadows
          }}
        >
          <Experience ref={experienceRef} />
        </Canvas>
      </div>
    );
  }
);

export default Center;
