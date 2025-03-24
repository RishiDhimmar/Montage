


import ReactDOM from "react-dom";
import { useDropdown } from "../../hooks/useDropdown";
import Button from "../UiComponent/Button";

interface DropdownOption {
  label?: string;
  icon?: React.ReactNode;
  shortcut?: string;
  onClick: () => void;
}

interface DropdownProps {
  icon: React.ReactNode;
  options: DropdownOption[];
}

export function CustomDropdown({ icon, options }: DropdownProps) {
  const { dropdown, openDropdown, closeDropdown, dropdownRef } = useDropdown();

  return (
    <>
      <button onClick={(e) => openDropdown(e, options)} className="p-2">
        {icon}
      </button>

      {dropdown &&
        ReactDOM.createPortal(
          <div
            ref={dropdownRef}
            className="absolute z-50 w-60 bg-[#FAFAFF] border border-gray-300 rounded shadow-lg"
            style={{ top: dropdown.y, left: dropdown.x }}
          >
            {dropdown.options.map((option, index) => (
              <div
                key={index}
                onClick={() => {
                  option.onClick();
                  closeDropdown();
                }}
                className="flex justify-between items-center cursor-pointer hover:bg-gray-100 border-b border-gray-200 h-[40px] px-4"
              >
                <Button
                  label={option.label ?? ""} 
                  onClick={option.onClick}
                  icon={option.icon}
                  variant="none"
                />
              </div>
            ))}
          </div>,
          document.body
        )}
    </>
  );
}