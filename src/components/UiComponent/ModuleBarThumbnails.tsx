// import React from "react";
// import { ModuleDropdown } from "../Dropdowns/ModuleDropdown";
// import { HiDotsHorizontal, HiDotsVertical } from "react-icons/hi";

// function ModuleBarThumbnails({ module }) {
//   const handleDragStart = (
//     event: React.DragEvent<HTMLDivElement>,
//     modelPath: string
//   ) => {
//     event.dataTransfer.setData("modelPath", modelPath);
//     event.dataTransfer.effectAllowed = "copy";
//   };

//   return (
//     <div
//       key={module.id}
//       draggable
//       onDragStart={(e) => handleDragStart(e, module.model)}
//       className="relative border border-gray-300 hover:border-gray-900 hover:text-gray-900 rounded bg-white shadow cursor-pointer mb-4 p-2 w-[300px] h-[315px]"
//     >
//       <div className="absolute top-0 right-0 te  transition-opacity duration-200">
//         <HiDotsVertical/>
//       </div>
//       <div className="flex justify-center items-center w-full h-[250px] overflow-hidden">
//         <img
//           src={module.image}
//           alt={module.name}
//           className="w-full h-full object-contain rounded"
//         />
//       </div>

//       <div className="text-sm mt-2 px-2 font-medium">{module.name}</div>
//       <div className="flex justify-between text-sm px-2">
//         <div className="text-center text-gray-600">${module.price}</div>
//         <div className="text-center text-gray-600">
//           {module.noOfBathRooms} Bathroom
//         </div>
//         <div className="text-center text-gray-600">
//           {module.noOfBedRooms} Bedroom
//         </div>
//         <div className="text-center text-gray-600">{module.size} sqft</div>
//       </div>
//     </div>
//   );
// }

// export default ModuleBarThumbnails;


// import React, { useState } from "react";
// import { HiDotsVertical } from "react-icons/hi";

// function ModuleBarThumbnails({ module }) {
//   const [isSelected, setIsSelected] = useState(false);

//   const handleDragStart = (
//     event: React.DragEvent<HTMLDivElement>,
//     modelPath: string
//   ) => {
//     event.dataTransfer.setData("modelPath", modelPath);
//     event.dataTransfer.effectAllowed = "copy";
//   };

//   const handleSelect = () => {
//     setIsSelected((prev) => !prev);
//   };

//   return (
//     <div
//       key={module.id}
//       draggable
//       onDragStart={(e) => handleDragStart(e, module.model)}
//       onClick={handleSelect}
//       className={`relative border ${
//         isSelected ? "border-yellow-500" : "border-gray-300"
//       } hover:border-gray-900 hover:text-gray-900 rounded bg-white shadow cursor-pointer mb-4 p-2 w-[300px] h-[315px] group transition-colors duration-200`}
//     >
//       {/* Dots (Visible on hover or when selected) */}
//       <div
//         className={`absolute top-2 right-2 ${
//           isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
//         } transition-opacity duration-200`}
//       >
//         <HiDotsVertical className="text-gray-600 hover:text-gray-900 cursor-pointer" />
//       </div>

//       <div className="flex justify-center items-center w-full h-[250px] overflow-hidden">
//         <img
//           src={module.image}
//           alt={module.name}
//           className="w-full h-full object-contain rounded"
//         />
//       </div>

//       <div className="text-sm mt-2 px-2 font-medium">{module.name}</div>
//       <div className="flex justify-between text-sm px-2">
//         <div className="text-center text-gray-600">${module.price}</div>
//         <div className="text-center text-gray-600">
//           {module.noOfBathRooms} Bathroom
//         </div>
//         <div className="text-center text-gray-600">
//           {module.noOfBedRooms} Bedroom
//         </div>
//         <div className="text-center text-gray-600">{module.size} sqft</div>
//       </div>
//     </div>
//   );
// }

// export default ModuleBarThumbnails;


import React from "react";
import { observer } from "mobx-react-lite";
import { HiDotsVertical } from "react-icons/hi";
import moduleStore from "../../stores/ModuleStore";

const ModuleBarThumbnails = observer(({ module }) => {
  const isSelected = moduleStore.selectedModule?.id === module.id;

  const handleSelect = () => {
    moduleStore.setSelectedModule(module);
  };

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    modelPath: string
  ) => {
    event.dataTransfer.setData("modelPath", modelPath);
    event.dataTransfer.effectAllowed = "copy";
  };

  return (
    <div
      key={module.id}
      draggable
      onDragStart={(e) => handleDragStart(e, module.model)}
      onClick={handleSelect}
      className={`relative border ${
        isSelected ? "border-yellow-500" : "border-gray-300"
      } hover:border-gray-900 hover:text-gray-900 rounded bg-white shadow cursor-pointer mb-4 p-2 w-[300px] h-[315px] group transition-colors duration-200`}
    >
      {/* Dots (Visible on hover or when selected) */}
      <div
        className={`absolute top-2 right-2 ${
          isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        } transition-opacity duration-200`}
      >
        <HiDotsVertical className="text-gray-600 hover:text-gray-900 cursor-pointer" />
      </div>

      <div className="flex justify-center items-center w-full h-[250px] overflow-hidden">
        <img
          src={module.image}
          alt={module.name}
          className="w-full h-full object-contain rounded"
        />
      </div>

      <div className="text-sm mt-2 px-2 font-medium">{module.name}</div>
      <div className="flex justify-between text-sm px-2">
        <div className="text-center text-gray-600">${module.price}</div>
        <div className="text-center text-gray-600">
          {module.noOfBathRooms} Bathroom
        </div>
        <div className="text-center text-gray-600">
          {module.noOfBedRooms} Bedroom
        </div>
        <div className="text-center text-gray-600">{module.size} sqft</div>
      </div>
    </div>
  );
});

export default ModuleBarThumbnails;
