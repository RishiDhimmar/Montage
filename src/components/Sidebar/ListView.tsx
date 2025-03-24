import React from "react";
import ModuleList from "./ModuleList";
import AddModuleButtonList from "./AddModuleButtonList";
export interface Module {
  id: string | number;
  name: string;
  model: string;
}

interface ListViewProps {
  modules: Module[];
  onDragStart: (event: React.DragEvent, modelPath: string) => void;
}

const ListView: React.FC<ListViewProps> = ({ modules, onDragStart }) => {
  return (
    <div>
      <ModuleList
        modules={modules}
        onDragStart={onDragStart}
      />
      <AddModuleButtonList />
    </div>
  );
};

export default ListView;