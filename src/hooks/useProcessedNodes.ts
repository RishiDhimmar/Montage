import { useMemo, useEffect } from "react";
import * as THREE from "three";
import { materials } from "../utils/materials";
import { computeGlobalCorners } from "../helpers/ComputeGlobalCorners";
import modelStore from "../stores/ModelStore";

export function useProcessedScene(scene, scale, id, position) {
  const processedData = useMemo(() => {
    const processedMeshes = [];
    if (modelStore.getModel(id)) {
      modelStore.getModel(id).nodePositions = [];
    }
    const modelBox = new THREE.Box3().setFromObject(scene);
    const modelCenter = new THREE.Vector3(position[0], position[1], position[2]);
    scene.traverse((object) => {
      if (
        !object.isMesh ||
        object.name.includes("Roof") ||
        object.name.includes("Ceil") ||
        (object.parent?.name && object.parent.name.includes("Ceiling"))
      ) {
        return;
      }
      let material = materials.white;
      const geometry = object.geometry.clone();
      const matrix = new THREE.Matrix4().makeScale(...scale);
      const worldMatrix = object.matrixWorld.clone();
      matrix.multiply(worldMatrix);
      geometry.applyMatrix4(matrix);
      geometry.computeBoundingBox();
      geometry.computeBoundingSphere();
      if (object.name.includes("Node")) {
        material = materials.cyan;
        const nodeGeometry = object.geometry.clone();
        const worldMatrix = object.matrixWorld.clone();
        const scaleMatrix = new THREE.Matrix4().makeScale(...scale);
        const combinedMatrix = new THREE.Matrix4().multiplyMatrices(scaleMatrix, worldMatrix);
        nodeGeometry.applyMatrix4(combinedMatrix);
        const nodeBox = new THREE.Box3().setFromBufferAttribute(nodeGeometry.attributes.position);
        const nodeCenter = new THREE.Vector3();
        nodeBox.getCenter(nodeCenter);
        const nodePosition = nodeCenter.clone().add(modelCenter);
        if (modelStore.getModel(id)) {
          modelStore.getModel(id).nodePositions.push(nodePosition);
        }
      } else if (object.name.includes("Floor")) {
        material = materials.gray;
      }
      processedMeshes.push({
        geometry,
        material,
        name: object.name,
      });
    });
    const processedNodesMap = {};
    processedMeshes.forEach((mesh, index) => {
      processedNodesMap[`mesh-${index}`] = mesh;
    });
    const corners = computeGlobalCorners(processedNodesMap);
    return { processedMeshes, corners };
  }, [scale]);

  useEffect(() => {
    return () => {
      processedData.processedMeshes.forEach(({ geometry }) => geometry.dispose());
    };
  }, [processedData.processedMeshes]);

  return processedData;
}
