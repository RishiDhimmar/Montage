// import { useState, ReactNode } from "react";

// interface DropdownOption {
//   label?: string;
//   icon?: ReactNode;
//   shortcut?: string;
//   onClick: () => void;
// }

// interface DropdownProps {
//   icon: string;
//   options: DropdownOption[];
// }

// export function CustomDropdown({ icon, options }: DropdownProps) {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="relative inline-block">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="p-2 "
//       >
//         {icon}
//       </button>

//       {isOpen && (
//         <div className="absolute z-50  top-0 w-48 bg-[#FAFAFF] border border-gray-300 rounded shadow-lg">
//           {options.map((option, index) => (
//             <div
//               key={index}
//               onClick={() => {
//                 option.onClick();
//                 setIsOpen(false);
//               }}
//               className="flex justify-between px-4 py-2 cursor-pointer hover:bg-gray-100"
//             >
//               <div className="flex gap-2">
//                 {option.icon}
//                 {option.label}
//               </div>
//               {option.shortcut && <span className="text-xs text-gray-500">{option.shortcut}</span>}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


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
      <button ref={triggerRef} onClick={toggleDropdown} >
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


// import { useState, useEffect, useRef, ReactNode } from "react";
// import ReactDOM from "react-dom";

// interface DropdownOption {
//   label?: string;
//   icon?: ReactNode;
//   shortcut?: string;
//   onClick: () => void;
// }

// interface DropdownProps {
//   options: DropdownOption[];
//   position: { top: number; left: number } | null;
//   onClose: () => void;
// }

// export function CustomDropdown({ options, position, onClose }: DropdownProps) {
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // Close dropdown on click outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         onClose();
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [onClose]);

//   if (!position) return null;

//   return ReactDOM.createPortal(
//     <div
//       ref={dropdownRef}
//       className="absolute z-50 w-48 bg-[#FAFAFF] border border-gray-300 rounded shadow-lg"
//       style={{ top: position.top, left: position.left }}
//     >
//       {options.map((option, index) => (
//         <div
//           key={index}
//           onClick={() => {
//             option.onClick();
//             onClose();
//           }}
//           className="flex justify-between px-4 py-2 cursor-pointer hover:bg-gray-100 border-b border-gray-200"
//         >
//           <div className="flex gap-2">
//             {option.icon}
//             {option.label}
//           </div>
//           {option.shortcut && <span className="text-xs bg-gray-200 px-3 flex items-center rounded">{option.shortcut}</span>}
//         </div>
//       ))}
//     </div>,
//     document.body
//   );
// }
