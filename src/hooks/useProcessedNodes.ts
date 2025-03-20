import { useMemo, useEffect } from "react";
import * as THREE from "three";
import { materials } from "../utils/materials";
import { computeGlobalCorners } from "../helpers/ComputeGlobalCorners";
import modelStore from "../stores/ModelStore";

export function useProcessedScene(scene, scale, id, position) {
  const processedData = useMemo(() => {
    const processedMeshes = [];
    const model = modelStore.getModel(id);
    const modelCenter = new THREE.Vector3(...position);
    // Initialize nodePositions array
    if (model) model.nodePositions = [];
    const scaleMatrix = new THREE.Matrix4().makeScale(...scale);
    const excludePatterns = ["Roof", "Ceil"];

    scene.traverse((object) => {
      if (
        !object.isMesh ||
        excludePatterns.some((pattern) => object.name.includes(pattern)) ||
        (object.parent?.name && object.parent.name.includes("Ceiling"))
      ) {
        return;
      }

      let material = materials.white;
      const geometry = object.geometry.clone();
      const transform = scaleMatrix.clone().multiply(object.matrixWorld);
      geometry.applyMatrix4(transform);

      if (object.name.includes("Node")) {
        material = materials.cyan;
        geometry.computeBoundingBox();
        const nodeBox = geometry.boundingBox;
        const width = nodeBox.max.x - nodeBox.min.x;
        const depth = nodeBox.max.z - nodeBox.min.z;
        const centerX = (nodeBox.max.x + nodeBox.min.x) / 2;
        const centerY = (nodeBox.max.y + nodeBox.min.y) / 2;
        const centerZ = (nodeBox.max.z + nodeBox.min.z) / 2;
        const isXAxis = width >= depth;
        const axis = isXAxis ? "x" : "z";

        const startX = isXAxis ? nodeBox.min.x : centerX;
        const startZ = isXAxis ? centerZ : nodeBox.min.z;
        const endX = isXAxis ? nodeBox.max.x : centerX;
        const endZ = isXAxis ? centerZ : nodeBox.max.z;

        const startPoint = new THREE.Vector3(startX, centerY, startZ).add(
          modelCenter
        );
        const endPoint = new THREE.Vector3(endX, centerY, endZ).add(
          modelCenter
        );
        // Use node center as the connection point before adding gap.
        const centerPoint = new THREE.Vector3(centerX, centerY, centerZ).add(
          modelCenter
        );

        // Calculate a simple outer normal based on the quadrant.
        const diff = new THREE.Vector3(centerX, centerY, centerZ); // relative (node center before offset)
        let normal;
        if (diff.x >= 0 && diff.z >= 0) {
          normal = isXAxis
            ? new THREE.Vector3(0, 0, 1)
            : new THREE.Vector3(1, 0, 0);
        } else if (diff.x < 0 && diff.z >= 0) {
          normal = isXAxis
            ? new THREE.Vector3(0, 0, -1)
            : new THREE.Vector3(-1, 0, 0);
        } else if (diff.x < 0 && diff.z < 0) {
          normal = isXAxis
            ? new THREE.Vector3(0, 0, -1)
            : new THREE.Vector3(-1, 0, 0);
        } else {
          normal = isXAxis
            ? new THREE.Vector3(0, 0, -1)
            : new THREE.Vector3(1, 0, 0);
        }
        normal.normalize();

        // Add a gap along the normal for the connection point.
        const gap = 0.1;
        const connectionPoint = centerPoint
          .clone()
          .add(normal.clone().multiplyScalar(gap));

        if (model) {
          model.nodePositions.push({
            startPoint,
            endPoint,
            axis,
            farthestNormalPoint: connectionPoint,
            normal, // for debugging purposes
            id,
          });
        }
      } else if (object.name.includes("Floor")) {
        material = materials.gray;
      }

      processedMeshes.push({ geometry, material, name: object.name });
    });

    const processedNodesMap = Object.fromEntries(
      processedMeshes.map((mesh, index) => [`mesh-${index}`, mesh])
    );
    const corners = computeGlobalCorners(processedNodesMap);

    return { processedMeshes, corners };
  }, [scene, scale, id]);

  useEffect(() => {
    return () => {
      processedData.processedMeshes.forEach(({ geometry }) =>
        geometry.dispose()
      );
    };
  }, [processedData]);

  return processedData;
}
