import { Edges } from "@react-three/drei";
import React, { useMemo, useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { observer } from "mobx-react-lite";
import modelStore from "../../stores/ModelStore";
import { processNodes } from "../../helpers/ProcessNodes";
import { computeGlobalCorners } from "../../helpers/ComputeGlobalCorners";
import BoundingBoxLine from "../../helpers/BoundingBoxLine";
import BoundingBoxSpheres from "../../helpers/BoundingBoxSpheres";

// Define materials globally to avoid recreation
const materials = {
  white: new THREE.MeshBasicMaterial({ color: "white" }),
  gray: new THREE.MeshBasicMaterial({ color: "#f3f3f0" }),
  cyan: new THREE.MeshBasicMaterial({ color: "cyan" }),
  none: new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }),
};

const EdgeModel = observer(({ id, nodes, position }) => {
  // Process nodes using helper
  const processedNodes = useMemo(() => processNodes(nodes, materials), [nodes]);

  const handleClick = (e: Event) => {
    e.stopPropagation();
    console.log(id);
    modelStore.selectModel(id);
  };

  // Simple hover state management without timeout
  const [hovered, setHovered] = useState(false);

  const handlePointerOver = () => setHovered(true);
  const handlePointerOut = () => setHovered(false);

  // Compute corners using helper
  const corners = useMemo(() => computeGlobalCorners(processedNodes), [processedNodes]);

  // Resource cleanup
  const processedNodesRef = React.useRef(processedNodes);
  useEffect(() => {
    // Clean up previous processedNodes
    if (processedNodesRef.current) {
      Object.values(processedNodesRef.current).forEach(({ geometry }) => {
        geometry.dispose();
      });
    }
    processedNodesRef.current = processedNodes;
    return () => {
      // Clean up current processedNodes on unmount
      Object.values(processedNodes).forEach(({ geometry }) => {
        geometry.dispose();
      });
    };
  }, [processedNodes]);

  return (
    <group
      position={position}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {Object.keys(processedNodes).map((key) => {
        const { geometry, material, name } = processedNodes[key];
        return (
          <>
            {material != null ? (
              <mesh key={key + "-" + id} geometry={geometry} material={material}>
                <Edges
                  color={name.includes("Wall") ? "black" : "gray"}
                  lineWidth={2}
                  threshold={1}
                />
              </mesh>
            ) : (
              <mesh key={key + "-" + id} geometry={geometry}>
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