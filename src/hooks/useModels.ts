import { useState } from "react";
import * as THREE from "three";

export interface ModelProps {
  modelPath: string;
  image: string;
  position: [number, number, number];
}

export const useModels = () => {
  const [models, setModels] = useState<ModelProps[]>([]);
  const [, setLastDropPosition] = useState(new THREE.Vector3(0, 0, 0));
  const addModel = (modelPath: string, image: string, position: [number, number, number]): Promise<void> => {
    return new Promise((resolve) => {
      setModels((prev) => [...prev, { modelPath, image, position }]);
      setLastDropPosition(new THREE.Vector3(...position));
      resolve();
    });
  };

  return { models, addModel };
};


// import { useState } from "react";
// import * as THREE from "three";

// export interface ModelProps {
//   modelPath: string;
//   image: string;
//   position: [number, number, number];
//   noOfBathRooms: number;
//   noOfBedRooms: number;
//   size: number; // in SqFt
//   price: number;
// }

// export const useModels = (cameraRef: React.RefObject<THREE.Camera>) => {
//   const [models, setModels] = useState<ModelProps[]>([]);
//   const [lastDropPosition, setLastDropPosition] = useState(new THREE.Vector3(0, 0, 0));

//   // Default values can be adjusted as needed
//   const addModel = (
//     modelPath: string,
//     image: string,
//     position: [number, number, number],
//     noOfBathRooms: number = 0,
//     noOfBedRooms: number = 0,
//     size: number = 1000,
//     price: number = 0
//   ): Promise<void> => {
//     return new Promise((resolve) => {
//       setModels((prev) => [
//         ...prev,
//         { modelPath, image, position, noOfBathRooms, noOfBedRooms, size, price },
//       ]);
//       setLastDropPosition(new THREE.Vector3(...position));
//       resolve();
//     });
//   };

//   return { models, addModel };
// };
