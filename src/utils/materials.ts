import * as THREE from 'three';

export const materials = {
  white: new THREE.MeshBasicMaterial({ color: "white" }),
  gray: new THREE.MeshBasicMaterial({ color: "#f3f3f0" }),
  cyan: new THREE.MeshBasicMaterial({ color: "cyan" }),
  none: new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }),
};
