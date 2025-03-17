import React from "react";
import designStore from "../../stores/DesignStore";
import { FaCirclePlus } from "react-icons/fa6";

const AddModuleButtonGrid: React.FC = () => {
  return (
    <div
         className="h-[210px] bg-white border border-gray-300 rounded flex items-center justify-center text-gray-500 hover:border-black hover:text-black transition duration-200 cursor-pointer"
         onClick={() => designStore.setSelectedStyle("Modules")}
       >
         <FaCirclePlus size={30} />
       </div>
  );
};

export default AddModuleButtonGrid;
