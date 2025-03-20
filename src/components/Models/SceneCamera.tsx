import React from "react";
import { PerspectiveCamera, OrthographicCamera } from "@react-three/drei";

interface SceneCameraProps {
  is3D: boolean;
}

export const SceneCamera: React.FC<SceneCameraProps> = ({ is3D }) => {
  return is3D ? (

    <PerspectiveCamera makeDefault position={[0, 40, 0]}  />
  ) : (
    <OrthographicCamera makeDefault position={[0, 30, 0]} zoom={50 }  />

  );
};