import React from "react";
import { FaRegFolder } from "react-icons/fa6";
import Card from "./UiComponent/Card";
function LeftSidebar() {
  return (
    <div className="w-[360px] flex border-r border-gray-300 h-[calc(100vh-97px)] bg-[#FCFCFC]">
      <div className="w-[80px] border-r border-gray-300 flex flex-col">
        <div>Design</div>
        <div>Modules</div>
        <div>Bookmarks</div>
      </div>
      <div className="w-[10px]  bg-[#FCFCFC]">ujs</div>
    </div>
  );
}

export default LeftSidebar;
