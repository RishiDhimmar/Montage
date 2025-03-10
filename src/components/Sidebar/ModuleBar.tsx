import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import moduleStore from "../../stores/ModuleStore";
import Button from "../UiComponent/Button";
import SearchBar from "./SearchBar";

const ModuleBar: React.FC = observer(() => {
  useEffect(() => {
    moduleStore.fetchModules();
  }, []);

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, modelPath: string) => {
    event.dataTransfer.setData("modelPath", modelPath);
    event.dataTransfer.effectAllowed = "copy";
  };

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
            <div
              key={module.id}
              draggable
              onDragStart={(e) => handleDragStart(e, module.model)}
              className="border rounded bg-white shadow cursor-pointer mb-4"
            >
              <img
                src={module.image}
                alt={module.name}
                className=" h-[200px] object-cover rounded "
              />
              <div className="text-sm mt-2 px-2 font-medium">{module.name}</div>
              <div className="flex justify-between text-sm px-2">
              <div className="text-center text-gray-600">${module.price}</div>
              <div className="text-center text-gray-600">{module.noOfBathRooms} Bathroom</div>
              <div className="text-center text-gray-600">{module.noOfBedRooms} Bedroom</div>
              <div className="text-center text-gray-600">{module.size} sqft</div>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default ModuleBar;

