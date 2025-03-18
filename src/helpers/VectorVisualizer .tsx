import React from "react";
import { Line } from "@react-three/drei";
import * as THREE from "three";

/**
 * Props:
 * - modelPosition: an array [x, y, z] representing the model's world position.
 * - nodeLocalPosition: an array [x, y, z] representing the node's local position (relative to the model).
 */
const VectorVisualizer = ({ modelPosition, nodeLocalPosition }) => {
  // Convert positions to THREE.Vector3 objects.
  const origin = new THREE.Vector3(0, 0, 0);
  const modelPos = new THREE.Vector3(...modelPosition);
  const nodeLocalPos = new THREE.Vector3(...nodeLocalPosition);

  // Vector A: From origin to model position.
  const vectorA = modelPos.clone();

  // Vector B: From model position to node position (already given as nodeLocalPos).
  const vectorB = nodeLocalPos.clone();

  // Vector C: From origin to node = A + B.
  const vectorC = modelPos.clone().add(nodeLocalPos);

  // Prepare arrays of points for each vector.
  const pointsA = [origin, vectorA];
  const pointsB = [vectorA, vectorA.clone().add(vectorB)]; // same as [modelPos, vectorC]
  const pointsC = [origin, vectorC];

  return (
    <>
      {/* Red: Origin -> Model Position (Vector A) */}
      <Line
        points={pointsA.map((p) => [p.x, p.y, p.z])}
        color="red"
        lineWidth={2}
      />
      {/* Green: Model Position -> Node Position (Vector B) */}
      <Line
        points={pointsB.map((p) => [p.x, p.y, p.z])}
        color="green"
        lineWidth={2}
      />
      {/* Blue: Origin -> Node Position (Vector C) */}
      <Line
        points={pointsC.map((p) => [p.x, p.y, p.z])}
        color="blue"
        lineWidth={2}
      />
    </>
  );
};

export default VectorVisualizer;
