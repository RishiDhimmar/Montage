import React from "react";
import textureStore from "../../stores/TextureStore";
import TextureItem from "./TextureItem";

interface TextureSectionProps {
  section: {
    id: string;
    title: string;
    textures: {
      id: number;
      label: string;
      url: string;
    }[];
  };
}

const TextureSection: React.FC<TextureSectionProps> = ({ section }) => {
  return (
    <div className="mb-6 text-center">
      <img
        src={textureStore.selectedTextures[section.id]?.url || ""}
        alt={textureStore.selectedTextures[section.id]?.label || "Texture"}
        className="w-full h-48 object-cover rounded mb-2 border border-gray-400"
      />
      <div className="font-semibold mb-2">{section.title}</div>

      <div className="flex gap-2 justify-center">
        {section.textures.map((texture) => (
          <TextureItem key={texture.id} texture={texture} sectionId={section.id} />
        ))}
      </div>

      <div className="mt-3 text-lg font-semibold text-gray-700">
        {textureStore.selectedTextures[section.id]?.label || "No texture selected"}
      </div>
    </div>
  );
};

export default TextureSection;
