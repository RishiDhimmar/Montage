import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { HiDotsVertical } from "react-icons/hi";

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
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top + window.scrollY + offsetY,
        left: rect.right + window.scrollX + offsetX,
      });
    }
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className={`p-2 rounded transition-colors ${
          icon?.type === HiDotsVertical ? "hover:bg-white" : "hover:bg-gray-200"
        }`}
      >
        {icon}
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            className="absolute z-50 w-56 bg-white border border-gray-300 rounded shadow-lg"
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
              position: "absolute",
            }}
          >
            <div className="p-2 font-semibold text-gray-700">
              View Module Details
            </div>
            <div className="border-t border-gray-200"></div>

            <div className="p-2 space-y-1">
              <DropdownItem label="Duplicate" shortcut="Ctrl+D" />
              <DropdownItem label="Delete" shortcut="Delete" />
              <DropdownItem label="Lock" shortcut="Ctrl+Alt+L" />
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

const DropdownItem: React.FC<{ label: string; shortcut?: string }> = ({
  label,
  shortcut,
}) => (
  <div className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-gray-100 rounded">
    <span>{label}</span>
    {shortcut && (
      <span className="text-xs bg-gray-200 px-2 py-1 rounded">{shortcut}</span>
    )}
  </div>
);

export default ModuleDropdown;
