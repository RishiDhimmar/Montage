import React from "react";
import { FaPlus } from "react-icons/fa";

interface Module {
  id: string;
  name: string;
  model: string;
}

interface ListViewProps {
  modules: Module[];
  onDragStart: (event: React.DragEvent, modelPath: string) => void;
}

const ListView: React.FC<ListViewProps> = ({ modules, onDragStart }) => {
  return (
    <>
      <div className="p-4 h-[75vh] overflow-y-auto custom-scrollbar">
        {modules.map((module) => (
          <div
            key={module.id}
            draggable
            onDragStart={(e) => onDragStart(e, module.model)}
            className="flex items-center gap-4  rounded mb-2 cursor-pointer hover:bg-white"
          >
            <div className=" bg-blue-900 text-white flex items-center justify-between w-20 h-12 rounded-md p-2 font-bold">
              <div className="gap-2">{module.name.charAt(0)}</div>
              <div>{module.id}</div>
            </div>
            <div>
              <p className="font-semibold">{module.name}</p>
              <p className="text-sm text-gray-500">Module Description</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between  border-t border-gray-300 items-center p-2">
        <div className="font-semibold">Add Module</div>
        <FaPlus size={20} />
      </div>
    </>
  );
};

export default ListView;
