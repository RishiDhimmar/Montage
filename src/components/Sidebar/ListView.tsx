// // import  { useState } from "react";
// import ModuleList from "./ModuleList";
// import AddModuleButtonList from "./AddModuleButtonList";

// interface Module {
//   id: string;
//   name: string;
//   model: string;
// }

// interface ListViewProps {
//   modules: Module[];
//   onDragStart: (event: React.DragEvent, modelPath: string) => void;
// }

// const ListView: React.FC<ListViewProps> = ({ modules, onDragStart }) => {
//   // const [selectedModule, setSelectedModule] = useState<string | null>(null);

//   return (
//     <div>
//       <ModuleList
//         modules={modules}
//         onDragStart={onDragStart}
//         // selectedModule={selectedModule}
//         // setSelectedModule={setSelectedModule}
//       />
//       <AddModuleButtonList />
//     </div>
//   );
// };

// export default ListView;

// src/components/Sidebar/ListView.tsx
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