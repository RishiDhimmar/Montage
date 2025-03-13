import React from "react";
import ModuleDropdown from "../Dropdowns/ModuleDropdown";
import { IoEllipsisHorizontal } from "react-icons/io5";

interface Module {
  id: string;
  name: string;
  image: string;
  model: string;
}

interface ModuleGridItemProps {
  module: Module;
  onDragStart: (event: React.DragEvent, modelPath: string) => void;
}

const ModuleGridItem: React.FC<ModuleGridItemProps> = ({ module, onDragStart }) => {
  return (
    <div
      key={module.id}
      draggable
      onDragStart={(e) => onDragStart(e, module.model)}
      className="relative h-[210px] bg-white border border-gray-300 rounded p-5 cursor-pointer 
                 hover:border-black transition duration-200 group"
    >
      {/* Dropdown on Hover */}
      <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <ModuleDropdown icon={<IoEllipsisHorizontal size={20} />} />
      </div>

      {/* Image */}
      <div className="flex justify-center bg-white">
        <img src={module.image} alt={module.name} className="w-full h-[150px] object-cover rounded" />
      </div>

      {/* Module Info */}
      <div className="flex justify-between px-2 h-[30px]">
        <div className="text-center text-sm">{module.name}</div>
        <div className="text-center text-sm">{module.id}</div>
      </div>
    </div>
  );
};

export default ModuleGridItem;
