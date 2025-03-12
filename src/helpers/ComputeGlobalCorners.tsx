// import * as THREE from "three";

// export const computeGlobalCorners = (
//   processedNodes: Record<
//     string,
//     { geometry: THREE.BufferGeometry; material: THREE.Material | null; name: string }
//   >
// ): THREE.Vector3[] | null => {
//   const globalBox = new THREE.Box3();
//   let first = true;
//   Object.values(processedNodes).forEach(({ geometry }) => {
//     geometry.computeBoundingBox();
//     if (geometry.boundingBox) {
//       if (first) {
//         globalBox.copy(geometry.boundingBox);
//         first = false;
//       } else {
//         globalBox.union(geometry.boundingBox);
//       }
//     }
//   });
//   if (globalBox.isEmpty()) return null;
//   const { min, max } = globalBox;
//   // Use max.y for top face since the model is flat on XZ plane.
//   const y = max.y;
//   return [
//     new THREE.Vector3(min.x, y, min.z),
//     new THREE.Vector3(max.x, y, min.z),
//     new THREE.Vector3(max.x, y, max.z),
//     new THREE.Vector3(min.x, y, max.z),
//   ];
// };

import * as THREE from "three"
export const computeGlobalCorners = (
  processedNodes: Record<string, { geometry: THREE.BufferGeometry; material: THREE.Material | null; name: string }>
): THREE.Vector3[] | null => {
  const globalBox = new THREE.Box3();
  let first = true;
  for (const { geometry } of Object.values(processedNodes)) {
    geometry.computeBoundingBox();
    if (geometry.boundingBox) {
      if (first) {
        globalBox.copy(geometry.boundingBox);
        first = false;
      } else {
        globalBox.union(geometry.boundingBox);
      }
    }
  }
  if (globalBox.isEmpty()) return null;
  const { min, max } = globalBox;
  const y = max.y;
  return [
    new THREE.Vector3(min.x, y, min.z),
    new THREE.Vector3(max.x, y, min.z),
    new THREE.Vector3(max.x, y, max.z),
    new THREE.Vector3(min.x, y, max.z),
  ];
};