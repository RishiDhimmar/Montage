
import * as THREE from "three";
import { useControls } from "leva";

export const materials = {
  white: new THREE.MeshStandardMaterial({ color: "#ffffff" }),
  gray: new THREE.MeshStandardMaterial({ color: "#bebebe" }),
  cyan: new THREE.MeshBasicMaterial({ color: "cyan" , transparent: true, opacity: 0.8 }),
  none: new THREE.MeshStandardMaterial({ transparent: true, opacity: 0 }),
  pink: new THREE.MeshStandardMaterial({ color: "#FFC0CB" }),
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
