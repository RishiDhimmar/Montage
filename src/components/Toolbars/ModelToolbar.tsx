import React, { useState } from "react";
import { HiSwitchHorizontal } from "react-icons/hi";
import { MdDelete, MdHome, MdOutlineFlip } from "react-icons/md";
import { IoEllipsisHorizontal } from "react-icons/io5";

import { LuFlipHorizontal, LuFlipVertical } from "react-icons/lu";

import modelStore from "../../stores/ModelStore";
import ModuleDropdown from "../Dropdowns/ModuleDropdown";

const ModelToolbar = () => {
  const [selectedTool, setSelectedTool] = useState<string>("Switch");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const handleSelect = (tool: string) => {
    if (tool === "Menu") {
      setIsDropdownOpen((prev) => !prev);
    } else if (tool === "Delete") {
      if (modelStore.selectedModelId !== null) {
        modelStore.removeModel(modelStore.selectedModelId);
        setSelectedTool("Switch");
      }
      setIsDropdownOpen(false);
    } else {
      setSelectedTool(tool);
      setIsDropdownOpen(false);
    }
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
        onClick={(e) => {
          e.stopPropagation();

          handleSelect("VerticalMirror");
          modelStore.flipModelVertically(modelStore.selectedModelId);
        }}
        className={`p-2 rounded ${
          selectedTool === "VerticalMirror"
            ? "bg-gray-300"
            : "hover:bg-gray-200"
        }`}
      >
        <LuFlipHorizontal />
      </div>

      <div
        onClick={(e) => {
          e.stopPropagation();
          handleSelect("HorizontalMirror");
          modelStore.flipModelHorizontally(modelStore.selectedModelId);
        }}
        className={`p-2 rounded ${
          selectedTool === "HorizontalMirror"
            ? "bg-gray-300"
            : "hover:bg-gray-200"
        }`}
      >
        <LuFlipVertical />
      </div>

      <div
        onClick={() => handleSelect("Delete")}
        className={`p-2 rounded ${
          selectedTool === "Delete" ? "bg-gray-300" : "hover:bg-gray-200"
        }`}
      >
        <MdDelete />
      </div>

      <div>
        <ModuleDropdown icon={<IoEllipsisHorizontal size={20} />} />
      </div>
    </div>
  );
};

export default ModelToolbar;
