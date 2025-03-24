

// import React, { useState } from "react";
// import { observer } from "mobx-react-lite";
// import modelStore from "../../stores/ModelStore";
// import GridView from "./GridView";
// import ListView from "./ListView";
// import ViewModeToggle from "./ViewModeToggle";

// const DesignBar: React.FC = observer(() => {
//   const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

//   const handleDragStart = (event: React.DragEvent, modelPath: string) => {
//     event.dataTransfer.setData("modelPath", modelPath);
//     event.dataTransfer.effectAllowed = "copy";
//   };

//   return (
//     <div className="">
//       <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
//       <div className="mb-3 border-b border-gray-300"></div>
//       <div className="h-[81vh] overflow-y-scroll custom-scrollbar">
//         {viewMode === "grid" ? (
//           <GridView modules={modelStore.models} onDragStart={handleDragStart} />
//         ) : (
//           <ListView modules={modelStore.models} onDragStart={handleDragStart} />
//         )}
//       </div>
//     </div>
//   );
// });

// export default DesignBar;// src/components/Sidebar/DesignBar.tsx

import  { useState } from "react";

import { observer } from "mobx-react-lite";
import modelStore from "../../stores/ModelStore";
import GridView from "./GridView";
import ListView from "./ListView";
import ViewModeToggle from "./ViewModeToggle";

export interface Module {
  id: string | number;
  name: string;
  image: string;
  model: string; // Changed from 'model' to match actual data structure
}

const DesignBar: React.FC = observer(() => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleDragStart = (event: React.DragEvent, modelPath: string) => {
    event.dataTransfer.setData("modelPath", modelPath);
    event.dataTransfer.effectAllowed = "copy";
  };

  // Map store models to Module interface
  const mappedModules: Module[] = modelStore.models.map(model => ({
    id: model.id,
    name: model.name,
    image: model.image,
    model: model.modelPath // Ensure this matches your actual Model structure
  }));

  return (
    <div className="">
      <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
      <div className="mb-3 border-b border-gray-300"></div>
      <div className="h-[81vh] overflow-y-scroll custom-scrollbar">
        {viewMode === "grid" ? (
          <GridView modules={mappedModules} onDragStart={handleDragStart} />
        ) : (
          <ListView modules={mappedModules} onDragStart={handleDragStart} />
        )}
      </div>
    </div>
  );
});


export default DesignBar;

