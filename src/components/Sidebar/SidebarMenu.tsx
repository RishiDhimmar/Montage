import React from "react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { TbRectangleVertical, TbRectangleVerticalFilled } from "react-icons/tb";
import { MdOutlineViewModule, MdViewModule } from "react-icons/md";
import SidebarButton from "./SidebarButton";
import designStore from "../../stores/DesignStore";
import { observer } from "mobx-react-lite";

const SidebarMenu: React.FC = observer(() => {
  const options = [
    { id: "Design", icon: TbRectangleVertical, filledIcon: TbRectangleVerticalFilled, label: "Design" },
    { id: "Modules", icon: MdOutlineViewModule, filledIcon: MdViewModule, label: "Modules" },
    { id: "Bookmarks", icon: FaRegBookmark, filledIcon: FaBookmark, label: "Bookmarks" },
  ];

  return (
    <div className="w-[80px] h-[calc(100vh-64px)] border-r border-gray-300 flex flex-col items-center py-4 bg-[#FAFAFF]">
      {options.map(({ id, icon, filledIcon, label }) => (
        <SidebarButton
          key={id}
          id={id}
          label={label}
          icon={icon}
          filledIcon={filledIcon}
          isActive={designStore.selectedStyle === id}
          onClick={() => designStore.setSelectedStyle(id)}
        />
      ))}
    </div>
  );
});

export default SidebarMenu;
