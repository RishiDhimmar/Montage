import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface BoundingBoxSpheresProps {
  corners: THREE.Vector3[] | null;
}

const BoundingBoxSpheres: React.FC<BoundingBoxSpheresProps> = ({ corners }) => {
  if (!corners) return null;
  return (
    <>
      {corners.map((corner, idx) => (
        <Sphere key={`sphere-${idx}`} position={corner} />
      ))}
    </>
  );
};

interface SphereProps {
  position: THREE.Vector3;
}

const Sphere: React.FC<SphereProps> = ({ position }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  useEffect(() => {
    return () => {
      if (meshRef.current) {
        if (meshRef.current.geometry) meshRef.current.geometry.dispose();
        if (meshRef.current.material && (meshRef.current.material as THREE.Material).dispose)
          (meshRef.current.material as THREE.Material).dispose();
      }
    };
  }, []);
  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshBasicMaterial color="yellow" />
    </mesh>
  );
};

export default BoundingBoxSpheres;
