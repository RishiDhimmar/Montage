import React from "react";
import { FaPlus } from "react-icons/fa";
import designStore from "../../stores/DesignStore";
import {  HiDotsVertical } from "react-icons/hi";

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
    <div>
      <div className="p-4 h-[73vh] overflow-y-auto custom-scrollbar">
        {modules.map((module) => (
          <div
            key={module.id}
            draggable
            onDragStart={(e) => onDragStart(e, module.model)}
            className="flex items-center gap-4 justify-between rounded mb-2 cursor-pointer hover:bg-white p-2"
          >
            <div className="flex gap-2 items-center">
            <div className=" bg-[#001833] text-white flex items-center justify-between w-20 h-10 rounded-md px-2 font-bold">
              <div className="gap-2">{module.name.charAt(0)}</div>
              <div>{module.id}</div>
            </div>
            <div>
              <p className="font-semibold">{module.name}</p>
              
            </div>
            </div>
            <div>
              <HiDotsVertical/>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between  border-t border-gray-300 items-center p-2 mx-2" onClick={() => designStore.setSelectedStyle("Modules")}>
        <div className="font-semibold">Add Module</div>
        <div className="hover:bg-gray-200 rounded-full p-2">
        <FaPlus size={20} />
        </div>
      </div>
      </div>
    </>
  );
};

export default ListView;
