import * as THREE from "three";

export function processNodes(
  nodes: Record<string, THREE.Object3D>,
  materials: Record<string, THREE.Material>
) {
  const result: Record<string, { geometry: THREE.BufferGeometry; material: THREE.Material; name: string }> = {};
  
  for (const key in nodes) {
    const node = nodes[key];
    // Skip non-meshes and nodes related to roof/ceiling.
    if (
      !node.isMesh ||
      node.name.includes("Roof") ||
      node.name.includes("Ceil") ||
      (node.parent && node.parent.name && node.parent.name.includes("Ceiling"))
    ) {
      continue;
    }
    const geometry = node.geometry.clone();
    geometry.applyMatrix4(new THREE.Matrix4().copy(node.matrixWorld));
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();

    let material: THREE.Material = materials.white;
    if (node.name.includes("Node")) {
      material = materials.cyan;
    } else if (node.name.includes("Floor")) {
      material = materials.gray;
    }
    
    result[key] = { geometry, material, name: node.name };
  }
  
  return result;
}
