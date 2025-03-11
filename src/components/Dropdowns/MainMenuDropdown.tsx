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
  