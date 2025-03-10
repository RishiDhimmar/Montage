import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import moduleStore from "../../stores/ModuleStore";
import Button from "../UiComponent/Button";
import SearchBar from "./SearchBar";
import ModuleBarThumbnails from "../UiComponent/ModuleBarThumbnails";

const ModuleBar: React.FC = observer(() => {
  useEffect(() => {
    moduleStore.fetchModules();
  }, []);

  return (
    <div className="p-4">
      <div className="text-xl font-bold mb-3">Modules</div>
      <div className="mb-3 border-b border-gray-300"></div>
      <div className="mb-3">
        <SearchBar />
      </div>
      <div className="mb-2 border-b border-gray-300"></div>

      <div className="flex justify-between mb-2 border-gray-300 rounded items-center h-[7vh] px-7">
        <div className="border rounded w-[80px]">
          <Button label="Annex" onClick={() => {}} variant="none" />
        </div>
        <div className="border rounded w-[80px]">
          <Button label="Dwelling" onClick={() => {}} variant="none" />
        </div>
        <div className="border rounded w-[80px]">
          <Button label="Lifestyle" onClick={() => {}} variant="none" />
        </div>
      </div>

      <div className="mb-2 border-b border-gray-300"></div>

      <div className="h-[60vh] p-4 overflow-y-scroll custom-scrollbar">
        {moduleStore.loading && <p>Loading modules...</p>}
        {moduleStore.error && <p className="text-red-500">{moduleStore.error}</p>}

        <div>
          {moduleStore.modules.map((module) => (
           <ModuleBarThumbnails module={module}  />
          ))}
        </div>
      </div>
    </div>
  );
});

export default ModuleBar;

