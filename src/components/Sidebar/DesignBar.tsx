// import React from "react";
// import { FaPlus } from "react-icons/fa";
// import { IoGridOutline, IoMenuSharp } from "react-icons/io5";

// const modules = [
//   {
//     id: "1",
//     name: "Annex",
//     image: "/color.jpg",
//     model: "/models/Annex_tag.glb",
//   },
//   {
//     id: "2",
//     name: "Dwelling",
//     image: "/logo.png",
//     model: "/models/Dwelling_tag.glb",
//   },
//   {
//     id: "3",
//     name: "Lifestyle",
//     image: "/height.jpg",
//     model: "/models/Lifestyle_tag.glb",
//   },
//   {
//     id: "4",
//     name: "Annex",
//     image: "/color.jpg",
//     model: "/models/Annex_tag.glb",
//   },
//   {
//     id: "5",
//     name: "Dwelling",
//     image: "/logo.png",
//     model: "/models/Dwelling_tag.glb",
//   },
//   {
//     id: "6",
//     name: "Lifestyle",
//     image: "/height.jpg",
//     model: "/models/Lifestyle_tag.glb",
//   },
//   {
//     id: "7",
//     name: "Annex",
//     image: "/color.jpg",
//     model: "/models/Annex_tag.glb",
//   },
//   {
//     id: "8",
//     name: "Dwelling",
//     image: "/logo.png",
//     model: "/models/Dwelling_tag.glb",
//   },
//   {
//     id: "9",
//     name: "Lifestyle",
//     image: "/height.jpg",
//     model: "/models/Lifestyle_tag.glb",
//   },
// ];

// const DesignBar: React.FC = () => {
//   const handleDragStart = (event: React.DragEvent, modelPath: string) => {
//     event.dataTransfer.setData("modelPath", modelPath);
//     event.dataTransfer.effectAllowed = "copy";
//   };

//   return (
//     <>
//       <div className="text-xl font-bold flex justify-between px-3 py-2">
//         <div>Design</div>
//         <div className="flex gap-3 items-center">
//           <div>
//             <IoGridOutline />
//           </div>
//           <div>
//             <IoMenuSharp />
//           </div>
//         </div>
//       </div>
//       <div className="mb-3 border-b border-gray-300"></div>
//       <div className="h-[67vh] p-4 overflow-y-scroll custom-scrollbar">
//         <div className=" ">
//           {modules.map((module) => (
//             <div
//               key={module.id}
//               draggable
//               onDragStart={(e) => handleDragStart(e, module.model)}
//               className="border rounded bg-white shadow cursor-pointer mb-4"
//             >
//               <img
//                 src={module.image}
//                 alt={module.name}
//                 className="w-full h-[200px] object-cover rounded"
//               />
//               <p className="text-center mt-2 font-medium">{module.name}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className=" flex justify-between mb-3 border-t border-gray-300 items-center p-3 ">
//         <div className="font-semibold">Add Module</div>
//         <div>
//           <FaPlus size={20} />
//         </div>
//       </div>
//     </>
//   );
// };

// export default DesignBar;

import React, { useState } from "react";
import { IoGridOutline, IoMenuSharp } from "react-icons/io5";
import GridView from "./GridView";
import ListView from "./ListView";

const modules = [
  { id: "1", name: "AnnexM", image: "/color.jpg", model: "/models/Annex_tag.glb" },
  { id: "2", name: "Dwelling-1", image: "/logo.png", model: "/models/Dwelling_tag.glb" },
  { id: "3", name: "Lifestyle-1", image: "/height.jpg", model: "/models/Lifestyle_tag.glb" },
  { id: "4", name: "AnnexM", image: "/color.jpg", model: "/models/Annex_tag.glb" },
  { id: "5", name: "Dwelling-1", image: "/logo.png", model: "/models/Dwelling_tag.glb" },
  { id: "6", name: "Lifestyle-1", image: "/height.jpg", model: "/models/Lifestyle_tag.glb" },
  { id: "7", name: "AnnexM", image: "/color.jpg", model: "/models/Annex_tag.glb" },
  { id: "8", name: "Dwelling-1", image: "/logo.png", model: "/models/Dwelling_tag.glb" },
  { id: "9", name: "Lifestyle-1", image: "/height.jpg", model: "/models/Lifestyle_tag.glb" },
];

const DesignBar: React.FC = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleDragStart = (event: React.DragEvent, modelPath: string) => {
    event.dataTransfer.setData("modelPath", modelPath);
    event.dataTransfer.effectAllowed = "copy";
  };

  return (
    <div className="bg-[#FAFAFF]">
      {/* Header */}
      <div className="text-xl font-bold flex justify-between px-3 py-2">
        <div>Design</div>
        <div className="flex gap-3 items-center">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded ${viewMode === "grid" ? "bg-gray-200" : ""}`}
          >
            <IoGridOutline size={20} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded ${viewMode === "list" ? "bg-gray-200" : ""}`}
          >
            <IoMenuSharp size={20} />
          </button>
        </div>
      </div>

      <div className="mb-3 border-b border-gray-300"></div>

      <div className="h-[81vh]  overflow-y-scroll custom-scrollbar">
      {/* View Mode Toggle */}
      {viewMode === "grid" ? (
        <div className="h-[81vh]  overflow-y-scroll custom-scrollbar">
        <GridView modules={modules} onDragStart={handleDragStart} />
        </div>
      ) : (
        <div className="h-[81vh]  overflow-y-scroll custom-scrollbar">
        <ListView modules={modules} onDragStart={handleDragStart} />
        </div>
      )}
      </div>

      
    </div>
  );
};

export default DesignBar;
