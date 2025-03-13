import React from "react";
import { HiDotsVertical } from "react-icons/hi";
import ModuleDropdown from "../Dropdowns/ModuleDropdown";

interface Module {
  id: string;
  name: string;
  model: string;
}

interface ModuleItemProps {
  module: Module;
  onDragStart: (event: React.DragEvent, modelPath: string) => void;
  hoveredModule: string | null;
  setHoveredModule: (id: string | null) => void;
  selectedModule: string | null;
  setSelectedModule: (id: string) => void;
}

const ModuleListItem: React.FC<ModuleItemProps> = ({
  module,
  onDragStart,
  hoveredModule,
  setHoveredModule,
  selectedModule,
  setSelectedModule,
}) => {
  const isHovered = hoveredModule === module.id;
  const isSelected = selectedModule === module.id;

  return (
    <div
      key={module.id}
      draggable
      onDragStart={(e) => onDragStart(e, module.model)}
      onMouseEnter={() => setHoveredModule(module.id)}
      onMouseLeave={() => setHoveredModule(null)}
      onClick={() => setSelectedModule(module.id)}
      className={`flex items-center gap-4 justify-between rounded mb-2 cursor-pointer px-2 transition-colors 
          ${
            isSelected
              ? "bg-gray-200 border border-gray-400"
              : isHovered
              ? "bg-white"
              : "hover:bg-white"
          }`}
    >
      <div className="flex gap-2 items-center">
        <div className="bg-[#001833] text-white flex items-center justify-between w-20 h-10 rounded-md px-2 my-1 font-bold">
          <div className="gap-2">{module.name.charAt(0)}</div>
          <div>{module.id}</div>
        </div>
        <div>
          <p className="font-semibold">{module.name}</p>
        </div>
      </div>

      <div className={`relative ${isHovered ? "opacity-100" : "opacity-0"} transition-opacity duration-200`}>
        <ModuleDropdown icon={<HiDotsVertical size={20} />} />
      </div>
    </div>
  );
};

export default ModuleListItem;
