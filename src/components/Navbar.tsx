import React from "react";
import { IoIosMenu } from "react-icons/io";
import { MainMenuDropdown} from "./Dropdowns/MainMenuDropdown";

function Navbar() {
  return (
    <div className="h-[64px] border border-gray-300 bg-[#FAFAFF] flex items-center p-4">
      <div className="flex gap-4 items-center w-full px-4">
        <div>
      <h1 className="text-xl font-bold items-center">Montage</h1>
          {/* <img src="/Montage-Logo.svg" alt="Montage" /> */}
        </div>
        <div className="px-4">
          <div className="flex items-center">
            <div className="hover:bg-gray-200 rounded p-2 ">
            {/* <IoIosMenu size={20}/> */}
            <MainMenuDropdown/>
            </div>
            <div className="flex gap-4">
              <div className="px-3 font-semibold"> Hexaa</div>
              <div className="border border-black"></div>
              <div className="px-3 font-semibold"> Untitled-1</div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-400 p-5 rounded-full w-10 h-10 items-center flex justify-center">
        H
      </div>
    </div>
  );
}

export default Navbar;


// import React from "react";
// import { IoIosMenu } from "react-icons/io";
// import { MainMenuDropdown } from "./Dropdowns/MainMenuDropdown";
// import { useDropdown } from "../hooks/useDropdown";

// function Navbar() {
//   const { openDropdown } = useDropdown();

//   const handleMenuClick = (e: React.MouseEvent) => {
//     openDropdown(e, [
//       { label: "Save", onClick: () => console.log("Save") },
//       { label: "New Design", onClick: () => console.log("New Design") },
//       { label: "View Summary", onClick: () => console.log("View Summary") },
//       { label: "Make a copy", onClick: () => console.log("Make a copy") },
//       { label: "Move to", onClick: () => console.log("Move to") },
//       { label: "Save As Template", onClick: () => console.log("Save As Template") },
//       { label: "Rename", onClick: () => console.log("Rename") },
//       { label: "Delete", onClick: () => console.log("Delete") },
//     ]);
//   };

//   return (
//     <div className="h-[64px] border border-gray-300 bg-[#FAFAFF] flex items-center p-4">
//       <div className="flex gap-4 items-center w-full px-4">
//         <h1 className="text-xl font-bold">Montage</h1>
//         <div className="px-4">
//           <div className="flex items-center">
//             {/* Click on this icon to open the dropdown */}
//             <button
//               className="hover:bg-gray-200 rounded p-2"
              
//             >
//               <IoIosMenu size={20} onClick={handleMenuClick}/>
//             </button>
//             <div className="flex gap-4">
//               <div className="px-3 font-semibold">Hexaa</div>
//               <div className="border border-black"></div>
//               <div className="px-3 font-semibold">Untitled-1</div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="bg-gray-400 p-5 rounded-full w-10 h-10 flex items-center justify-center">
//         H
//       </div>

//       {/* Dropdown Component */}
//       <MainMenuDropdown />
//     </div>
//   );
// }

// export default Navbar;
