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
    <div className="p-4 bg-[#FAFAFF]">
      <div className="text-xl font-bold mb-3">Modules</div>
      <div className="mb-3 border-b border-gray-300"></div>
      <div className="mb-3">
        <SearchBar />
      </div>
      <div className="mb-2 border-b border-gray-300"></div>

      <div className="flex justify-between mb-2 border-gray-300 rounded items-center h-[7vh] px-7">
        <div className={`border rounded w-[80px] ${moduleStore.selectedCategory === "Annex" ? "bg-gray-300" : "hover:bg-gray-200"}`}>
          <Button label="Annex" onClick={() => moduleStore.setSelectedCategory("Annex")} variant="tertiary" />
        </div>
        <div className={`border rounded w-[80px] ${moduleStore.selectedCategory === "Dwelling" ? "bg-gray-300" : "hover:bg-gray-200"}`}>
          <Button label="Dwelling" onClick={() => moduleStore.setSelectedCategory("Dwelling")} variant="tertiary" />
        </div>
        <div className={`border rounded w-[80px] ${moduleStore.selectedCategory === "Lifestyle" ? "bg-gray-300" : "hover:bg-gray-200"}`}>
          <Button label="Lifestyle" onClick={() => moduleStore.setSelectedCategory("Lifestyle")} variant="tertiary" />
        </div>
      </div>

      <div className="mb-2 border-b border-gray-300"></div>

      <div className="h-[60vh] p-4 overflow-y-scroll custom-scrollbar">
        {moduleStore.loading && <p>Loading modules...</p>}
        {moduleStore.error && <p className="text-red-500">{moduleStore.error}</p>}

        <div>
          {moduleStore.filteredModules.length === 0 ? (
            <p>No modules found for selected category.</p>
          ) : (
            moduleStore.filteredModules.map((module) => (
              <ModuleBarThumbnails key={module.id} module={module} />
            ))
          )}
        </div>
      </div>
    </div>
  );
});

export default ModuleBar;

