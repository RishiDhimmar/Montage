import React from "react";

export const SceneLights: React.FC = () => (
  <>
    <ambientLight intensity={0.5} />
    <directionalLight position={[2, 2, 2]} />
  </>
);
