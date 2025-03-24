import  { useRef, useImperativeHandle, forwardRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
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

const Center = observer(
  forwardRef(({ onToggleLeft, onToggleRight, isLeftOpen, isRightOpen }: CenterProps, ref) => {
    const experienceRef = useRef<{
      handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
    }>(null);

    // Capture function inside the Canvas
    const captureCanvas = () => {
      const canvas = document.querySelector("canvas"); // Get the Three.js canvas
      if (!canvas) return null;

      return new Promise<File | null>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "canvas_screenshot.png", { type: "image/png" });
            resolve(file);
          } else {
            resolve(null);
          }
        });
      });
    };

    useImperativeHandle(ref, () => ({
      captureCanvas,
    }));

    return (
      <div className="absolute inset-0 bg-gray-200" onDrop={(e) => experienceRef.current?.handleDrop(e)} onDragOver={(e) => e.preventDefault()}>
        <div className="bg-white">
          <CanvasToolbar />
        </div>

        <button
          onClick={onToggleLeft}
          className="absolute bottom-4 hover:bg-gray-200 px-4 py-2 rounded z-10"
          style={{ left: `${isLeftOpen ? 440 : 80}px` }}
        >
          <img src={isLeftOpen ? "/left-close.svg" : "/left-open.svg"} alt="Toggle left sidebar" className="w-6 h-6" />
        </button>

        <button
          onClick={onToggleRight}
          className="absolute bottom-4 hover:bg-gray-200 px-4 py-2 rounded z-10"
          style={{ right: `${isRightOpen ? 360 : 0}px` }}
        >
          <img src={isRightOpen ? "/left-open.svg" : "/left-close.svg"} alt="Toggle right sidebar" className="w-6 h-6" />
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
  })
);

export default Center;
