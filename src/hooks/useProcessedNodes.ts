import { useMemo } from "react";
import * as THREE from "three";
import { processNodes } from "../helpers/ProcessNodes";
import { computeGlobalCorners } from "../helpers/ComputeGlobalCorners";
import { computeBoundingBoxCenter } from "../utils/BoundingBoxUtils";
import { materials } from "../utils/materials";

export function useProcessedNodes(nodes: any) {
  return useMemo(() => {
    const processedNodes = processNodes(nodes, materials);
    const corners = computeGlobalCorners(processedNodes);
    const bbCenter = corners.length ? computeBoundingBoxCenter(corners) : new THREE.Vector3();
    return { processedNodes, corners, bbCenter };
  }, [nodes]);
}
