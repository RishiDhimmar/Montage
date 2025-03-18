import { Edges, Html } from "@react-three/drei";
import React, { useState, useRef, use } from "react";
import { useThree } from "@react-three/fiber";
import { observer } from "mobx-react-lite";
import * as THREE from "three";
import modelStore from "../../stores/ModelStore";
import BoundingBoxLine from "../../helpers/BoundingBoxLine";
import BoundingBoxSpheres from "../../helpers/BoundingBoxSpheres";
import ModelToolbar from "../Toolbars/ModelToolbar";
import { useProcessedNodes } from "../../hooks/useProcessedNodes";
import { useModelInteraction } from "../../hooks/useModelInteraction";

const EdgeModel = observer(({ id, nodes }) => {
  const { camera, gl } = useThree();
  const [hovered, setHovered] = useState(false);

  const model = modelStore.models.find((m) => m.id === id) || {};
  const scale = model.scale || [1, 1, 1];
  const rotation = model.rotation || [0, 0, 0];
  const position = model.position || [0, 0, 0];

  const { processedNodes, corners } = useProcessedNodes(nodes, scale);
  const { handlePointerDown, handlePointerMove, handlePointerUp } =
    useModelInteraction({
      id,
      camera,
      gl,
    });

  return (
    <>
    <group
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
    { console.log(modelStore.getModel(id)?.nodePositions)  }
    </>
  );
});

export default EdgeModel;
