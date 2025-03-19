// ../helpers/MeshAlignmentCheck.js
import * as THREE from "three";

function getSimpleAlignment(input: { x: number; z: number; computeBoundingBox: () => void; boundingBox: any; }) {
  // If the input is a Vector3, compare its x and z components.
  if (input instanceof THREE.Vector3) {
    return Math.abs(input.x) > Math.abs(input.z) ? "x" : "z";
  }
  
  // Otherwise assume it's a geometry.
  input.computeBoundingBox();
  const box = input.boundingBox;
  if (!box) return "unknown";
  const extentX = box.max.x - box.min.x;
  const extentZ = box.max.z - box.min.z;
  return extentX > extentZ ? "x" : "z";
}

export default getSimpleAlignment;
