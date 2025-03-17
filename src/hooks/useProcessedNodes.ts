import { useMemo } from "react";
import * as THREE from "three";
import { processNodes } from "../helpers/ProcessNodes";
import { computeGlobalCorners } from "../helpers/ComputeGlobalCorners";
import { materials } from "../utils/materials"; // Adjust path as needed

export function useProcessedNodes(
  nodes: Record<string, THREE.Object3D>,
  scale: [number, number, number]
) {
  return useMemo(() => {
    // Process raw nodes.
    const processed = processNodes(nodes, materials);
    // Create scaled nodes by applying the scale to each geometry.
    const scaled: Record<string, { geometry: THREE.BufferGeometry; material: THREE.Material; name: string }> = {};
    for (const key in processed) {
      const { geometry, material, name } = processed[key];
      // Clone geometry and apply the scale matrix.
      const clonedGeometry = geometry.clone();
      const scaleMat = new THREE.Matrix4().makeScale(scale[0], scale[1], scale[2]);
      clonedGeometry.applyMatrix4(scaleMat);
      clonedGeometry.computeBoundingBox();
      clonedGeometry.computeBoundingSphere();
      scaled[key] = { geometry: clonedGeometry, material, name };
    }
    const corners = computeGlobalCorners(scaled);
    return { processedNodes: scaled, corners };
  }, [nodes, scale]);
}
