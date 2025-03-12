import React from "react";
import * as THREE from "three";

interface BoundingBoxSpheresProps {
  corners: THREE.Vector3[];
}

const BoundingBoxSpheres: React.FC<BoundingBoxSpheresProps> = ({ corners }) => {
  if (!corners || corners.length !== 4) return null;
  return (
    <>
      {corners.map((corner, idx) => (
        <mesh key={`corner-${idx}`} position={corner}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshBasicMaterial color="yellow" />
        </mesh>
      ))}
    </>
  );
};

export default BoundingBoxSpheres;
