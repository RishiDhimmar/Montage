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
    // Skip non-meshes or nodes that are part of the roof.
    if (!node.isMesh || node.name.includes("Roof")) return;

    const clonedGeometry = node.geometry.clone();
    clonedGeometry.applyMatrix4(new THREE.Matrix4().copy(node.matrixWorld));

    let assignedMaterial: THREE.Material | null = null;
    if (node.name.includes("Node")) {
      assignedMaterial = materials.cyan;
    } else if (node.name.includes("Floor")) {
      assignedMaterial = materials.gray;
    } else {
      assignedMaterial = materials.white;
    }

    clonedNodes[key] = {
      geometry: clonedGeometry,
      material: assignedMaterial,
      name: node.name,
    };

  });

  return clonedNodes;
};
