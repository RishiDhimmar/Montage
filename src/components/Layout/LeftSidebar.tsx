import React from "react";
import { observer } from "mobx-react-lite";
import designStore from "../../stores/DesignStore";
import SidebarMenu from "../Sidebar/SidebarMenu";
import DesignBar from "../Sidebar/DesignBar";
import ModuleBar from "../Sidebar/ModuleBar";
import BookmarksBar from "../Sidebar/BookmarksBar";

const LeftSidebar: React.FC = observer(() => {
  return (
    <div className="w-[440px] flex border-r border-gray-300 h-[calc(100vh-64px)] bg-[#FAFAFF]">
      {/* Sidebar Buttons */}
      <SidebarMenu />

      {/* Dynamic Content Based on Selection */}
      <div className="space-y-4  flex-1 ">
        {designStore.selectedStyle === "Design" && <DesignBar />}
        {designStore.selectedStyle === "Modules" && <ModuleBar />}
        {designStore.selectedStyle === "Bookmarks" && <BookmarksBar />}
      </div>
    </div>
  );
});

export default LeftSidebar;
