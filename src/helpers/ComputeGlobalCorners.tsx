import * as THREE from "three";

export function computeGlobalCorners(
  processedNodes: Record<string, { geometry: THREE.BufferGeometry; material: THREE.Material; name: string }>
): THREE.Vector3[] {
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
  if (globalBox.isEmpty()) return [];
  const { min, max } = globalBox;
  // Return the top corners (using max.y)
  const y = max.y;
  return [
    new THREE.Vector3(min.x, y, min.z),
    new THREE.Vector3(max.x, y, min.z),
    new THREE.Vector3(max.x, y, max.z),
    new THREE.Vector3(min.x, y, max.z),
  ];
}
