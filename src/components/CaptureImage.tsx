import { useThree } from "@react-three/fiber";
import { useRef } from "react";

export const useCanvasCapture = () => {
  const { gl } = useThree(); // Get Three.js renderer
  const captureRef = useRef(() => {});

  captureRef.current = () => {
    // Convert canvas to image URL
    const dataURL = gl.domElement.toDataURL("image/png");

    // Convert Base64 to Blob
    const byteString = atob(dataURL.split(",")[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const intArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([arrayBuffer], { type: "image/png" });

    // Convert Blob to File
    return new File([blob], "canvas_screenshot.png", { type: "image/png" });
  };

  return captureRef;
};
