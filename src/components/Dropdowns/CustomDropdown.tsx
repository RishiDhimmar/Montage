// import { useState, useEffect, useRef, ReactNode } from "react";
// import ReactDOM from "react-dom";
// import Button from "../UiComponent/Button";

// interface DropdownOption {
//   label?: string;
//   icon?: ReactNode;
//   shortcut?: string;
//   onClick: () => void;
// }

// interface DropdownProps {
//   icon: ReactNode;
//   options: DropdownOption[];
// }

// export function CustomDropdown({ icon, options }: DropdownProps) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [position, setPosition] = useState({ top: 0, left: 0 });
//   const triggerRef = useRef<HTMLButtonElement>(null);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const toggleDropdown = () => {
//     setIsOpen((prev) => !prev);
//   };

//   useEffect(() => {
//     if (isOpen && triggerRef.current) {
//       const rect = triggerRef.current.getBoundingClientRect();
//       setPosition({
//         top: rect.top + window.scrollY,
//         left: rect.right + window.scrollX + 5,
//       });
//     }
//   }, [isOpen]);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node) &&
//         triggerRef.current &&
//         !triggerRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     };

//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen]);

//   return (
//     <>
//       <button ref={triggerRef} onClick={toggleDropdown} className="p-2">
//         {icon}
//       </button>

//       {isOpen &&
//         ReactDOM.createPortal(
//           <div
//             ref={dropdownRef}
//             className="absolute z-50 w-60 bg-[#FAFAFF] border border-gray-300 rounded shadow-lg"
//             style={{ top: position.top, left: position.left }}
//           >
//             {options.map((option, index) => (
//               <div
//                 key={index}
//                 onClick={() => {
//                   option.onClick();
//                   setIsOpen(false);
//                 }}
//                 className="flex justify-between items-center p-2 cursor-pointer hover:bg-gray-100 border-b border-gray-200 h-[40px]"
//               >
//               <Button label={option.label} onClick={option.onClick} icon={option.icon}/>
//               </div>
//             ))}
//           </div>,
//           document.body
//         )}
//     </>
//   );
// }


import ReactDOM from "react-dom";
import { useDropdown } from "../../hooks/useDropdown";
import Button from "../UiComponent/Button";

interface DropdownProps {
  icon: React.ReactNode;
  options: { label?: string; icon?: React.ReactNode; shortcut?: string; onClick: () => void }[];
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
                className="flex justify-between items-center  cursor-pointer hover:bg-gray-100 border-b border-gray-200 h-[40px]"
              >
                <Button label={option.label} onClick={option.onClick} icon={option.icon} variant="none" />
              </div>
            ))}
          </div>,
          document.body
        )}
    </>
  );
}
