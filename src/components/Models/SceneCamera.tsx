import React from "react";
import { PerspectiveCamera, OrthographicCamera } from "@react-three/drei";
import * as THREE from "three";

interface SceneCameraProps {
  is3D: boolean;
  cameraRef: React.RefObject<THREE.Camera>;
}

export const SceneCamera: React.FC<SceneCameraProps> = ({ is3D, cameraRef }) => {
  return is3D ? (
    <PerspectiveCamera makeDefault position={[5, 5, 5]} ref={cameraRef as React.MutableRefObject<THREE.PerspectiveCamera>} />
  ) : (
    <OrthographicCamera makeDefault position={[0, 10, 0]}  zoom={100} ref={cameraRef as React.MutableRefObject<THREE.OrthographicCamera>} />
  );
};
