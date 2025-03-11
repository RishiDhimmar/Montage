import React from "react";
import * as THREE from "three";

interface GroundPlaneProps {
  groundRef: React.RefObject<THREE.Mesh>;
}

export const GroundPlane: React.FC<GroundPlaneProps> = ({ groundRef }) => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} ref={groundRef} position={[0, 0, 0]}>
    <planeGeometry args={[50, 50]} />
    <meshBasicMaterial visible={false} />
  </mesh>
);
