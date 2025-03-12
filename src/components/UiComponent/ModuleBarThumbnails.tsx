import React from "react";


function ModuleBarThumbnails({ module }) {
  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    modelPath: string
  ) => {
    event.dataTransfer.setData("modelPath", modelPath);
    event.dataTransfer.effectAllowed = "copy";
  };

  return (
    <div
      key={module.id}
      draggable
      onDragStart={(e) => handleDragStart(e, module.model)}
      className="border border-gray-300 rounded bg-white shadow cursor-pointer mb-4 p-2 w-[300px] h-[315px]"
    >
      <div className="flex justify-center items-center w-full h-[250px] overflow-hidden">
        <img
          src={module.image}
          alt={module.name}
          className="w-full h-full object-contain rounded"
        />
      </div>

      <div className="text-sm mt-2 px-2 font-medium">{module.name}</div>
      <div className="flex justify-between text-sm px-2">
        <div className="text-center text-gray-600">${module.price}</div>
        <div className="text-center text-gray-600">
          {module.noOfBathRooms} Bathroom
        </div>
        <div className="text-center text-gray-600">
          {module.noOfBedRooms} Bedroom
        </div>
        <div className="text-center text-gray-600">{module.size} sqft</div>
      </div>
    </div>
  );
}

export default ModuleBarThumbnails;
