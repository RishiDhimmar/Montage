// import React from 'react'

// function Model3D({scene, position}) {
//   return (
//     <group position={position}>
//       <primitive object={scene} />
//     </group>
//   )
// }

// export default Model3D

import React from "react";
import * as THREE from "three";

interface Model3DProps {
  scene: THREE.Scene;
  position: [number, number, number];
}

const Model3D: React.FC<Model3DProps> = ({ scene, position }) => {
  return <primitive object={scene} position={position} />;
};

export default Model3D;


