import { Edges, Html } from "@react-three/drei";
import React, { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { observer } from "mobx-react-lite";
import { useThree } from "@react-three/fiber";
import modelStore from "../../stores/ModelStore";
import BoundingBoxLine from "../../helpers/BoundingBoxLine";
import BoundingBoxSpheres from "../../helpers/BoundingBoxSpheres";
import { useModelInteraction } from "../../hooks/useModelInteraction";
import ModelToolbar from "../Toolbars/ModelToolbar";
import { useProcessedNodes } from "../../hooks/useProcessedNodes";

const EdgeModel = observer(({ id, nodes }) => {
  const { camera, gl } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const scale = modelStore.getScale(id) || [1, 1, 1];
  const { processedNodes, corners } = useProcessedNodes(nodes, scale);
  const rotation = modelStore.models.find((m) => m.id === id)?.rotation || [0, 0, 0];
  const position = modelStore.getPosition(id);


  const { handlePointerDown, handlePointerMove, handlePointerUp } = useModelInteraction({
    id,
    camera,
    gl,
  });


  useEffect(() => {
    return () => {
      Object.values(processedNodes).forEach(({ geometry }) => geometry.dispose());
    };
  }, [processedNodes]);


  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{ position: "relative" }}
    >
      {modelStore.selectedModelId === id && (
        <Html style={{ position: "absolute", top: "-210px", left: "-130px" }}>
          <ModelToolbar />
        </Html>
      )}
      {Object.entries(processedNodes).map(([key, { geometry, material, name }]) => (
        <mesh key={`${key}-${id}`} geometry={geometry} material={material}>
          <Edges color={name.includes("Wall") ? "black" : "gray"} lineWidth={name.includes("Wall") ? 1.5 : 1} threshold={15}  />
        </mesh>
      ))}
      {(modelStore.selectedModelId === id || hovered) && <BoundingBoxLine corners={corners} />}
      {modelStore.selectedModelId === id && <BoundingBoxSpheres corners={corners} />}
    </group>
  );
});

export default EdgeModel;
