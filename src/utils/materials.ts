// import * as THREE from 'three';

// export const materials = {
//   white: new THREE.MeshBasicMaterial({ color: "white" }),
//   gray: new THREE.MeshBasicMaterial({ color: "#f3f3f0" }),
//   cyan: new THREE.MeshBasicMaterial({ color: "cyan" }),
//   none: new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }),
// };
import * as THREE from "three";
import { useControls } from "leva";

export const materials = {
  white: new THREE.MeshStandardMaterial({ color: "#ffffff" }),
  gray: new THREE.MeshStandardMaterial({ color: "#bebebe" }),
  cyan: new THREE.MeshStandardMaterial({ color: "#009393" , transparent: true, opacity: 0.5 }),
  none: new THREE.MeshStandardMaterial({ transparent: true, opacity: 0 }),
};

export const MaterialsGUI = () => {
  const { whiteColor, grayColor, cyanColor } = useControls({
    whiteColor: { value: "#ffffff" },
    grayColor: { value: "#f3f3f0" },
    cyanColor: { value: "cyan" },
  });

  // Update the materials with the GUI values
  materials.white.color.set(whiteColor);
  materials.gray.color.set(grayColor);
  materials.cyan.color.set(cyanColor);

  return null;
};
