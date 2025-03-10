import React from "react";
import textureStore from "../../stores/TextureStore";

interface TextureItemProps {
  texture: {
    id: number;
    label: string;
    url: string;
  };
  sectionId: string;
}

const TextureItem: React.FC<TextureItemProps> = ({ texture, sectionId }) => {
  return (
    <button
      onClick={() => textureStore.setTexture(sectionId, texture)}
      className={`border p-1 rounded ${
        textureStore.selectedTextures[sectionId]?.id === texture.id
          ? "border-blue-500"
          : ""
      }`}
    >
      <img src={texture.url} alt={texture.label} className="w-10 h-10 object-cover" />
    </button>
  );
};

export default TextureItem;
