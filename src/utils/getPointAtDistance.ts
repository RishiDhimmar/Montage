import * as THREE from "three";

export function getPointAtDistance(point, direction, distance) {
  // Clone and normalize the direction vector
  const normalizedDir = direction.clone().normalize();
  // Multiply by the distance and add to the starting point
  const resultPoint = point.clone().add(normalizedDir.multiplyScalar(distance));
  return resultPoint;
}
