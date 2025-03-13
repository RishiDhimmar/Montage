import { Edges } from "@react-three/drei";
import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { observer } from "mobx-react-lite";
import { useThree } from "@react-three/fiber";
import modelStore from "../../stores/ModelStore";
import BoundingBoxLine from "../../helpers/BoundingBoxLine";
import BoundingBoxSpheres from "../../helpers/BoundingBoxSpheres";
import { useModelInteraction } from "../../hooks/useModelInteraction";
import { useProcessedNodes } from "../../hooks/useProcessedNodes";

const EdgeModel = observer(({ id, nodes }) => {
  const { camera, gl } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const { processedNodes, corners, bbCenter } = useProcessedNodes(nodes);
  useEffect(() => {
    return () => {
      Object.values(processedNodes).forEach(({ geometry }) => geometry.dispose());
    };
  }, [processedNodes]);


  // Use our drag-only hook (rotation logic removed).
  const { handlePointerDown, handlePointerMove, handlePointerUp } = useModelInteraction({
    id,
    camera,
    gl,
  });

  // Get the stored model rotation (remains unchanged by pointer events).
  const model = modelStore.models.find((m) => m.id === id);
  const rotation = model ? model.rotation : [0, 0, 0];

  return (
    <group
      ref={groupRef}
      position={modelStore.getPosition(id)}
      rotation={rotation}
      onClick={(e) => {
        e.stopPropagation();
        modelStore.selectModel(id);
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {Object.entries(processedNodes).map(([key, { geometry, material, name }]) => (
        <mesh key={`${key}-${id}`} geometry={geometry} material={material || undefined}>
          <Edges color={name.includes("Wall") ? "black" : "gray"} lineWidth={1} threshold={1} renderOrder={2}/>
        </mesh>
      ))}
      {(modelStore.selectedModelId === id || hovered) && <BoundingBoxLine corners={corners} />}
      {modelStore.selectedModelId === id && <BoundingBoxSpheres corners={corners} />}
    </group>
  );
});

export default EdgeModel;
