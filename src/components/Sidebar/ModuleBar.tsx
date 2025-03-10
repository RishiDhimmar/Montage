import React from "react";
import { FaPlus } from "react-icons/fa";
import Button from "../UiComponent/Button";
import SearchBar from "./SearchBar";

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
  {
    id: "4",
    name: "Annex",
    image: "/color.jpg",
    model: "/models/Annex_tag.glb",
  },
  {
    id: "5",
    name: "Dwelling",
    image: "/logo.png",
    model: "/models/Dwelling_tag.glb",
  },
  {
    id: "6",
    name: "Lifestyle",
    image: "/height.jpg",
    model: "/models/Lifestyle_tag.glb",
  },
  {
    id: "7",
    name: "Annex",
    image: "/color.jpg",
    model: "/models/Annex_tag.glb",
  },
  {
    id: "8",
    name: "Dwelling",
    image: "/logo.png",
    model: "/models/Dwelling_tag.glb",
  },
  {
    id: "9",
    name: "Lifestyle",
    image: "/height.jpg",
    model: "/models/Lifestyle_tag.glb",
  },
];

const ModuleBar: React.FC = () => {
  const handleDragStart = (event: React.DragEvent, modelPath: string) => {
    event.dataTransfer.setData("modelPath", modelPath);
    event.dataTransfer.effectAllowed = "copy";
  };

  return (
    <>
    <div className="p-4">
      <div className="text-xl font-bold mb-3">Modules</div>
      <div className="mb-3 border-b border-gray-300"></div>
      <div className="mb-3">
        <SearchBar/>
      </div>
      <div className="mb-2 border-b border-gray-300"></div>
      <div className="flex justify-between mb-2  border-gray-300  rounded items-center h-[7vh] px-7 ">
        <div className="border rounded w-[80px]">
        <Button label="Annex" onClick={() => {}} variant="none" />
        </div>
        <div className="border rounded w-[80px]">
        <Button label="Dwelling" onClick={() => {}} variant="none"/>
        </div>
        <div className="border rounded w-[80px]">
        <Button label="Lifestyle" onClick={() => {}} variant="none"/>
        </div>
      </div>
      <div className="mb-2 border-b border-gray-300"></div>
      <div className="h-[60vh] p-4 overflow-y-scroll custom-scrollbar">
        <div className=" ">
          {modules.map((module) => (
            <div
              key={module.id}
              draggable
              onDragStart={(e) => handleDragStart(e, module.model)}
              className="border rounded bg-white shadow cursor-pointer mb-4"
            >
              <img
                src={module.image}
                alt={module.name}
                className="w-full h-[200px] object-cover rounded"
              />
              <p className="text-center mt-2 font-medium">{module.name}</p>
            </div>
          ))}
        </div>
      </div>
      </div>
    </>
  );
};

export default ModuleBar;
