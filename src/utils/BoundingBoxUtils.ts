import * as THREE from 'three';

export const computeBoundingBoxCenter = (corners: THREE.Vector3[]): THREE.Vector3 =>
  new THREE.Box3().setFromPoints(corners).getCenter(new THREE.Vector3());
