import React from "react";

const SceneLights: React.FC = () => {
  return (
    <>
      <ambientLight intensity={25} />
      {/* <directionalLight position={[2, 2, 2]} /> */}
    </>
  );
};

export default SceneLights;
