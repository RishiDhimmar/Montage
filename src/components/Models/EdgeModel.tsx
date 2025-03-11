import { Edges } from "@react-three/drei";
import React, { useMemo, useState } from "react";
import * as THREE from "three";
import { observer } from "mobx-react-lite";
import modelStore from "../../stores/ModelStore";
import { processNodes } from "../../helpers/ProcessNodes";
import { computeGlobalCorners } from "../../helpers/ComputeGlobalCorners";
import BoundingBoxLine from "../../helpers/BoundingBoxLine";
import BoundingBoxSpheres from "../../helpers/BoundingBoxSpheres";

const EdgeModel = observer(({ id, nodes, position }) => {
  // Define materials with stable references
  const materials = useMemo(
    () => ({
      white: new THREE.MeshBasicMaterial({ color: "white" }),
      gray: new THREE.MeshBasicMaterial({ color: "#f3f3f0" }),
      cyan: new THREE.MeshBasicMaterial({ color: "cyan" }),
      none: new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }),
    }),
    []
  );

  // Process nodes using helper
  const processedNodes = useMemo(() => processNodes(nodes, materials), [nodes, materials]);

  const handleClick = (e: Event) => {
    e.stopPropagation();
    console.log(id);
    modelStore.selectModel(id);
  };

  // Local state to track hover
  const [hovered, setHovered] = useState(false);

  // Compute corners using helper
  const corners = useMemo(() => computeGlobalCorners(processedNodes), [processedNodes]);

  return (
    <group
      position={position}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {Object.keys(processedNodes).map((key) => {
        const { geometry, material, name } = processedNodes[key];
        return (
          <>
            {material != null ? (
              <mesh key={`${key}-${Date.now()}`} geometry={geometry} material={material}>
                <Edges
                  color={name.includes("Wall") ? "black" : "gray"}
                  lineWidth={2}
                  threshold={1}
                />
              </mesh>
            ) : (
              <mesh key={`${key}-${Date.now()}`} geometry={geometry}>
                <Edges
                  color={name.includes("Wall") ? "black" : "gray"}
                  lineWidth={2}
                  threshold={1}
                />
              </mesh>
            )}
          </>
        );
      })}
      {(modelStore.selectedModelId == id || hovered) && <BoundingBoxLine corners={corners} />}
      {modelStore.selectedModelId == id && <BoundingBoxSpheres corners={corners} />}
    </group>
  );
});

export default EdgeModel;

