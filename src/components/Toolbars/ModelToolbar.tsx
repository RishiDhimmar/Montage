import React, { useState } from "react";
import { HiDotsHorizontal, HiSwitchHorizontal } from "react-icons/hi";
import { MdDelete, MdFlipToBack, MdHome, MdOutlineFlip } from "react-icons/md";

const ModelToolbar = () => {
  const [selectedTool, setSelectedTool] = useState<string>("Switch");

  const handleSelect = (tool: string) => {
    setSelectedTool(tool);
    console.log(`Selected Tool: ${tool}`);
  };
  return (
    <div className="absolute top-5 left-1/4 bg-white shadow-md rounded flex gap-3 p-2 z-10">
      <div
        onClick={() => handleSelect("Home")}
        className={`p-2 rounded ${
          selectedTool === "Home" ? "bg-gray-300" : "hover:bg-gray-200"
        }`}
      >
        <MdHome />
      </div>
      <div
      onClick={() => handleSelect("Switch")}
        className={`p-2 bg-gray-100 rounded ${
          selectedTool === "Switch" ? "bg-gray-300" : "hover:bg-gray-200"
        } disabled:cursor-not-allowed`}
        
      >
        <HiSwitchHorizontal />
      </div>
      <div
        onClick={() => handleSelect("VerticalMirror")}
        className={`p-2 rounded ${
          selectedTool === "VerticalMirror" ? "bg-gray-300" : "hover:bg-gray-200"
        }`}
      >
        <MdOutlineFlip />
      </div>
      <div
        onClick={() => handleSelect("HorizontalMirror")}
        className={`p-2 rounded ${
          selectedTool === "HorizontalMirror" ? "bg-gray-300" : "hover:bg-gray-200"
        }`}
      >
        <MdFlipToBack />
      </div>
      <div
        onClick={() => handleSelect("Delete")}
        className={`p-2 rounded ${
          selectedTool === "Delete" ? "bg-gray-300" : "hover:bg-gray-200"
        }`}
      >
        <MdDelete />
      </div>
      <div
        onClick={() => handleSelect("Menu")}
        className={`p-2 rounded ${
          selectedTool === "Menu" ? "bg-gray-300" : "hover:bg-gray-200"
        }`}
      >
        <HiDotsHorizontal />
      </div>
    </div>
  );
};

export default ModelToolbar;
