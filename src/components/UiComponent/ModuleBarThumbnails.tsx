import  { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import moduleStore from "../../stores/ModuleStore";
import dragStore from "../../stores/DragStore";
interface Module {
  id: number;
  name: string;
  image: string;
  model: string;
  price: number;
  noOfBedRooms: number;
  noOfBathRooms: number;
  size: number;
  moduleType: string;
  moduleTypeId: number;
}
const ModuleBarThumbnails = ({ module }: { module: Module }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleSelect = () => {
    moduleStore.setSelectedModule(module);
    setIsSelected((prev) => !prev);
  };

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    dragStore.setCurrentModule(module);
    console.log(dragStore.currentModule, "currentModule");
    event.dataTransfer.setData("dummy", ""); 
    event.dataTransfer.effectAllowed = "copy";
  };

  const imgSrc = module.image || "/default-image.jpg";

  return (
    <div
      key={module.id}
      draggable
      onDragStart={handleDragStart}
      onClick={handleSelect}
      className={`relative border ${
        isSelected ? "border-yellow-500" : "border-gray-300"
      } hover:border-gray-900 hover:text-gray-900 rounded bg-white shadow cursor-pointer mb-4 p-2 w-[300px] h-[315px] group transition-colors duration-200`}
    >
      <div
        className={`absolute top-2 right-2 ${
          isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        } transition-opacity duration-200`}
      >
        <HiDotsVertical className="text-gray-600 hover:text-gray-900 cursor-pointer" />
      </div>

      <div className="flex justify-center items-center w-full h-[250px] overflow-hidden">
        <img
          src={imgSrc}
          alt={module.name}
          className="w-full h-full object-contain rounded"
        />
      </div>

      <div className="text-sm mt-2 px-2 font-medium">{module.name}</div>
      <div className="flex justify-between text-sm px-2">
        <div className="text-center text-gray-600">${module.price}</div>
        <div className="text-center text-gray-600">
          {module.noOfBathRooms} Bathroom
        </div>
        <div className="text-center text-gray-600">
          {module.noOfBedRooms} Bedroom
        </div>
        <div className="text-center text-gray-600">{module.size} sqft</div>
      </div>
    </div>
  );
};

export default ModuleBarThumbnails;
