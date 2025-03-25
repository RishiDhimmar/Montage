import * as THREE from "three";

export function getPointAtDistance(
  point: THREE.Vector3,
  direction: THREE.Vector3,
  distance: number
): THREE.Vector3 {
  const normalizedDir = direction.clone().normalize();
  const resultPoint = point.clone().add(normalizedDir.multiplyScalar(distance));
  return resultPoint;
}
