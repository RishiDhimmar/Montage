import { IoIosMenu } from "react-icons/io";
import { CustomDropdown } from "./CustomDropdown";

export function MainMenuDropdown() {
    return (
      <CustomDropdown
        icon={<IoIosMenu size={20}/>}
        options={[
          { label: "Save", onClick: () => console.log("Save") },
          { label: "New Design", onClick: () => console.log("New Design") },
          { label: "View Summary", onClick: () => console.log("View Summary") },
          { label: "Make a copy", onClick: () => console.log("Make a copy") },
          { label: "Move to", onClick: () => console.log("Move to") },
          { label: "Save As Template", onClick: () => console.log("Save As Template") },
          { label: "Rename", onClick: () => console.log("Rename") },
          { label: "Delete", onClick: () => console.log("Delete") },
        ]}
      />
    );
  }

// import { useDropdown } from "../../hooks/useDropdown";
// import { CustomDropdown } from "./CustomDropdown";

// export function MainMenuDropdown() {
//   const { dropdown, options, openDropdown, closeDropdown } = useDropdown();

//   const menuOptions = [
//     { label: "Save", onClick: () => console.log("Save") },
//     { label: "New Design", onClick: () => console.log("New Design") },
//     { label: "View Summary", onClick: () => console.log("View Summary") },
//     { label: "Make a copy", onClick: () => console.log("Make a copy") },
//     { label: "Move to", onClick: () => console.log("Move to") },
//     { label: "Save As Template", onClick: () => console.log("Save As Template") },
//     { label: "Rename", onClick: () => console.log("Rename") },
//     { label: "Delete", onClick: () => console.log("Delete") },
//   ];

//   // Expose this function so that any component can open this dropdown
//   const openMenuDropdown = (event: React.MouseEvent) => {
//     openDropdown(event, menuOptions);
//   };

//   return (
//     <>
//       {/* Dropdown appears dynamically */}
//       {dropdown && <CustomDropdown options={options} position={dropdown} onClose={closeDropdown} />}
//     </>
//   );
// }

// // Export the function so that other components can use it
// export const openMenuDropdown = (event: React.MouseEvent) => {
//   const dropdownInstance = new MainMenuDropdown();
//   dropdownInstance.openDropdown(event);
// };


// // import { useDropdown } from "../../hooks/useDropdown";
// // import { CustomDropdown } from "./CustomDropdown";

// // export function MainMenuDropdown() {
// //   const { dropdown, closeDropdown } = useDropdown();

// //   return (
// //     <>
// //       {/* Dropdown appears when triggered */}
// //       {dropdown && (
// //         <CustomDropdown
// //           options={dropdown.options}
// //           position={{ top: dropdown.y, left: dropdown.x }}
// //           onClose={closeDropdown}
// //         />
// //       )}
// //     </>
// //   );
// // }
