// import React from "react";
// import { FaCirclePlus } from "react-icons/fa6";
// import designStore from "../../stores/DesignStore";
// import { HiDotsHorizontal } from "react-icons/hi";

// interface Module {
//   id: string;
//   name: string;
//   image: string;
//   model: string;
// }

// interface GridViewProps {
//   modules: Module[];
//   onDragStart: (event: React.DragEvent, modelPath: string) => void;
// }

// const GridView: React.FC<GridViewProps> = ({ modules, onDragStart }) => {
//   return (
//     <div className="grid grid-cols-1 gap-4 px-[24px] overflow-y-auto custom-scrollbar">
//       <div className="grid gap-4">
//       {modules.map((module) => (
//         <div
//           key={module.id}
//           draggable
//           onDragStart={(e) => onDragStart(e, module.model)}
//           className="border rounded bg-white shadow cursor-pointer p-4 "
//         >
          
//           <img
//             src={module.image}
//             alt={module.name}
//             className="w-full h-[150px] object-cover rounded"
//           />
//           <div className="flex justify-between px-2 h-[30px]">
//             <div className="text-center text-sm">{module.name}</div>
//             <div className="text-center text-sm">{module.id}</div>
//           </div>
          
//         </div>
//       ))}
//       </div>
//       <div
//         className="h-[210px] bg-white border border-gray-300 rounded items-center flex justify-center text-gray-500 hover:border-black hover:text-black transition duration-200 cursor-pointer"
//         onClick={() => designStore.setSelectedStyle("Modules")}
//       >
//           <FaCirclePlus size={30} className="" />
          
//       </div>
//     </div>
//   );
// };

// export default GridView;

// import React from "react";
// import { FaCirclePlus } from "react-icons/fa6";
// import designStore from "../../stores/DesignStore";
// import { ModuleDropdown } from "../Dropdowns/ModuleDropdown";

// interface Module {
//   id: string;
//   name: string;
//   image: string;
//   model: string;
// }

// interface GridViewProps {
//   modules: Module[];
//   onDragStart: (event: React.DragEvent, modelPath: string) => void;
// }

// const GridView: React.FC<GridViewProps> = ({ modules, onDragStart }) => {
//   return (
//     <div className="grid grid-cols-1 gap-4 px-[24px] overflow-y-auto custom-scrollbar">
//       <div className="grid gap-4">
//         {modules.map((module) => (
//           <div
//             key={module.id}
//             draggable
//             onDragStart={(e) => onDragStart(e, module.model)}
//             className="relative h-[210px] bg-white border border-gray-300 rounded items-center justify-center text-gray-500 hover:border-black hover:text-black transition duration-200 cursor-pointer p-5"
//           >
//             <div className="absolute top-2 right-2 cursor-pointer text-gray-900 hover:text-black transition-opacity duration-300">
//               {/* <HiDotsHorizontal size={20} /> */}
//               <ModuleDropdown/>
//             </div>
//             <div className=" flex justify-center bg-white">
//             <img
//               src={module.image}
//               alt={module.name}
//               className="w-full h-[150px] object-cover rounded"
//             />
//             </div>
//             <div className="flex justify-between px-2 h-[30px]">
//               <div className="text-center text-sm">{module.name}</div>
//               <div className="text-center text-sm">{module.id}</div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Add New Module Button */}
//       <div
//         className="h-[210px] bg-white border border-gray-300 rounded flex items-center justify-center text-gray-500 hover:border-black hover:text-black transition duration-200 cursor-pointer"
//         onClick={() => designStore.setSelectedStyle("Modules")}
//       >
//         <FaCirclePlus size={30} />
//       </div>
//     </div>
//   );
// };

// export default GridView;


import React from "react";
import { FaCirclePlus } from "react-icons/fa6";
import designStore from "../../stores/DesignStore";
import { ModuleDropdown } from "../Dropdowns/ModuleDropdown";

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
      <div className="grid gap-4">
        {modules.map((module) => (
          <div
            key={module.id}
            draggable
            onDragStart={(e) => onDragStart(e, module.model)}
            className="relative h-[210px] bg-white border border-gray-300 rounded p-5 cursor-pointer 
                       hover:border-black transition duration-200 group"
          >
            <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100  transition-opacity duration-200">
              <ModuleDropdown />
            </div>

            {/* Image */}
            <div className="flex justify-center bg-white">
              <img
                src={module.image}
                alt={module.name}
                className="w-[full] h-[150px] object-cover rounded"
              />
            </div>

            {/* Name & ID */}
            <div className="flex justify-between px-2 h-[30px]">
              <div className="text-center text-sm">{module.name}</div>
              <div className="text-center text-sm">{module.id}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Module Button */}
      <div
        className="h-[210px] bg-white border border-gray-300 rounded flex items-center justify-center text-gray-500 
                   hover:border-black hover:text-black transition duration-200 cursor-pointer"
        onClick={() => designStore.setSelectedStyle("Modules")}
      >
        <FaCirclePlus size={30} />
      </div>
    </div>
  );
};

export default GridView;
