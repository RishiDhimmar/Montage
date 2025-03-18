import React from "react";

export const SceneLights: React.FC = () => (
  <>
    <ambientLight intensity={2} />
    <directionalLight position={[2, 2, 2]} />
  </>
);
