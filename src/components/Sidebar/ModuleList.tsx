import  { useState } from "react";
import ModuleListItem from "./ModuleListItem";
import { observer } from "mobx-react-lite";

interface Module {
  id: string;
  name: string;
  model: string;
}

interface ModuleListProps {
  modules: Module[];
  onDragStart: (event: React.DragEvent, modelPath: string) => void;
}

const ModuleList: React.FC<ModuleListProps> = observer(({ modules, onDragStart }) => {
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);

  return (
    <div className="h-[73vh] overflow-y-auto custom-scrollbar">
      {modules.map((module, index) => (
        <ModuleListItem
          key={module.id}
          module={module}
          index={index}
          onDragStart={onDragStart}
          hoveredModule={hoveredModule}
          setHoveredModule={setHoveredModule}
        />
      ))}
    </div>
  );
});

export default ModuleList;

