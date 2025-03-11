import { Edges, Line } from "@react-three/drei";
import React, { useMemo, useState } from "react";
import * as THREE from "three";
import modelStore from "../../stores/ModelStore";
import { observer } from "mobx-react-lite";

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

  // Process nodes to clone geometry and assign materials
  const processedNodes = useMemo(() => {
    const clonedNodes: Record<
      string,
      { geometry: THREE.BufferGeometry; material: THREE.Material | null; name: string }
    > = {};
    for (const key of Object.keys(nodes)) {
      const node = nodes[key];
      if (!node.isMesh || node.name.includes("Roof")) continue;
      const clonedGeometry = node.geometry.clone();
      clonedGeometry.applyMatrix4(new THREE.Matrix4().copy(node.matrixWorld));
      clonedNodes[key] = {
        geometry: clonedGeometry,
        material: node.name.includes("Node")
          ? materials.cyan
          : node.name.includes("Floor")
          ? materials.gray
          : null,
        name: node.name,
      };
    }
    return clonedNodes;
  }, [nodes]);

  const handleClick = (e: Event) => {
    e.stopPropagation();
    console.log(id);
    modelStore.selectModel(id);
  };

  // Local state to track hover
  const [hovered, setHovered] = useState(false);

  // Helper: Compute global bounding box and extract 4 corner points (projected on XZ plane)
  const corners = useMemo(() => {
    const globalBox = new THREE.Box3();
    let first = true;
    Object.values(processedNodes).forEach(({ geometry }) => {
      geometry.computeBoundingBox();
      if (geometry.boundingBox) {
        if (first) {
          globalBox.copy(geometry.boundingBox);
          first = false;
        } else {
          globalBox.union(geometry.boundingBox);
        }
      }
    });
    if (globalBox.isEmpty()) return null;
    const { min, max } = globalBox;
    // Use max.y for top face since the model is flat on XZ plane
    const y = max.y;
    return [
      new THREE.Vector3(min.x, y, min.z),
      new THREE.Vector3(max.x, y, min.z),
      new THREE.Vector3(max.x, y, max.z),
      new THREE.Vector3(min.x, y, max.z),
    ];
  }, [processedNodes]);

  // Helper: Render a connecting yellow line through the 4 corners
  const renderBoundingBoxLine = () => {
    if (!corners) return null;
    return <Line points={[...corners, corners[0]]} color="yellow" lineWidth={2} />;
  };

  // Helper: Render spheres at each of the 4 corners
  const renderBoundingBoxSpheres = () => {
    if (!corners) return null;
    return corners.map((corner, idx) => (
      <mesh key={`corner-${idx}`} position={corner}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="yellow" />
      </mesh>
    ));
  };

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
      {(modelStore.selectedModelId == id || hovered) && renderBoundingBoxLine()}
      {modelStore.selectedModelId == id && renderBoundingBoxSpheres()}
    </group>
  );
});

export default EdgeModel;
