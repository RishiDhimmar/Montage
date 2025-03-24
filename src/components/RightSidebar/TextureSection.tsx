// import React from "react";
// import { observer } from "mobx-react-lite";
// import textureStore from "../../stores/TextureStore";
// import TextureItem from "./TextureItem";

// interface TextureSectionProps {
//   section: {
//     id: string;
//     title: string;
//     textures: {
//       id: number;
//       label: string;
//       previewUrl: string;
//       materialUrl: string;
//       price?: number;
//     }[];
//   };
//   index: number; 
// }

// const TextureSection: React.FC<TextureSectionProps> = observer(({ section, index }) => {
//   const selectedTexture = textureStore.selectedTextures[section.title];
//   console.log(selectedTexture)

//   const imageSrc = selectedTexture?.previewUrl?.trim()
//     ? selectedTexture.previewUrl
//     : null;

//   // Only show price in the 1st, 3rd, and 4th sections
//   const allowedSections = [0, 2, 3];
//   const showPrice = allowedSections.includes(index);

//   return (
//     <div className="mb-6 text-center">
//       {selectedTexture ? (
//         <img
//           src={selectedTexture.previewUrl}
//           alt={selectedTexture?.label || "Texture"}
//           className="w-full h-[280px] object-cover rounded mb-2 border border-gray-400"
//         />
//       ) : (
//         <div className="w-full h-[280px] bg-gray-300 flex items-center justify-center rounded mb-2 border border-gray-400 text-gray-600">
//           No Image Available
//         </div>
//       )}

//       <div className="font-semibold mb-2">{section.title}</div>

//       <div className="flex gap-2 justify-center">
//         {section.textures.map((texture) => (
//           <TextureItem key={texture.id} texture={texture} sectionId={section.id} sectionName={section.title} />
//         ))}
//       </div>

//       <div className="mt-3 text-lg font-semibold text-gray-700">
//         {selectedTexture?.label || "No texture selected"}{" "}
//         {showPrice && selectedTexture?.price !== undefined &&
//           (selectedTexture.price > 0 ? `$${selectedTexture.price}` : "Included")}
//       </div>
//     </div>
//   );
// });

// export default TextureSection;


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



// import React, { useEffect } from "react";
// import { observer } from "mobx-react-lite";
// import textureStore from "../../stores/TextureStore";
// import TextureItem from "./TextureItem";
// import { Texture } from "../../stores/TextureStore"; // ✅ Ensure correct type import

// interface TextureSectionProps {
//   section: {
//     id: string | number;  // Allow both string & number, then convert to string
//     title: string;
//   };
// }

// const TextureSection: React.FC<TextureSectionProps> = observer(({ section }) => {
//   const sectionId = String(section.id); // ✅ Convert id to string

//   useEffect(() => {
//     textureStore.fetchTextures(sectionId); // Fetch textures when component mounts
//   }, [sectionId]);

//   // ✅ FIX: Explicitly define textures as an array
//   const textures: Texture[] = textureStore.textures[sectionId] ?? []; 
//   const selectedTexture = textureStore.selectedTextures[sectionId];

//   return (
//     <div className="mb-6 text-center">
//       {/* Selected Texture Preview */}
//       {selectedTexture ? (
//         <img
//           src={selectedTexture.previewUrl || "placeholder.png"}
//           alt={selectedTexture.label || "Texture"}
//           className="w-full h-[280px] object-cover rounded mb-2 border border-gray-400"
//         />
//       ) : (
//         <div className="w-full h-[280px] bg-gray-300 flex items-center justify-center rounded mb-2 border border-gray-400 text-gray-600">
//           No Image Available
//         </div>
//       )}

//       <div className="font-semibold mb-2">{section.title}</div>

//       {/* Texture Options */}
//       <div className="flex gap-2 justify-center">
//         {textures.length > 0 ? (
//           textures.map((texture) => (
//             <TextureItem
//               key={texture.id}
//               texture={texture}
//               sectionId={sectionId}
//               sectionName={section.title}
//             />
//           ))
//         ) : (
//           <span className="text-gray-500">No textures available</span>
//         )}
//       </div>

//       {/* Selected Texture Info */}
//       <div className="mt-3 text-lg font-semibold text-gray-700">
//         {selectedTexture?.label || "No texture selected"}
//         {selectedTexture?.price !== undefined &&
//           (selectedTexture.price > 0 ? ` - $${selectedTexture.price}` : " - Included")}
//       </div>
//     </div>
//   );
// });

// export default TextureSection;
