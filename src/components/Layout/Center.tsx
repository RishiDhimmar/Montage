import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { observer } from "mobx-react-lite";
import modelStore from "../../stores/ModelStore";
import Experience from "../Models/Experience";
import CanvasToolbar from "../Toolbars/CanvasToolbar";
import ModelToolbar from "../Toolbars/ModelToolbar";

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

    // Calculate sidebar widths
    const leftSidebarWidth = isLeftOpen ? 440 : 80;
    const rightSidebarWidth = isRightOpen ? 360 : 0;

    return (
      // Make this container fill the parent
      <div
        ref={canvasRef}
        className="absolute inset-0 bg-gray-200"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {/* <ModelToolbar /> */}
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

        <button
          onClick={() => modelStore.toggle3D()} 
          className="absolute top-4 left-1/2 bg-white px-4 py-2 shadow-md rounded z-10"
        >
          {modelStore.is3d ? "Switch to 2D" : "Switch to 3D"}
        </button>

        <Canvas linear={false} className="w-full h-full" style={{background: modelStore.is3d ? "#eeeeee" : "#ffffff" }} onPointerMissed={() => modelStore.selectModel(null)}>
          <Experience ref={experienceRef} />
        </Canvas>
      </div>
    );
  }
);

export default Center;
