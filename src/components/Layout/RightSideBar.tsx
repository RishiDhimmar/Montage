import React from "react";
import { observer } from "mobx-react-lite";
import textureStore from "../../stores/TextureStore";
import Button from "../UiComponent/Button";

const dummyApiData = [
  {
    id: "exterior",
    title: "Exterior Finish",
    textures: [
      { id: 1, label: "Wood", url: "/Textures/red_brick_diff_1k.jpg" },
      { id: 2, label: "Brick", url: "/Textures/red_brick_disp_1k.jpg" },
      { id: 3, label: "Stone", url: "/Textures/red_brick_arm_1k.jpg" },
      { id: 4, label: "Metal", url: "/Textures/red_brick_nor_gl_1k.jpg" },
    ],
  },
  {
    id: "interior",
    title: "Interior Finish",
    textures: [
      { id: 1, label: "Wood", url: "/Textures/red_brick_diff_1k.jpg" },
      { id: 2, label: "Brick", url: "/Textures/red_brick_disp_1k.jpg" },
      { id: 3, label: "Stone", url: "/Textures/red_brick_arm_1k.jpg" },
      { id: 4, label: "Metal", url: "/Textures/red_brick_nor_gl_1k.jpg" },
    ],
  },
];

if (!textureStore.selectedTexture) {
  textureStore.setTexture(dummyApiData[0].textures[0]);
}

const RightSidebar = observer(() => {
  return (
    <>
    <div className="h-[calc(100vh-97px)]">
      <div className="w-[360px] flex flex-col border-l border-gray-300 h-[76vh] p-4 overflow-y-scroll custom-scrollbar">
        {dummyApiData.map((section) => (
          <div key={section.id} className="mb-6 text-center">
            <img
              src={textureStore.selectedTexture?.url}
              alt={textureStore.selectedTexture?.label}
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
              {textureStore.selectedTexture?.label}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center border-t border-gray-300 bg-transparent p-3 bottom-2  ">
        <div className="w-2/3">
          <h3 className="text-lg font-semibold">$55,555</h3>
          <div>Estimated Construction cost</div>
        </div>
        <div>
          <Button label="Order Now" variant="primary" />
        </div>
      </div>
      </div>
    </>
  );
});

export default RightSidebar;
