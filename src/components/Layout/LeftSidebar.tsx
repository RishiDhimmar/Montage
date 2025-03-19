import React from "react";
import { observer } from "mobx-react-lite";
import designStore from "../../stores/DesignStore";
import SidebarMenu from "../Sidebar/SidebarMenu";
import DesignBar from "../Sidebar/DesignBar";
import ModuleBar from "../Sidebar/ModuleBar";
import BookmarksBar from "../Sidebar/BookmarksBar";

interface LeftSidebarProps {
  isOpen: boolean;
}

const LeftSidebar: React.FC<LeftSidebarProps> = observer(({ isOpen }) => {
  return (
    <div
      className={`
        absolute top-0 bottom-0 left-0
        flex border-r border-gray-300 bg-[#FAFAFF]
        transition-all duration-300 overflow-hidden
        ${isOpen ? "w-[440px]" : "w-[80px]"}
      `}
    >
      <div className="w-[80px] flex-shrink-0">
        <SidebarMenu />
      </div>
      
      {/* Collapsible dynamic content */}
      <div className={`transition-all duration-300 flex-1 ${isOpen ? "w-[40px]" : "w-0"}`}>
        {designStore.selectedStyle === "Design" && <DesignBar />}
        {designStore.selectedStyle === "Modules" && <ModuleBar />}
        {designStore.selectedStyle === "Bookmarks" && <BookmarksBar />}
      </div>
    </div>
  );
});

export default LeftSidebar;

