import React, { useState } from "react";
import ModuleListItem from "./ModuleListItem";

interface Module {
  id: string;
  name: string;
  model: string;
}

interface ModuleListProps {
  modules: Module[];
  onDragStart: (event: React.DragEvent, modelPath: string) => void;
  selectedModule: string | null;
  setSelectedModule: (id: string) => void;
}

const ModuleList: React.FC<ModuleListProps> = ({
  modules,
  onDragStart,
  selectedModule,
  setSelectedModule,
}) => {
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);

  return (
    <div className="p-4 h-[73vh] overflow-y-auto custom-scrollbar">
      {modules.map((module) => (
        <ModuleListItem
          key={module.id}
          module={module}
          onDragStart={onDragStart}
          hoveredModule={hoveredModule}
          setHoveredModule={setHoveredModule}
          selectedModule={selectedModule}
          setSelectedModule={setSelectedModule}
        />
      ))}
    </div>
  );
};

export default ModuleList;
