import React from "react";
import * as THREE from "three";

interface Model3DProps {
  scene: THREE.Scene;
  position: [number, number, number];
}

const Model3D: React.FC<Model3DProps> = ({ scene, position, rotation }) => {
  return <primitive object={scene} position={position} rotation={rotation} />;
};

export default Model3D;
