import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import textureStore from "../../stores/TextureStore";
import modelStore from "../../stores/ModelStore";
import TextureSection from "../RightSidebar/TextureSection";
import SidebarFooter from "../RightSidebar/SidebarFooter";
import OrderSummary from "../Order";

interface RightSidebarProps {
  isOpen: boolean;
}

const RightSidebar: React.FC<RightSidebarProps> = observer(({ isOpen }) => {
  const [showOrderSummary, setShowOrderSummary] = useState(false);

  useEffect(() => {
    textureStore.fetchTextures();
  }, []);

  return (
    <div
      className={`absolute top-0 bottom-0 right-0 bg-white border-l border-gray-300 transition-all duration-300 overflow-hidden ${
        isOpen ? "w-[360px]" : "w-0"
      }`}
    >
      <div className="h-[80vh] p-4 overflow-y-scroll transition-all duration-300 custom-scrollbar">
        {showOrderSummary ? (
          <OrderSummary onBack={() => setShowOrderSummary(false)} />
        ) : (
          <>
            <div className=" mb-2  text-center mb-10">
              <span className="text-3xl font-bold px-1">
                {modelStore.totalBedRooms}
              </span>
              Bed {" "}
              <span className="text-3xl font-bold px-1">
                {modelStore.totalBathRooms}
              </span>{""}
              Bath {" "}
              <span className="text-3xl font-bold px-1">
                {modelStore.totalSize}
              </span>{""}
              SqFt
            </div>
            {textureStore.loading && <p>Loading textures...</p>}
            {textureStore.error && (
              <p className="text-red-500">{textureStore.error}</p>
            )}
            {!textureStore.loading &&
              !textureStore.error &&
              textureStore.textures.map((section, index) => (
                <TextureSection
                  key={section.id}
                  section={section}
                  index={index}
                />
              ))}
          </>
        )}
      </div>
      {!showOrderSummary && (
        <SidebarFooter onOrderNow={() => setShowOrderSummary(true)} />
      )}
    </div>
  );
});

export default RightSidebar;
