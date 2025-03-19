import React from "react";
import * as THREE from "three";
import { Html } from "@react-three/drei";
import { createRotationDragHandlers } from "../helpers/createRotationDragHandlers ";

interface BoundingBoxSpheresProps {
  corners: THREE.Vector3[] | null;
}

const BoundingBoxSpheres: React.FC<BoundingBoxSpheresProps> = ({ corners }) => {
  const { onPointerDown, onPointerMove, onPointerUp } = createRotationDragHandlers();
  
  if (!corners) return null;
  
  return (
    <>
      {corners.map((corner, i) => (
        <Html key={i} position={corner} center>
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
            }}
          />
        </Html>
      ))}
    </>
  );
}

export default BoundingBoxSpheres;
