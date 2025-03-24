import React from "react";
import { HiDotsVertical } from "react-icons/hi";
import ModuleDropdown from "../Dropdowns/ModuleDropdown";
import { observer } from "mobx-react-lite";
import modelStore from "../../stores/ModelStore";

interface Module {
  id: string | number;
  name?: string;
  model: string;
}

interface ModuleItemProps {
  module: Module;
  index: number;
  onDragStart: (event: React.DragEvent, modelPath: string) => void;
  hoveredModule: string | number |null;
  setHoveredModule: (id: string | number | null) => void;
}

const ModuleListItem: React.FC<ModuleItemProps> = ({
  module,
  index,
  onDragStart,
  hoveredModule,
  setHoveredModule,
}) => {
  const isSelected = modelStore.selectedModelId === Number(module.id);

  console.log("Module data in ModuleListItem:", module);

  return (
    <div
      key={module.id}
      draggable
      onDragStart={(e) => onDragStart(e, module.model)}
      onMouseEnter={() => setHoveredModule(module.id)}
      onMouseLeave={() => setHoveredModule(null)}
      onClick={() => modelStore.selectModel(Number(module.id))}
      className={`flex items-center gap-4 justify-between rounded mb-2 cursor-pointer px-2 transition-colors 
        ${
          isSelected
            ? "bg-gray-200 border border-gray-300"
            : hoveredModule === module.id
            ? "bg-white border border-gray-300"
            : "hover:bg-white"
        }`}
    >
      <div className="flex gap-2 items-center">
        <div className="bg-[#001833] text-white flex items-center justify-between w-20 h-10 rounded-md px-2 my-1 font-bold">
          <div className="gap-2">{module.name?.charAt(0) ?? "?"}</div>
          <div>{index + 1}</div>
        </div>
        <div>
          <p className="font-semibold">{module.name || "Unnamed Module"}</p>
        </div>
      </div>
      <div className={`relative ${hoveredModule === module.id ? "opacity-100" : "opacity-0"} transition-opacity duration-200`}>
        <ModuleDropdown icon={<HiDotsVertical size={20} />} />
      </div>
    </div>
  );
};

export default observer(ModuleListItem);

