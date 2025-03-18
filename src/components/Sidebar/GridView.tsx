import React from "react";
import ModuleGridItem from "./ModuleGridItem";
import AddModuleButtonGrid from "./AddModuleButtonGrid";
import { observer } from "mobx-react-lite";

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

const GridView: React.FC<GridViewProps> =observer(({ modules, onDragStart }) => {
  return (
    <div className="grid grid-cols-1 gap-4 px-[24px] overflow-y-auto custom-scrollbar">
      <div className="grid gap-4">
        {modules.map((module,index) => (
          <ModuleGridItem key={module.id} module={module} index={index} onDragStart={onDragStart} />
        ))}
      </div>
      
      <AddModuleButtonGrid />
    </div>
  );
});

export default GridView;
