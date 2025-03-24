import  { useState } from "react";
import { FaVectorSquare, FaLock, FaImage, FaLayerGroup, FaCube } from "react-icons/fa"; 
import modelStore from "../../stores/ModelStore";
import { observer } from "mobx-react-lite";

const CanvasToolbar: React.FC = observer(() => {
  const [selectedTool, setSelectedTool] = useState<string>("2D");

  const handleSelect = (tool: string) => {
    setSelectedTool(tool);
    console.log(`Selected Tool: ${tool}`);
  };

  return (
    <div className="absolute top-4 right-1/4 bg-white shadow-md rounded flex gap-3 p-2 z-10">
      {/* 2D Mode Button */}
      <button
        onClick={() => {
          modelStore.is3d = false;
          handleSelect("2D");
        }}
        className={`p-2 rounded ${selectedTool === "2D" ? "bg-gray-300" : "hover:bg-gray-200"}`}
      >
        <FaVectorSquare size={20} />
      </button>

      {/* Layer Controls Button */}
      <button
        onClick={() => handleSelect("layers")}
        className={`p-2 rounded ${selectedTool === "layers" ? "bg-gray-300" : "hover:bg-gray-200"}`}
      >
        <FaLayerGroup size={20} />
      </button>

      {/* Lock Elements Button */}
      <button
        onClick={() => handleSelect("lock")}
        className={`p-2 rounded ${selectedTool === "lock" ? "bg-gray-300" : "hover:bg-gray-200"}`}
      >
        <FaLock size={20} />
      </button>

      {/* 3D Mode Button */}
      <button
        onClick={() => {
          modelStore.is3d = true;
          handleSelect("3D");
        }}
        className={`p-2 rounded ${selectedTool === "3D" ? "bg-gray-300" : "hover:bg-gray-200"}`}
      >
        <FaCube size={20} />
      </button>

      {/* Add Image Button */}
      <button
        onClick={() => handleSelect("image")}
        className={`p-2 rounded ${selectedTool === "image" ? "bg-gray-300" : "hover:bg-gray-200"}`}
      >
        <FaImage size={20} />
      </button>
    </div>
  );
});

export default CanvasToolbar;
