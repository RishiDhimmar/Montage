import { HiDotsHorizontal } from "react-icons/hi";
import { CustomDropdown } from "./CustomDropdown";
import { IoDuplicateOutline } from "react-icons/io5";
import { MdDeleteOutline, MdLockOutline } from "react-icons/md";

export function ModuleDropdown() {
  return (
    <div className="relative group">
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <CustomDropdown
          icon={<HiDotsHorizontal />}
          options={[
            { label: "View Module Details", onClick: () => console.log("View Module Details") },
            { icon: <IoDuplicateOutline />, label: "Duplicate", shortcut: "Ctrl+D", onClick: () => console.log("Duplicate") },
            { icon: <MdDeleteOutline />, label: "Delete", shortcut: "Delete", onClick: () => console.log("Delete") },
            { icon: <MdLockOutline />, label: "Lock", shortcut: "Ctrl+Alt+L", onClick: () => console.log("Lock") },
          ]}
        />
      </div>
    </div>
  );
}

// import { useState } from "react";
// import { HiDotsHorizontal } from "react-icons/hi";
// import { CustomDropdown } from "./CustomDropdown";
// import { IoDuplicateOutline } from "react-icons/io5";
// import { MdDeleteOutline, MdLockOutline } from "react-icons/md";

// export function ModuleDropdown() {
//   const [dropdown, setDropdown] = useState<{ top: number; left: number } | null>(null);

//   const options = [
//     { label: "View Module Details", onClick: () => console.log("View Module Details") },
//     { icon: <IoDuplicateOutline />, label: "Duplicate", shortcut: "Ctrl+D", onClick: () => console.log("Duplicate") },
//     { icon: <MdDeleteOutline />, label: "Delete", shortcut: "Delete", onClick: () => console.log("Delete") },
//     { icon: <MdLockOutline />, label: "Lock", shortcut: "Ctrl+Alt+L", onClick: () => console.log("Lock") },
//   ];

//   const handleIconClick = (event: React.MouseEvent) => {
//     const rect = event.currentTarget.getBoundingClientRect();
//     setDropdown({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
//   };

//   return (
//     <div className="relative group">
//       {/* Dots Icon - Only Visible on Hover */}
//       <button
//         onClick={handleIconClick}
//         className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
//       >
//         <HiDotsHorizontal />
//       </button>

//       {/* Render Dropdown Only When Open */}
//       {dropdown && <CustomDropdown options={options} position={dropdown} onClose={() => setDropdown(null)} />}
//     </div>
//   );
// }
 