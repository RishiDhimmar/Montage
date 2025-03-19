import { SoftShadows } from "@react-three/drei";
import React from "react";

const SceneLights: React.FC = () => (
  <>
    <ambientLight intensity={2} />
    <directionalLight
      position={[15, 30, -10]}
      intensity={10}
      castShadow
      shadow-mapSize-width={2048}
      shadow-mapSize-height={2048}
    />
    {/* <SoftShadows size={10} focus={0.1} /> */}
  </>
);

export default SceneLights;
