import  { useState } from "react";
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


