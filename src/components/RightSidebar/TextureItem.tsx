// import React from "react";
// import { observer } from "mobx-react-lite";
// import textureStore from "../../stores/TextureStore";

// interface TextureItemProps {
//   texture: {
//     id: number;
//     label: string;
//     materialUrl: string;
//   };
//   sectionId: string;
// }

// const TextureItem: React.FC<TextureItemProps> = observer(({ texture, sectionId }) => {
//   return (
//     <button
//       onClick={() => textureStore.setTexture(sectionId, texture)}
//       className={` p-1 rounded ${
//         textureStore.selectedTextures[sectionId]?.id === texture.id 
//           ? "border"
//           : ""
//       }`}
//     >
//       <img 
//         src={texture.materialUrl || "placeholder.png"} 
//         alt={texture.label} 
//         className="w-10 h-10 object-cover"
//       />
//     </button>
//   );
// });

// export default TextureItem;

import React from "react";
import { observer } from "mobx-react-lite";
import textureStore from "../../stores/TextureStore";

interface TextureItemProps {
  texture: {
    id: number;
    label: string;
    materialUrl: string;
  };
  sectionId: string;
}

const TextureItem: React.FC<TextureItemProps> = observer(({ texture, sectionId }) => {
  return (
    <button
      onClick={() => textureStore.setTexture(sectionId, texture)}
      className={`p-1 rounded ${
        textureStore.selectedTextures[sectionId]?.id === texture.id ? "border" : ""
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

