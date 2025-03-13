import React, { useRef, useCallback } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import modelStore from "../stores/ModelStore";
import { performRaycastFromMouse } from "../utils/PerformRaycastingFromMouse";

interface BoundingBoxSpheresProps {
  corners: THREE.Vector3[] | null;
}

interface DragData {
  initialPointer: THREE.Vector3; // pointer hit (world coordinate) at drag start
  modelCenter: THREE.Vector3;    // model's center position
  initialRotation: number;
}

const BoundingBoxSpheres: React.FC<BoundingBoxSpheresProps> = ({ corners }) => {
  if (!corners) return null;

  const { camera, gl } = useThree();
  const dragData = useRef<{ [key: number]: DragData }>({});

  const onPointerDown = useCallback((e: PointerEvent, index: number) => {
    e.stopPropagation();
    (e.target as Element).setPointerCapture(e.pointerId);

    if (modelStore.selectedModelId === null) return;
    const model = modelStore.models.find((m) => m.id === modelStore.selectedModelId);
    if (!model) return;

    const modelCenter = new THREE.Vector3(...model.position);
    const intersection = performRaycastFromMouse(e, camera, gl);
    if (!intersection) return;
    const initialPointer = intersection.clone();

    dragData.current[index] = {
      initialPointer,
      modelCenter: modelCenter.clone(),
      initialRotation: model.rotation[1],
    };
  }, [camera, gl, modelStore.selectedModelId]);

  const onPointerMove = useCallback((e: PointerEvent, index: number) => {
    e.stopPropagation();

    if (modelStore.selectedModelId === null) return;
    const model = modelStore.models.find((m) => m.id === modelStore.selectedModelId);
    if (!model) return;

    const data = dragData.current[index];
    if (!data) return;

    const intersection = performRaycastFromMouse(e, camera, gl);
    if (!intersection) return;
    const currentPointer = intersection.clone();

    // Compute vectors from the model center on the XZ plane.
    const initialVec2 = new THREE.Vector2(
      data.initialPointer.x - data.modelCenter.x,
      data.initialPointer.z - data.modelCenter.z
    );
    const currentVec2 = new THREE.Vector2(
      currentPointer.x - data.modelCenter.x,
      currentPointer.z - data.modelCenter.z
    );

    let angleDiff = currentVec2.angleTo(initialVec2);
    const cross = initialVec2.x * currentVec2.y - initialVec2.y * currentVec2.x;
    if (cross < 0) angleDiff = -angleDiff;

    const newRotation = data.initialRotation + angleDiff;
    modelStore.updateModelRotation(modelStore.selectedModelId, [0, -newRotation, 0]);
  }, [camera, gl, modelStore.selectedModelId]);

  const onPointerUp = useCallback((e: PointerEvent, index: number) => {
    e.stopPropagation();
    (e.target as Element).releasePointerCapture(e.pointerId);
    delete dragData.current[index];
  }, []);

  return (
    <>
      {corners.map((corner, i) => (
        <Html key={`html-${i}`} position={corner} center>
          <div
            onPointerDown={(e) => onPointerDown(e as unknown as PointerEvent, i)}
            onPointerMove={(e) => onPointerMove(e as unknown as PointerEvent, i)}
            onPointerUp={(e) => onPointerUp(e as unknown as PointerEvent, i)}
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              background: "white",
              border: "2px solid black",
              pointerEvents: "auto",
            }}
          />
        </Html>
      ))}
    </>
  );
};

export default BoundingBoxSpheres;



// import React, { useRef, useCallback } from "react";
// import * as THREE from "three";
// import { useThree } from "@react-three/fiber";
// import modelStore from "../stores/ModelStore";
// import { performRaycastFromMouse } from "../utils/PerformRaycastingFromMouse";

// interface BoundingBoxSpheresProps {
//   corners: THREE.Vector3[] | null;
// }

// interface DragData {
//   initialPointer: THREE.Vector3; // pointer hit (world coordinate) at drag start
//   modelCenter: THREE.Vector3;    // model's center position
//   initialRotation: number;
// }

// const BoundingBoxSpheres: React.FC<BoundingBoxSpheresProps> = ({ corners }) => {
//   if (!corners) return null;

//   const { camera, gl } = useThree();
//   const dragData = useRef<{ [key: number]: DragData }>({});

//   const onPointerDown = useCallback((e: PointerEvent, index: number) => {
//     e.stopPropagation();
//     (e.target as Element).setPointerCapture(e.pointerId);

//     const selectedId = modelStore.selectedModelId;
//     if (selectedId === null) return;

//     const model = modelStore.models.find(m => m.id === selectedId);
//     if (!model) return;

//     const modelCenter = new THREE.Vector3(...model.position);
//     const intersection = performRaycastFromMouse(e, camera, gl);
//     if (!intersection) return;

//     dragData.current[index] = {
//       initialPointer: intersection.clone(),
//       modelCenter: modelCenter,
//       initialRotation: model.rotation[1],
//     };
//   }, [camera, gl]);

//   const onPointerMove = useCallback((e: PointerEvent, index: number) => {
//     e.stopPropagation();

//     const selectedId = modelStore.selectedModelId;
//     if (selectedId === null) return;
//     const model = modelStore.models.find(m => m.id === selectedId);
//     if (!model) return;

//     const data = dragData.current[index];
//     if (!data) return;

//     const intersection = performRaycastFromMouse(e, camera, gl);
//     if (!intersection) return;
//     const currentPointer = intersection.clone();

//     // Compute the initial and current vectors on the XZ plane.
//     const initialVec = new THREE.Vector2(
//       data.initialPointer.x - data.modelCenter.x,
//       data.initialPointer.z - data.modelCenter.z
//     );
//     const currentVec = new THREE.Vector2(
//       currentPointer.x - data.modelCenter.x,
//       currentPointer.z - data.modelCenter.z
//     );

//     // Compute the unsigned angle difference.
//     let angleDiff = currentVec.angleTo(initialVec);
//     // Determine the sign via the cross product.
//     const cross = initialVec.x * currentVec.y - initialVec.y * currentVec.x;
//     if (cross < 0) angleDiff = -angleDiff;

//     const newRotation = data.initialRotation + angleDiff;
//     modelStore.updateModelRotation(selectedId, [0, -newRotation, 0]);
//   }, [camera, gl]);

//   const onPointerUp = useCallback((e: PointerEvent, index: number) => {
//     e.stopPropagation();
//     (e.target as Element).releasePointerCapture(e.pointerId);
//     delete dragData.current[index];
//   }, []);

//   return (
//     <>
//       {corners.map((corner, i) => (
//         <mesh
//           key={`sphere-${i}`}
//           position={corner}
//           onPointerDown={(e) => onPointerDown(e as unknown as PointerEvent, i)}
//           onPointerMove={(e) => onPointerMove(e as unknown as PointerEvent, i)}
//           onPointerUp={(e) => onPointerUp(e as unknown as PointerEvent, i)}
//         >
//           <sphereGeometry args={[0.3, 16, 16]} />
//           <meshBasicMaterial color="white" />
//         </mesh>
//       ))}
//     </>
//   );
// };

// export default BoundingBoxSpheres;