import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import textureStore from "../../stores/TextureStore";
import Button from "../UiComponent/Button";

const RightSidebar = observer(() => {
  useEffect(() => {
    textureStore.fetchTextures();
  }, []);

  return (
    <div className="h-[calc(100vh-97px)]">
      <div className="w-[360px] flex flex-col border-l border-gray-300 h-[80vh] p-4 overflow-y-scroll custom-scrollbar">
        {textureStore.loading && <p>Loading textures...</p>}
        {textureStore.error && <p className="text-red-500">{textureStore.error}</p>}

        {!textureStore.loading &&
          !textureStore.error &&
          textureStore.textures.length > 0 &&
          textureStore.textures.map((section) => (
            <div key={section.id} className="mb-6 text-center">
              <img
                src={textureStore.selectedTexture?.url || ""}
                alt={textureStore.selectedTexture?.label || "Texture"}
                className="w-full h-48 object-cover rounded mb-2 border border-gray-400"
              />
              <div className="font-semibold mb-2">{section.title}</div>

              <div className="flex gap-2 justify-center">
                {section.textures.map((texture) => (
                  <button
                    key={texture.id}
                    onClick={() => textureStore.setTexture(texture)}
                    className={`border p-2 rounded ${
                      textureStore.selectedTexture?.id === texture.id
                        ? "border-blue-500"
                        : ""
                    }`}
                  >
                    <img
                      src={texture.url}
                      alt={texture.label}
                      className="w-12 h-12 object-cover"
                    />
                  </button>
                ))}
              </div>

              <div className="mt-3 text-lg font-semibold text-gray-700">
                {textureStore.selectedTexture?.label || "No texture selected"}
              </div>
            </div>
          ))}
      </div>

      <div className="flex items-center border-t border-gray-300 bg-transparent p-3 bottom-2">
        <div className="w-2/3">
          <h3 className="text-lg font-semibold">$55,555</h3>
          <div>Estimated Construction cost</div>
        </div>
        <div>
          <Button label="Order Now" variant="primary" />
        </div>
      </div>
    </div>
  );
});

export default RightSidebar;
