import React, { useEffect, useMemo, useRef } from "react";
import { Line } from "@react-three/drei";
import * as THREE from "three";

interface BoundingBoxLineProps {
  corners: THREE.Vector3[] | null;
}

const BoundingBoxLine: React.FC<BoundingBoxLineProps> = ({ corners }) => {
  const lineRef = useRef<THREE.Line>(null);
  const points = useMemo(() => (corners ? [...corners, corners[0]] : []), [corners]);

  useEffect(() => {
    return () => {
      if (lineRef.current) {
        if (lineRef.current.geometry) lineRef.current.geometry.dispose();
        if (lineRef.current.material && (lineRef.current.material as THREE.Material).dispose)
          (lineRef.current.material as THREE.Material).dispose();
      }
    };
  }, []);

  if (!corners) return null;
  return <Line ref={lineRef} points={points} color="#fac725" lineWidth={3} transparent={true} opacity={0.9} />;
};

export default BoundingBoxLine;
