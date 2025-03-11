import * as THREE from "three";

export const processNodes = (
  nodes: Record<string, THREE.Object3D>,
  materials: Record<string, THREE.Material>
) => {
  const clonedNodes: Record<
    string,
    { geometry: THREE.BufferGeometry; material: THREE.Material | null; name: string }
  > = {};
  Object.keys(nodes).forEach((key) => {
    const node = nodes[key];
    if (!node.isMesh || node.name.includes("Roof")) return;
    const clonedGeometry = node.geometry.clone();
    clonedGeometry.applyMatrix4(new THREE.Matrix4().copy(node.matrixWorld));
    clonedNodes[key] = {
      geometry: clonedGeometry,
      material: node.name.includes("Node")
        ? materials.cyan
        : node.name.includes("Floor")
        ? materials.gray
        : null,
      name: node.name,
    };
  });
  return clonedNodes;
};
