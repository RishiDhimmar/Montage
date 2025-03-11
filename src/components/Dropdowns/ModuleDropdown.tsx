import { HiDotsHorizontal } from "react-icons/hi";
import { CustomDropdown } from "./CustomDropdown";

export function ModuleDropdown() {
    return (
      <CustomDropdown
        icon = {<HiDotsHorizontal />}
        options={[
          { label: "View Module Details", onClick: () => console.log("View Module Details") },
          { label: "Duplicate", shortcut: "Ctrl+D", onClick: () => console.log("Duplicate") },
          { label: "Delete", shortcut: "Delete", onClick: () => console.log("Delete") },
          { label: "Lock", shortcut: "Ctrl+Alt+L", onClick: () => console.log("Lock") },
        ]}
      />
    );
  }
  