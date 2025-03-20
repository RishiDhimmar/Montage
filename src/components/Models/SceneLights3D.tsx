import React from "react";

const SceneLights: React.FC = () => (
  <>
    <ambientLight intensity={2} />
    <directionalLight
      position={[15, 30, -10]}
      intensity={1}

    />
  </>
);

export default SceneLights;
