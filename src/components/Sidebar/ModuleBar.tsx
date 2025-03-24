import  { useEffect } from "react";
import { observer } from "mobx-react-lite";
import moduleStore from "../../stores/ModuleStore";
import Button from "../UiComponent/Button";
import SearchBar from "./SearchBar";
import ModuleBarThumbnails from "../UiComponent/ModuleBarThumbnails";
import Loader from "../UiComponent/Loader";

const ModuleBar: React.FC = observer(() => {
  useEffect(() => {
    moduleStore.fetchModules(); // ✅ Called only once
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
        {["Annex", "Dwelling", "Lifestyle"].map((category) => (
          <div
            key={category}
            className={`border rounded w-[80px] ${
              moduleStore.selectedCategory === category ? "bg-gray-300" : "hover:bg-gray-200"
            }`}
          >
            <Button
              label={category}
              onClick={() => moduleStore.setSelectedCategory(category)}
              variant="tertiary"
            />
          </div>
        ))}
      </div>

      <div className="mb-2 border-b border-gray-300"></div>

      <div className="h-[60vh] p-4 overflow-y-scroll custom-scrollbar">
        <Loader isLoading={moduleStore.loading} />
        {moduleStore.error && <p className="text-red-500">{moduleStore.error}</p>}

        <div>
          {moduleStore.filteredModules.length === 0 && !moduleStore.loading ? (
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
