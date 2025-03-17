import React from "react";
import { createPortal } from "react-dom";
import { HiDotsVertical } from "react-icons/hi";
import { useDropdown } from "../../hooks/useDropdown";

interface ModuleDropdownProps {
  icon: React.ReactNode;
  offsetX?: number;
  offsetY?: number;
}

const ModuleDropdown: React.FC<ModuleDropdownProps> = ({
  icon,
  offsetX = 8,
  offsetY = 0,
}) => {
  const { dropdown, openDropdown, closeDropdown, dropdownRef } = useDropdown();

  return (
    <>
      <button
        onClick={(e) =>
          openDropdown(e, [
            { label: "Duplicate", shortcut: "Ctrl+D", onClick: () => console.log("Duplicate") },
            { label: "Delete", shortcut: "Delete", onClick: () => console.log("Delete") },
            { label: "Lock", shortcut: "Ctrl+Alt+L", onClick: () => console.log("Lock") },
          ])
        }
        className={`p-2 rounded transition-colors ${
          icon?.type === HiDotsVertical ? "hover:bg-white" : "hover:bg-gray-200"
        }`}
      >
        {icon}
      </button>

      {dropdown &&
        createPortal(
          <div
            ref={dropdownRef}
            className="absolute z-50 w-56 bg-white border border-gray-300 rounded shadow-lg"
            style={{
              top: dropdown.y + offsetY,
              left: dropdown.x + offsetX,
              position: "absolute",
            }}
          >
            <div className="p-2 font-semibold text-gray-700">
              View Module Details
            </div>
            <div className="border-t border-gray-200"></div>

            <div className="p-2 space-y-1">
              {dropdown.options.map((option, index) => (
                <DropdownItem
                  key={index}
                  label={option.label}
                  shortcut={option.shortcut}
                  onClick={() => {
                    option.onClick();
                    closeDropdown();
                  }}
                />
              ))}
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

const DropdownItem: React.FC<{ label: string; shortcut?: string; onClick: () => void }> = ({
  label,
  shortcut,
  onClick,
}) => (
  <div
    onClick={onClick}
    className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-gray-100 rounded"
  >
    <span>{label}</span>
    {shortcut && (
      <span className="text-xs bg-gray-200 px-2 py-1 rounded">{shortcut}</span>
    )}
  </div>
);

export default ModuleDropdown;
