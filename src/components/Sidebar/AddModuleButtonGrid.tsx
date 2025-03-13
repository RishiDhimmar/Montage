import React from "react";
import { FaPlus } from "react-icons/fa";
import designStore from "../../stores/designStore";

const AddModuleButtonGrid: React.FC = () => {
  return (
    <div
      className="flex justify-between border-t border-gray-300 items-center p-2 mx-2 cursor-pointer"
      onClick={() => designStore.setSelectedStyle("Modules")}
    >
      <div className="font-semibold">Add Module</div>
      <div className="hover:bg-gray-200 rounded-full p-2">
        <FaPlus size={20} />
      </div>
    </div>
  );
};

export default AddModuleButtonGrid;
