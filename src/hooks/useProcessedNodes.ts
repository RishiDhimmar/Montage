import { useMemo, useEffect } from "react";
import * as THREE from "three";
import { materials } from "../utils/materials";
import { computeGlobalCorners } from "../helpers/ComputeGlobalCorners";

export function useProcessedNodes(nodes, scale) {
  const processedData = useMemo(() => {
    const processedNodes = {};
    const nodePositions = []
    
    // Process nodes
    for (const key in nodes) {
      const node = nodes[key];
      
      // Skip non-meshes and ceiling/roof elements
      if (
        !node.isMesh || 
        node.name.includes("Roof") || 
        node.name.includes("Ceil") ||
        (node.parent?.name && node.parent.name.includes("Ceiling"))
      ) {
        continue;
      }
      
      // Clone and transform geometry
      const geometry = node.geometry.clone();
      geometry.applyMatrix4(new THREE.Matrix4().copy(node.matrixWorld));
      
      // Apply scale
      const scaleMat = new THREE.Matrix4().makeScale(...scale);
      geometry.applyMatrix4(scaleMat);
      geometry.computeBoundingBox();
      geometry.computeBoundingSphere();
      
      // Determine material
      let material = materials.white;
      if (node.name.includes("Node")) {
        material = materials.cyan;
        nodePositions.push(node.position)

      } else if (node.name.includes("Floor")) {
        material = materials.gray;
      }
      
      processedNodes[key] = { geometry, material, name: node.name };
    }
    
    // Calculate corners from processed nodes using the provided function
    const corners = computeGlobalCorners(processedNodes);
    
    return { processedNodes, corners };
  }, [nodes, scale]);
  
  // Cleanup geometries when unmounting
  useEffect(() => {
    return () => {
      Object.values(processedData.processedNodes).forEach(
        ({ geometry }) => geometry.dispose()
      );
    };
  }, [processedData.processedNodes]);
  
  return processedData;
}
