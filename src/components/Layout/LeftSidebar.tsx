import React from "react";
import { observer } from "mobx-react-lite";
import { FaRegBookmark } from "react-icons/fa";

const modules = [
  {
    id: "1",
    name: "Annex",
    image: "/color.jpg", 
    model: "/models/Annex_tag.glb", 
  },
  {
    id: "2",
    name: "Dwelling",
    image: "/logo.png",
    model: "/models/Dwelling_tag.glb",
  },
  {
    id: "3",
    name: "Lifestyle",
    image: "/height.jpg",
    model: "/models/Lifestyle_tag.glb",
  },
];

const LeftSidebar: React.FC = observer(() => {
  const handleDragStart = (event: React.DragEvent, modelPath: string) => {
    event.dataTransfer.setData("modelPath", modelPath); 
    event.dataTransfer.effectAllowed = "copy"; 
  };

  return (
    <div className="w-[360px] flex border-r border-gray-300 h-[calc(100vh-97px)] bg-[#FCFCFC]">
      <div className="w-[80px] border-r border-gray-300 flex flex-col">
        <div>Design</div>
        <div>Modules</div>
        <div className="text-center">
          <FaRegBookmark size={20} className="mx-5 text-gray-500" />
          <div className="text-sm text-gray-500">Bookmarks</div>
        </div>
      </div>
      <div className="space-y-4 p-4">
        {modules.map((module) => (
          <div
            key={module.id}
            draggable
            onDragStart={(e) => handleDragStart(e, module.model)}
            className="border p-2 rounded bg-white shadow cursor-pointer"
          >
            <img
              src={module.image}
              alt={module.name}
              className="w-full h-24 object-cover rounded"
            />
            <p className="text-center mt-2 font-medium">{module.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
});

export default LeftSidebar;
