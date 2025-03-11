import React from "react";
import { FaCirclePlus } from "react-icons/fa6";
import designStore from "../../stores/DesignStore";

interface Module {
  id: string;
  name: string;
  image: string;
  model: string;
}

interface GridViewProps {
  modules: Module[];
  onDragStart: (event: React.DragEvent, modelPath: string) => void;
}

const GridView: React.FC<GridViewProps> = ({ modules, onDragStart }) => {
  return (
    <div className="grid grid-cols-1 gap-4 px-[24px] overflow-y-auto custom-scrollbar">
      {modules.map((module) => (
        <div
          key={module.id}
          draggable
          onDragStart={(e) => onDragStart(e, module.model)}
          className="border rounded bg-white shadow cursor-pointer p-5 "
        >
          <img
            src={module.image}
            alt={module.name}
            className="w-full h-[150px] object-cover rounded"
          />
          <div className="flex justify-between px-2 h-[30px]">
            <div className="text-center text-sm">{module.name}</div>
            <div className="text-center text-sm">{module.id}</div>
          </div>
        </div>
      ))}
      <div
        className="h-[210px] border border-gray-300 rounded items-center flex justify-center text-gray-500 hover:border-black hover:text-black transition duration-200 cursor-pointer"
        onClick={() => designStore.setSelectedStyle("Modules")}
      >
          <FaCirclePlus size={30} className="" />
      </div>
    </div>
  );
};

export default GridView;
