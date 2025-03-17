// import React from "react";
// import { PerspectiveCamera, OrthographicCamera } from "@react-three/drei";
// import * as THREE from "three";

// interface SceneCameraProps {
//   is3D: boolean;
//   cameraRef: React.RefObject<THREE.Camera>;
// }

// export const SceneCamera: React.FC<SceneCameraProps> = ({ is3D, cameraRef }) => {
//   return is3D ? (
//     <PerspectiveCamera makeDefault position={[5, 5, 5]} ref={cameraRef as React.MutableRefObject<THREE.PerspectiveCamera>} />
//   ) : (
//     <OrthographicCamera makeDefault position={[0, 10, 0]} zoom={100} ref={cameraRef as React.MutableRefObject<THREE.OrthographicCamera>} />
//   );
// };


import React, { useRef } from "react";
import { PerspectiveCamera, OrthographicCamera } from "@react-three/drei";
import * as THREE from "three";

interface SceneCameraProps {
  is3D: boolean;
}

export const SceneCamera: React.FC<SceneCameraProps> = ({ is3D }) => {
  const perspectiveRef = useRef<THREE.PerspectiveCamera>(null!);
  const orthographicRef = useRef<THREE.OrthographicCamera>(null!);

  return is3D ? (
    <PerspectiveCamera
      makeDefault
      position={[0, 40, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      fov={50}
      near={0.1}
      far={1000}
      ref={perspectiveRef}
    />
  ) : (
    <OrthographicCamera makeDefault position={[0, 10, 0]}  zoom={100} ref={cameraRef as React.MutableRefObject<THREE.OrthographicCamera>} />
  );
};
