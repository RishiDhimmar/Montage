import { Edges, Html } from "@react-three/drei";
import React, { useState } from "react";
import { useThree } from "@react-three/fiber";
import { observer } from "mobx-react-lite";
import * as THREE from "three";
import modelStore from "../../stores/ModelStore";
import BoundingBoxLine from "../../helpers/BoundingBoxLine";
import BoundingBoxSpheres from "../../helpers/BoundingBoxSpheres";
import ModelToolbar from "../Toolbars/ModelToolbar";
import { useProcessedScene } from "../../hooks/useProcessedNodes";
import { useModelInteraction } from "../../hooks/useModelInteraction";

const EdgeModel = observer(({ id, scene }) => {
  const { camera, gl } = useThree();
  const [hovered, setHovered] = useState(false);

  const model = modelStore.models.find((m) => m.id === id) || {};
  const scale = model.scale || [1, 1, 1];
  const rotation = model.rotation || [0, 0, 0];
  const position = model.position || [0, 0, 0];

  const { processedMeshes, corners } = useProcessedScene(
    scene,
    scale,
    id,
    position
  );
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
        {processedMeshes.map((mesh, index) => (
          <mesh
            key={`${mesh.name}-${id}-${index}`}
            geometry={mesh.geometry}
            material={mesh.material}
          >
            <Edges
              color={mesh.name.includes("Wall") ? "black" : "gray"}
              lineWidth={mesh.name.includes("Wall") ? 1 : 0.5}
              threshold={15}
            />
          </mesh>
        ))}
        {(modelStore.selectedModelId === id || hovered) && (
          <BoundingBoxLine corners={corners} />
        )}
        {modelStore.selectedModelId === id && (
          <BoundingBoxSpheres corners={corners} />
        )}
      </group>

      {/* Render nodes at their calculated world positions */}
      {modelStore.getModel(id)?.nodePositions.map((nodePos, index) => (
        <mesh key={`node-${id}-${index}`} position={nodePos}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshNormalMaterial />
        </mesh>
      ))}
    </>
  );
});

export default EdgeModel;
