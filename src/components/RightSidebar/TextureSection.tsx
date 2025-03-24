import React from "react";
import { observer } from "mobx-react-lite";
import textureStore from "../../stores/TextureStore";
import TextureItem from "./TextureItem";
import { Texture } from "../../stores/TextureStore";

interface TextureSectionProps {
  section: {
    id: string;
    title: string;
    textures: Texture[]; 
  };
  index: number;
}

const TextureSection: React.FC<TextureSectionProps> = observer(({ section, index }) => {
  const selectedTexture = textureStore.selectedTextures[section.title];

  const imageSrc = selectedTexture?.previewUrl?.trim() || null;

  return (
    <div className="mb-6 text-center">
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={selectedTexture?.label || "Texture Preview"}
          className="w-full h-[280px] object-cover rounded mb-2 border border-gray-400"
        />
      ) : (
        <div className="w-full h-[280px] bg-gray-300 flex items-center justify-center rounded mb-2 border border-gray-400 text-gray-600">
          No Image Available
        </div>
      )}
      <div className="font-semibold mb-2">{section.title}</div>

      <div className="flex gap-2 justify-center">
        {section.textures.map((texture) => (
          <TextureItem key={texture.id} texture={texture} sectionId={section.id} sectionName={section.title} />
        ))}
      </div>

      <div className="mt-3 text-lg font-semibold text-gray-700">
        {selectedTexture?.label || "No texture selected"}{" "}
        {[0, 2, 3].includes(index) && selectedTexture?.price !== undefined &&
          (selectedTexture.price > 0 ? `$${selectedTexture.price}` : "Included")}
      </div>
    </div>
  );
});

export default TextureSection;
