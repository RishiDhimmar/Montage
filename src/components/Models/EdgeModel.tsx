import { Edges } from "@react-three/drei";
import React, { useMemo } from "react";
import * as THREE from "three";

function EdgeModel({ nodes, position }) {
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

  // Store processed nodes to ensure stability across re-renders
  const processedNodes = useMemo(() => {
    const clonedNodes = {};

    for (const key of Object.keys(nodes)) {
      const node = nodes[key];
      if (!node.isMesh || node.name.includes("Roof")) continue;

      console.log("Processing node:", node.name);

      // Clone geometry properly and apply transformation
      const clonedGeometry = node.geometry.clone();
      clonedGeometry.applyMatrix4(new THREE.Matrix4().copy(node.matrixWorld));

      // Store cloned nodes with stable material references
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
  }, [nodes]); // Removed `materials` from dependencies to prevent unnecessary re-renders

  return (
    <group position={position}>
      {Object.keys(processedNodes).map((key) => {
        const { geometry, material, name } = processedNodes[key];
        console.log(material)
        return (
          <>
            {material != null ? (
              <mesh
                key={`${key}-${Date.now()}`}
                geometry={geometry}
                material={material}
              >
                {" "}
                <Edges
                  color={name.includes("Wall") ? "black" : "gray"}
                  lineWidth={1}
                  threshold={1}
                />{" "}
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
    </group>
  );
}

export default EdgeModel;
