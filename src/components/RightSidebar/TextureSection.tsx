import React from "react";
import { observer } from "mobx-react-lite";
import textureStore from "../../stores/TextureStore";
import TextureItem from "./TextureItem";

interface TextureSectionProps {
  section: {
    id: string;
    title: string;
    textures: {
      id: number;
      label: string;
      imageUrl: string;
      materialUrl: string;
    }[];
  };
}

const TextureSection: React.FC<TextureSectionProps> = observer(({ section }) => {
  const selectedTexture = textureStore.selectedTextures[section.id];

  const imageSrc = selectedTexture?.imageUrl?.trim() ? selectedTexture.imageUrl : null;
  return (
    <div className="mb-6 text-center">
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={selectedTexture?.label || "Texture"}
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
          <TextureItem key={texture.id} texture={texture} sectionId={section.id} />
        ))}
      </div>

      <div className="mt-3 text-lg font-semibold text-gray-700">
        {selectedTexture?.label || "No texture selected"}
      </div>
    </div>
  );
});

export default TextureSection;
