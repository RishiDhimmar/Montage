import * as THREE from "three";

export function getNodeAxisRotation(geometry: { computeBoundingBox: () => void; boundingBox: any; }, alignment: string) {
  // Compute the bounding box
  geometry.computeBoundingBox();
  const bbox = geometry.boundingBox;
  if (!bbox) throw new Error("Geometry has no bounding box");
  
  // Get the center and half extents.
  const center = new THREE.Vector3();
  bbox.getCenter(center);
  const halfExtents = new THREE.Vector3().subVectors(bbox.max, bbox.min).multiplyScalar(0.5);
  
  // Compute start and end points based on alignment.
  const start = center.clone();
  const end = center.clone();
  if (alignment === "x") {
    start.x = center.x - halfExtents.x;
    end.x = center.x + halfExtents.x;
  } else if (alignment === "y") {
    start.y = center.y - halfExtents.y;
    end.y = center.y + halfExtents.y;
  } else if (alignment === "z") {
    start.z = center.z - halfExtents.z;
    end.z = center.z + halfExtents.z;
  } else {
    throw new Error("Invalid alignment; use 'x', 'y', or 'z'.");
  }
  
  // Compute the axis vector.
  const axisVector = new THREE.Vector3().subVectors(end, start).normalize();
  
  // Choose a reference vector for the given alignment.
  let reference;
  if (alignment === "x") reference = new THREE.Vector3(1, 0, 0);
  else if (alignment === "y") reference = new THREE.Vector3(0, 1, 0);
  else reference = new THREE.Vector3(0, 0, 1);
  
  // Calculate the angle between the computed axis and the reference axis.
  const rotationAngle = axisVector.angleTo(reference); // in radians
  
  return { start, end, axisVector, rotationAngle };
}
