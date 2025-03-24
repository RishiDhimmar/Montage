// import React from "react";
// import ModuleDropdown from "../Dropdowns/ModuleDropdown";
// import { IoEllipsisHorizontal } from "react-icons/io5";
// import { observer } from "mobx-react-lite";

// interface Module {
//   id: string;
//   name: string;
//   image: string;
//   model: string;
// }

// interface ModuleGridItemProps {
//   module: Module;
//   index: number;
//   onDragStart: (event: React.DragEvent, modelPath: string) => void;
// }

// const ModuleGridItem: React.FC<ModuleGridItemProps> = ({ module,index, onDragStart }) => {
//   return (
//     <div
//       key={module.id}
//       draggable
//       onDragStart={(e) => onDragStart(e, module.model)}
//       className="relative h-[210px] bg-white border border-gray-300 rounded  cursor-pointer 
//                  hover:border-black transition duration-200 group"
//     >
//       <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//         <ModuleDropdown icon={<IoEllipsisHorizontal size={20} />} />
//       </div>

//       <div className="flex justify-center items-center w-full h-[180px] py-2 px-8 overflow-hidden">
//         <img
//           src={module.image}
//           alt={module.name}
//           className="w-full h-full object-contain rounded"
//         />
//       </div>

//       {/* Module Info */}
//       <div className="flex justify-between px-3 mb-2 ">
//         <div className="text-center text-sm">{module.name} </div>
//         <div className="text-center text-sm">{index + 1}</div>
//       </div>
//     </div>
//   );
// };

// export default observer(ModuleGridItem);

import React from "react";
import ModuleDropdown from "../Dropdowns/ModuleDropdown";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { observer } from "mobx-react-lite";
import modelStore from "../../stores/ModelStore";

interface Module {
  id: string | number;
  name: string;
  image: string;
  model: string;
}

interface ModuleGridItemProps {
  module: Module;
  index: number;
  onDragStart: (event: React.DragEvent, modelPath: string) => void;
}

const ModuleGridItem: React.FC<ModuleGridItemProps> = ({ module, index, onDragStart }) => {
  const isSelected = modelStore.selectedModelId === Number(module.id);

  const handleClick = () => {
    modelStore.selectModel(Number(module.id));
  };

  return (
    <div
      key={module.id}
      draggable
      onDragStart={(e) => onDragStart(e, module.model)}
      onClick={handleClick}
      className={`relative h-[210px] bg-white border border-gray-300 rounded cursor-pointer 
                  hover:border-black transition duration-200 group ${isSelected ? "border-yellow-500" : ""}`}
    >
      <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <ModuleDropdown icon={<IoEllipsisHorizontal size={20} />} />
      </div>

      <div className="flex justify-center items-center w-full h-[180px] py-2 px-8 overflow-hidden">
        <img
          src={module.image}
          alt={module.name}
          className="w-full h-full object-contain rounded"
        />
      </div>

      <div className="flex justify-between px-3 mb-2">
        <div className="text-center text-sm">{module.name}</div>
        <div className="text-center text-sm">{index + 1}</div>
      </div>
    </div>
  );
};

export default observer(ModuleGridItem);


