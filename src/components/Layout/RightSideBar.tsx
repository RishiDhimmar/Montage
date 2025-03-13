import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import textureStore from "../../stores/TextureStore";
import TextureSection from "../RightSidebar/TextureSection";
import SidebarFooter from "../RightSidebar/SidebarFooter";

interface RightSidebarProps {
  isOpen: boolean;
}

const RightSidebar: React.FC<RightSidebarProps> = observer(({ isOpen }) => {
  useEffect(() => {
    textureStore.fetchTextures();
  }, []);

  return (
    <div
      className={`
        absolute top-0 bottom-0 right-0
        bg-white border-l border-gray-300
        transition-all  duration-300 overflow-hidden
        ${isOpen ? "w-[360px]" : "w-0"}
      `}
    >
      <div className="h-[80vh] p-4 overflow-y-scroll transition-all duration-300 custom-scrollbar">
        <div className="font-semibold mb-2 text-3xl text-center mb-10">
          0 Bed 0 Bath 1000 SqFt
        </div>
        {textureStore.loading && <p>Loading textures...</p>}
        {textureStore.error && <p className="text-red-500">{textureStore.error}</p>}

        {!textureStore.loading &&
          !textureStore.error &&
          textureStore.textures.map((section) => (
            <TextureSection key={section.id} section={section} />
          ))}
      </div>
      <SidebarFooter />
    </div>
  );
});

export default RightSidebar;


