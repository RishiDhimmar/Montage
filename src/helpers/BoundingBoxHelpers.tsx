import * as THREE from "three";

export const computeGlobalCorners = (
  processedNodes: Record<string, { geometry: THREE.BufferGeometry }>
): THREE.Vector3[] | null => {
  const globalBox = new THREE.Box3();
  let first = true;
  Object.values(processedNodes).forEach(({ geometry }) => {
    geometry.computeBoundingBox();
    if (geometry.boundingBox) {
      if (first) {
        globalBox.copy(geometry.boundingBox);
        first = false;
      } else {
        globalBox.union(geometry.boundingBox);
      }
    }
  });
  if (globalBox.isEmpty()) return null;
  const { min, max } = globalBox;
  // Use max.y to get the top face (model is assumed to lie on XZ plane)
  const y = max.y;
  return [
    new THREE.Vector3(min.x, y, min.z),
    new THREE.Vector3(max.x, y, min.z),
    new THREE.Vector3(max.x, y, max.z),
    new THREE.Vector3(min.x, y, max.z),
  ];
};
