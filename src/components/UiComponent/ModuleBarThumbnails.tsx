import React from "react";
import { useDrag } from "react-dnd";

const DRAG_TYPE = "MODEL";

function ModuleBarThumbnails({ module}) {
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
      className="border rounded bg-white shadow cursor-pointer mb-4"
    >
      <img
        src={module.image}
        alt={module.name}
        className="w-full h-[200px] object-cover rounded"
      />
      <p className="text-center mt-2 font-medium">{module.name}</p>
      <p className="text-center text-gray-600">Type: {module.moduleType}</p>
      <p className="text-center text-gray-600">Size: {module.size} sqft</p>
      <p className="text-center text-gray-600 font-semibold">${module.price}</p>
    </div>
  );
}

export default ModuleBarThumbnails;
