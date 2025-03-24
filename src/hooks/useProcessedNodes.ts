// import { useMemo, useEffect } from "react";
// import * as THREE from "three";
// import { materials } from "../utils/materials";
// import { computeGlobalCorners } from "../helpers/ComputeGlobalCorners";
// import modelStore from "../stores/ModelStore";

// export function useProcessedScene(scene, scale, id, position) {
//   const processedData = useMemo(() => {
//     const processedMeshes = [];
//     const model = modelStore.getModel(id);
//     const modelCenter = new THREE.Vector3(...position);
//     if (model) model.nodePositions = [];
//     const scaleMatrix = new THREE.Matrix4().makeScale(...scale);
//     const initialRotationY = (model?.rotation || [0, 0, 0])[1];

//     scene.traverse((object) => {
//       // Skip unwanted objects
//       if (
//         !object.isMesh ||
//         ["Roof", "Ceil"].some((pattern) => object.name.includes(pattern)) ||
//         (object.parent?.name && object.parent.name.includes("Ceiling"))
//       ) {
//         return;
//       }

//       // Clone and transform geometry
//       const geometry = object.geometry.clone();
//       geometry.applyMatrix4(scaleMatrix.clone().multiply(object.matrixWorld));
//       let material = materials.white;

//       // Process node-specific logic
//       if (object.name.includes("Node")) {
//         material = materials.cyan;
//         geometry.computeBoundingBox();
//         const { min, max } = geometry.boundingBox;
//         const center = new THREE.Vector3(
//           (min.x + max.x) / 2,
//           (min.y + max.y) / 2,
//           (min.z + max.z) / 2
//         );
//         const isXAxis = (max.x - min.x) >= (max.z - min.z);
//         let axis = isXAxis ? "x" : "z";
//         const startPoint = new THREE.Vector3(
//           isXAxis ? min.x : center.x,
//           center.y,
//           isXAxis ? center.z : min.z
//         );
//         const endPoint = new THREE.Vector3(
//           isXAxis ? max.x : center.x,
//           center.y,
//           isXAxis ? center.z : max.z
//         );

//         // Compute a simple normal based on the center’s quadrant.
//         const normal = new THREE.Vector3(
//           isXAxis ? 0 : (center.x < 0 ? -1 : 1),
//           0,
//           isXAxis ? (center.z < 0 ? -1 : 1) : 0
//         ).normalize();

//         // Apply rotation if needed
//         if (initialRotationY !== 0) {
//           const rotMatrix = new THREE.Matrix4().makeRotationY(initialRotationY);
//           startPoint.applyMatrix4(rotMatrix);
//           endPoint.applyMatrix4(rotMatrix);
//           center.applyMatrix4(rotMatrix);
//           normal.applyMatrix4(rotMatrix);
//           const normRot = THREE.MathUtils.euclideanModulo(initialRotationY, Math.PI * 2);
//           if (Math.abs(Math.cos(normRot)) < 0.1) {
//             axis = axis === "x" ? "z" : "x";
//           }
//         }
//         startPoint.add(modelCenter);
//         endPoint.add(modelCenter);
//         center.add(modelCenter);

//         // Add a gap along the normal
//         const gap = 0.09;
//         const connectionPoint = center.clone().add(normal.clone().multiplyScalar(gap));

//         if (model) {
//           model.nodePositions.push({
//             startPoint,
//             endPoint,
//             axis,
//             farthestNormalPoint: connectionPoint,
//             normal,
//             id,
//           });
//         }
//       } else if (object.name.includes("Floor")) {
//         material = materials.gray;
//       }

//       processedMeshes.push({ geometry, material, name: object.name });
//       modelStore.setPositionYTo0(id);
//     });

//     const processedNodesMap = Object.fromEntries(
//       processedMeshes.map((mesh, index) => [`mesh-${index}`, mesh])
//     );
//     const corners = computeGlobalCorners(processedNodesMap);
    
//     return { processedMeshes, corners };
//   }, [scene, scale, id]);

//   useEffect(() => {
//     return () => {
//       processedData.processedMeshes.forEach(({ geometry }) => geometry.dispose());
//     };
//   }, [processedData]);

//   return processedData;
// }
import { useMemo, useEffect } from "react";
import * as THREE from "three";
import { materials } from "../utils/materials";
import { computeGlobalCorners } from "../helpers/ComputeGlobalCorners";
import modelStore from "../stores/ModelStore";

// Define the type for processed meshes.
interface ProcessedMesh {
  geometry: THREE.BufferGeometry;
  material: THREE.Material;
  name: string;
}

