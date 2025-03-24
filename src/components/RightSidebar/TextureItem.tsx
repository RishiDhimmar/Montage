import React from "react";
import { observer } from "mobx-react-lite";
import textureStore, { Texture } from "../../stores/TextureStore";

interface TextureItemProps {
  texture: Texture; 
  sectionId: string;
  sectionName: string;
}

const TextureItem: React.FC<TextureItemProps> = observer(({ texture, sectionId, sectionName }) => {
  console.log(textureStore.selectedTextures[sectionId]?.id);

  return (
    <button
      onClick={() => textureStore.setTexture(sectionId, texture, sectionName)}
      className={`p-1 rounded ${
        textureStore.selectedTextures[sectionId]?.id === texture.id ? " border" : ""
      }`}
    >
      <img
        src={texture.materialUrl || "placeholder.png"}
        alt={texture.label}
        className="w-10 h-10 object-cover"
      />
    </button>
  );
});

export default TextureItem;


