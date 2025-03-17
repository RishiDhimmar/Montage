// import React, { useState } from "react";
// import { IoGrid, IoGridOutline} from "react-icons/io5";
// import GridView from "./GridView";
// import ListView from "./ListView";
// import { MdViewList } from "react-icons/md";
// import { View } from "@react-three/drei";
// import ViewModeToggle from "./ViewModeToggle";

// const modules = [
//   // { id: "1", name: "AnnexM", image: "/color.jpg", model: "/models/Annex_tag.glb" },
//   // { id: "2", name: "Dwelling-1", image: "/logo.png", model: "/models/Dwelling_tag.glb" },
//   // { id: "3", name: "Lifestyle-1", image: "/height.jpg", model: "/models/Lifestyle_tag.glb" },
//   // { id: "4", name: "AnnexM", image: "/color.jpg", model: "/models/Annex_tag.glb" },
//   // { id: "5", name: "Dwelling-1", image: "/logo.png", model: "/models/Dwelling_tag.glb" },
//   { id: "6", name: "Lifestyle-1", image: "/height.jpg", model: "/models/Lifestyle_tag.glb" },
//   { id: "7", name: "AnnexM", image: "/color.jpg", model: "/models/Annex_tag.glb" },
//   { id: "8", name: "Dwelling-1", image: "/logo.png", model: "/models/Dwelling_tag.glb" },
//   { id: "9", name: "Lifestyle-1", image: "/height.jpg", model: "/models/Lifestyle_tag.glb" },
// ];

// const DesignBar: React.FC = () => {
//   const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

//   const handleDragStart = (event: React.DragEvent, modelPath: string) => {
//     event.dataTransfer.setData("modelPath", modelPath);
//     event.dataTransfer.effectAllowed = "copy";
//   };

//   return (
//     <div className="">
//       <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />

//       <div className="mb-3 border-b border-gray-300"></div>

//       <div className="h-[81vh]  overflow-y-scroll custom-scrollbar">
//       {viewMode === "grid" ? (
//         <div className="h-[81vh]  overflow-y-scroll custom-scrollbar">
//         <GridView modules={modules} onDragStart={handleDragStart} />
//         </div>
//       ) : (
//         <div className="h-[81vh]  overflow-y-scroll custom-scrollbar">
//         <ListView modules={modules} onDragStart={handleDragStart} />
//         </div>
//       )}
//       </div>     
//     </div>
//   );
// };

// export default DesignBar;


import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import modelStore from "../../stores/ModelStore";
import GridView from "./GridView";
import ListView from "./ListView";
import ViewModeToggle from "./ViewModeToggle";

const DesignBar: React.FC = observer(() => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleDragStart = (event: React.DragEvent, modelPath: string) => {
    event.dataTransfer.setData("modelPath", modelPath);
    event.dataTransfer.effectAllowed = "copy";
  };

  return (
    <div className="">
      <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
      <div className="mb-3 border-b border-gray-300"></div>
      <div className="h-[81vh] overflow-y-scroll custom-scrollbar">
        {viewMode === "grid" ? (
          <GridView modules={modelStore.models} onDragStart={handleDragStart} />
        ) : (
          <ListView modules={modelStore.models} onDragStart={handleDragStart} />
        )}
      </div>
    </div>
  );
});

export default DesignBar;
