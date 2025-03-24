import React from "react";

interface SidebarButtonProps {
  id: string;
  label: string;
  icon: React.ComponentType<{ size: number }>;
  filledIcon: React.ComponentType<{ size: number }>;
  isActive: boolean;
  onClick: () => void;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({
  id,
  label,
  icon: Icon,
  filledIcon: FilledIcon,
  isActive,
  onClick,
}) => {
  return (
    <>
      <button
        key={id}
        className={`flex flex-col items-center w-[50px] h-[40px] justify-center rounded-lg transition-colors ${
          isActive
            ? "bg-gray-300 text-black"
            : "text-gray-500 hover:bg-gray-200 hover:text-black"
        }`}
        onClick={onClick}
      >
        {isActive ? <FilledIcon size={20} /> : <Icon size={20} />}
      </button>
      <div className={`text-sm font-medium ${isActive ? "text-black" : "text-gray-500"}`}>
        {label}
      </div>
    </>
  );
};

export default SidebarButton;
