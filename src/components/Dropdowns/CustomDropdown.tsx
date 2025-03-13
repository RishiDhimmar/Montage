import { useState, useEffect, useRef, ReactNode } from "react";
import ReactDOM from "react-dom";

interface DropdownOption {
  label?: string;
  icon?: ReactNode;
  shortcut?: string;
  onClick: () => void;
}

interface DropdownProps {
  icon: ReactNode;
  options: DropdownOption[];
}

export function CustomDropdown({ icon, options }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top + window.scrollY,
        left: rect.right + window.scrollX + 5,
      });
    }
  }, [isOpen]);

  return (
    <>
      <button ref={triggerRef} onClick={toggleDropdown} className="p-2 ">
        {icon}
      </button>

      {isOpen &&
        ReactDOM.createPortal(
          <div
            className="absolute z-50 w-46 bg-[#FAFAFF] border border-gray-300 rounded shadow-lg"
            style={{ top: position.top, left: position.left }}
          >
            {options.map((option, index) => (
              <div
                key={index}
                onClick={() => {
                  option.onClick();
                  setIsOpen(false);
                }}
                className="flex justify-between items-center p-2 cursor-pointer hover:bg-gray-100 border-b border-gray-200"
              >
                <div className="flex gap-2">
                  {option.icon}
                  {option.label}
                </div>
                {option.shortcut && <span className="text-xs  bg-gray-200 px-3 flex items-center rounded">{option.shortcut}</span>}
              </div>
            ))}
          </div>,
          document.body
        )}
    </>
  );
}