// Define a type for node data and update the Model interface accordingly.
// (Ensure that your ModelStore's Model interface now uses NodeData[] for nodePositions.)
export interface NodeData {
  startPoint: THREE.Vector3;
  endPoint: THREE.Vector3;
  axis: string;
  farthestNormalPoint: THREE.Vector3;
  normal: THREE.Vector3;
  id: number;
}

// Update your Model interface in ModelStore.ts to have:
// nodePositions: NodeData[];
// (Assuming you update that file accordingly.)

export function useProcessedScene(
  scene: THREE.Group,
  scale: [number, number, number],
  id: number,
  position: [number, number, number]
) {
  const processedData = useMemo(() => {
    const processedMeshes: ProcessedMesh[] = [];
    const model = modelStore.getModel(id);
    const modelCenter = new THREE.Vector3(...position);
    if (model) model.nodePositions = [];
    const scaleMatrix = new THREE.Matrix4().makeScale(...scale);
    const initialRotationY = (model?.rotation || [0, 0, 0])[1];

    scene.traverse((object: THREE.Object3D) => {
      // Skip unwanted objects
      if (
        !("isMesh" in object && object.isMesh) ||
        ["Roof", "Ceil"].some((pattern) => object.name.includes(pattern)) ||
        (object.parent?.name && object.parent.name.includes("Ceiling"))
      ) {
        return;
      }

      // Clone and transform geometry
      const meshObject = object as THREE.Mesh;
      const geometry = meshObject.geometry.clone() as THREE.BufferGeometry;
      geometry.applyMatrix4(scaleMatrix.clone().multiply(meshObject.matrixWorld));
      let material: THREE.Material = materials.white;

      // Process node-specific logic
      if (object.name.includes("Node")) {
        material = materials.cyan as THREE.Material;
        geometry.computeBoundingBox();
        const { min, max } = geometry.boundingBox!;
        const center = new THREE.Vector3(
          (min.x + max.x) / 2,
          (min.y + max.y) / 2,
          (min.z + max.z) / 2
        );
        const isXAxis = (max.x - min.x) >= (max.z - min.z);
        let axis = isXAxis ? "x" : "z";
        const startPoint = new THREE.Vector3(
          isXAxis ? min.x : center.x,
          center.y,
          isXAxis ? center.z : min.z
        );
        const endPoint = new THREE.Vector3(
          isXAxis ? max.x : center.x,
          center.y,
          isXAxis ? center.z : max.z
        );

        // Compute a simple normal based on the center’s quadrant.
        const normal = new THREE.Vector3(
          isXAxis ? 0 : (center.x < 0 ? -1 : 1),
          0,
          isXAxis ? (center.z < 0 ? -1 : 1) : 0
        ).normalize();

        // Apply rotation if needed
        if (initialRotationY !== 0) {
          const rotMatrix = new THREE.Matrix4().makeRotationY(initialRotationY);
          startPoint.applyMatrix4(rotMatrix);
          endPoint.applyMatrix4(rotMatrix);
          center.applyMatrix4(rotMatrix);
          normal.applyMatrix4(rotMatrix);
          const normRot = THREE.MathUtils.euclideanModulo(initialRotationY, Math.PI * 2);
          if (Math.abs(Math.cos(normRot)) < 0.1) {
            axis = axis === "x" ? "z" : "x";
          }
        }
        startPoint.add(modelCenter);
        endPoint.add(modelCenter);
        center.add(modelCenter);

        // Add a gap along the normal
        const gap = 0.09;
        const connectionPoint = center.clone().add(normal.clone().multiplyScalar(gap));

        if (model) {
          // Push a NodeData object to nodePositions
          model.nodePositions.push({
            startPoint,
            endPoint,
            axis,
            farthestNormalPoint: connectionPoint,
            normal,
            id,
          });
        }
      } else if (object.name.includes("Floor")) {
        material = materials.gray as THREE.Material;
      }

      processedMeshes.push({ geometry, material, name: object.name });
      modelStore.setPositionYTo0(id);
    });

    const processedNodesMap = Object.fromEntries(
      processedMeshes.map((mesh, index) => [`mesh-${index}`, mesh])
    );
    const corners = computeGlobalCorners(processedNodesMap);
    
    return { processedMeshes, corners };
  }, [scene, scale, id]);

  useEffect(() => {
    return () => {
      processedData.processedMeshes.forEach(({ geometry }) => geometry.dispose());
    };
  }, [processedData]);

  return processedData;
}
