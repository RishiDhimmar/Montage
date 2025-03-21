import React from "react";

const SceneLights: React.FC = () => {
  

  return (
    <>
      <ambientLight intensity={2} />
      <directionalLight
        position={[15, 30, 10]}
        intensity={3}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
        shadow-bias={-0.001}
        
      />
    </>
  );
};

export default SceneLights;
