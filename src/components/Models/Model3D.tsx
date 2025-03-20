import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { observer } from "mobx-react-lite";
import loadTexture from "../../utils/loadTexture";
import { materials } from "../../utils/materials";
import modelStore from "../../stores/ModelStore";
import textureStore from "../../stores/TextureStore";

interface ClonedNode {
  geometry: THREE.BufferGeometry;
  material: THREE.Material | null;
  name: string;
  matrixWorld: THREE.Matrix4;
  parent?: { name: string; visible: boolean };
  extras?: { tag?: string }; // Added for tag checking
}

interface Model3DProps {
  id: number;
  nodes: Record<string, ClonedNode>;
  position: [number, number, number];
  rotation: [number, number, number];
}

const Model3D: React.FC<Model3DProps> = observer(({ id, nodes }) => {
  const [loadedTextures, setLoadedTextures] = useState<Record<string, THREE.Texture | null>>({});

  useEffect(() => {
    const loadTextures = async () => {
      // Get the first texture from selectedTextures
      const textureEntries = Object.values(textureStore.selectedTextures);
      if (textureEntries.length === 0 || !textureEntries[0]?.materialUrl) {
        console.warn("⚠️ No valid textures selected.");
        return;
      }

      try {
        const loadedTex = await loadTexture(textureEntries[0].materialUrl); // Load first texture
        if (loadedTex) {
          setLoadedTextures((prev) => ({
            ...prev,
            "External Wall": loadedTex,
          }));
        }
      } catch (error) {
        console.error(" Error loading texture:", error);
      }
    };

    loadTextures();
  }, [textureStore.selectedTextures]);

  return (
    <group
      position={modelStore.getPosition(id)}
      rotation={modelStore.getRotation(id)}
      // scale={modelStore.getScale(id) || [1, 1, 1]}
    >
      {Object.entries(nodes).map(([key, node]) => {

        // Hide node if it's part of the roof or ceiling
        if (node.name.includes("Roof") || node.name.includes("Ceil") || (node.parent && node.parent.name.includes("Ceiling"))) {
          return null;
        }
        const isExternalWall = node.name.includes("External_Wall"); // Checking via name

        const assignedTexture = isExternalWall ? loadedTextures["External Wall"] : null;
        const tempTexture = new THREE.MeshStandardMaterial({ map: assignedTexture != null ? assignedTexture : null ,roughness: 1})


        // Apply the selected texture or fallback to default material
        const material = assignedTexture
          ? tempTexture
          : node.name.includes("Node")
          ? materials.cyan
          : node.material ?? undefined;

          material != undefined ? material.needsUpdate = true  : null;

        return (
          <mesh
            key={key}
            // castShadow
            // receiveShadow
            geometry={node.geometry}
            material={material}
            matrixAutoUpdate={false}
            matrix={node.matrixWorld}
          />
        );
      })}
    </group>
  );
});

export default Model3D;
