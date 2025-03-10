import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import textureStore from "../../stores/TextureStore";
import TextureSection from "../RightSidebar/TextureSection";
import SidebarFooter from "../RightSidebar/SidebarFooter";

const RightSidebar = observer(() => {
  useEffect(() => {
    textureStore.fetchTextures();
  }, []);

  return (
    <div className="h-[calc(100vh-64px)] w-[360px] flex flex-col border-l border-gray-300">
      <div className="h-[80vh] p-4 overflow-y-scroll custom-scrollbar">
        <div className="font-semibold mb-2 text-3xl text-center mb-10">0 Bed 0 Bath 1000 SqFt</div>
        {textureStore.loading && <p>Loading textures...</p>}
        {textureStore.error && <p className="text-red-500">{textureStore.error}</p>}

        {!textureStore.loading &&
          !textureStore.error &&
          textureStore.textures.length > 0 &&
          textureStore.textures.map((section) => (
            <TextureSection key={section.id} section={section} />
          ))}
      </div>

      <SidebarFooter />
    </div>
  );
});

export default RightSidebar;
