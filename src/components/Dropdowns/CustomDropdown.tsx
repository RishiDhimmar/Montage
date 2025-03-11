import { useState, ReactNode } from "react";

interface DropdownOption {
  label?: string;
  icon?: ReactNode;
  shortcut?: string;
  onClick: () => void;
}

interface DropdownProps {
  icon: string;
  options: DropdownOption[];
}

export function CustomDropdown({ icon, options }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 "
      >
        {icon}
      </button>

      {isOpen && (
        <div className="absolute left-10 top-0 w-48 bg-[#FAFAFF] border border-gray-300 rounded shadow-lg">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => {
                option.onClick();
                setIsOpen(false);
              }}
              className="flex justify-between px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              <div className="flex gap-2">
                {option.icon}
                {option.label}
              </div>
              {option.shortcut && <span className="text-xs text-gray-500">{option.shortcut}</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
