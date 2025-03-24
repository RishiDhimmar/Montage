
import  { useEffect, useState } from "react";
import * as THREE from "three";
import { observer } from "mobx-react-lite";
import { reaction } from "mobx";
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
  extras?: { tag?: string };
}

interface Model3DProps {
  id: number;
  nodes: Record<string, ClonedNode>;
  position: [number, number, number];
  rotation: [number, number, number];
}

const Model3D: React.FC<Model3DProps> = observer(({ id, nodes }) => {
  const [loadedTextures, setLoadedTextures] = useState<
    Record<string, THREE.Texture | null>
  >({});

  useEffect(() => {
    // Set up a reaction that watches for changes in the selected textures.
    const disposer = reaction(
      () => Object.values(textureStore.selectedTextures),
      async (selectedTextures) => {
        if (selectedTextures.length === 0 ) {
          console.warn("No valid textures selected.");
          return;
        }
        try {
          // For simplicity, load the first texture (assumed for "External Wall").
          console.log(selectedTextures["0"]?.materialUrl);
          
          const loadedTex = await loadTexture(selectedTextures["0"]?.materialUrl);
          if (loadedTex) {
            setLoadedTextures((prev) => ({
              ...prev,
              "External Wall": loadedTex,
            }));
          }
          const loadedTex2 = await loadTexture(selectedTextures["2"]?.materialUrl);
          if (loadedTex) {
            setLoadedTextures((prev) => ({
              ...prev,
              "Interior Wall": loadedTex2,
            }));
          }
          const loadedTex3 = await loadTexture(selectedTextures["3"]?.materialUrl);
          if (loadedTex) {
            setLoadedTextures((prev) => ({
              ...prev,
              "Interior Floor": loadedTex3,
            }));
          }
        } catch (error) {
          console.error("Error loading texture:", error);
        }
      }
    );

    // Cleanup reaction on unmount.
    return () => {
      disposer();
    };
  }, []);

  return (
    <>
      <group
        position={modelStore.getPosition(id)}
        rotation={modelStore.getRotation(id)}
        scale={modelStore.getScale(id) || [1, 1, 1]}
      >
        {Object.entries(nodes).map(([key, node]) => {
          // Hide nodes belonging to the roof or ceiling.
          if (
            node.name.includes("Roof") ||
            node.name.includes("Ceil") ||
            (node.parent && node.parent.name.includes("Ceiling"))
          ) {
            return null;
          }
          const isExternalWall = node.name.includes("External");
          const isInteriorWall = node.name.includes("Interior");
          const isFloor = node.name.includes("Floor");

          const assignedTexture = isExternalWall
            ? loadedTextures["External Wall"]
            : isInteriorWall
            ? loadedTextures["Interior Wall"]
            : isFloor
            ? loadedTextures["Interior Floor"]
            : null;
          const tempTexture = new THREE.MeshStandardMaterial({
            map: assignedTexture || null,
            roughness: 1,
            
          });

          // Use the assigned texture material if available; fallback otherwise.
          const material = assignedTexture
            ? tempTexture
            : node.name.includes("Node")
            ? materials.cyan
            : node.material ?? undefined;

          return (
            <mesh
              key={key}
              castShadow
              receiveShadow
              geometry={node.geometry}
              material={material}
              matrixAutoUpdate={false}
              matrix={node.matrixWorld}
            />
          );
        })}
      </group>
    </>
  );
});

export default Model3D;





