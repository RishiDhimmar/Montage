// import { IoIosMenu } from "react-icons/io";
// import { CustomDropdown } from "./CustomDropdown";
// import { RiSave2Line } from "react-icons/ri";
// import { MdChecklist, MdDelete, MdOpenInNew, MdOutlineContentCopy } from "react-icons/md";
// import { GoPencil } from "react-icons/go";
// import { FaArrowRight } from "react-icons/fa";

// export function MainMenuDropdown() {
//     return (
//       <CustomDropdown
//         icon={<IoIosMenu size={20}/>}
//         options={[
//           { label: "Save", onClick: () => console.log("Save"),icon:<RiSave2Line size={20}/> },
//           { label: "New Design", onClick: () => console.log("New Design"),icon:<MdOpenInNew size={20}/>  },
//           { label: "View Summary", onClick: () => console.log("View Summary"),icon:<MdChecklist size={20}/>  },
//           { label: "Make a copy", onClick: () => console.log("Make a copy"),icon:<MdOutlineContentCopy size={20}/>  },
//           { label: "Move to", onClick: () => console.log("Move to"),icon:<FaArrowRight size={20}/>  },
//           { label: "Save As Template", onClick: () => console.log("Save As Template"),icon:<IoIosMenu size={20}/>  },
//           { label: "Rename", onClick: () => console.log("Rename"),icon:<GoPencil size={20}/>  },
//           { label: "Delete", onClick: () => console.log("Delete"),icon:<MdDelete size={20}/>  },
//         ]}
//       />
//     );
//   }

import { IoIosMenu } from "react-icons/io";
import { CustomDropdown } from "./CustomDropdown";
import { RiSave2Line } from "react-icons/ri";
import { MdChecklist, MdDelete, MdOpenInNew, MdOutlineContentCopy } from "react-icons/md";
import { GoPencil } from "react-icons/go";
import { FaArrowRight } from "react-icons/fa";
import modelStore from "../../stores/ModelStore"; 

export function MainMenuDropdown() {
  const handleSaveDesign = () => {
    const designName = prompt("Enter a name for your design:")?.trim();
    if (designName) {
      modelStore.saveDesign(designName); // ✅ Save the design
      alert(`✅ Design "${designName}" saved successfully!`);
    }
  };

  return (
    <CustomDropdown
      icon={<IoIosMenu size={20} />}
      options={[
        { label: "Save", onClick: handleSaveDesign, icon: <RiSave2Line size={20} /> },
        { label: "New Design", onClick: () => console.log("New Design"), icon: <MdOpenInNew size={20} /> },
        { label: "View Summary", onClick: () => console.log("View Summary"), icon: <MdChecklist size={20} /> },
        { label: "Make a copy", onClick: () => console.log("Make a copy"), icon: <MdOutlineContentCopy size={20} /> },
        { label: "Move to", onClick: () => console.log("Move to"), icon: <FaArrowRight size={20} /> },
        { label: "Save As Template", onClick: () => console.log("Save As Template"), icon: <IoIosMenu size={20} /> },
        { label: "Rename", onClick: () => console.log("Rename"), icon: <GoPencil size={20} /> },
        { label: "Delete", onClick: () => console.log("Delete"), icon: <MdDelete size={20} /> },
      ]}
    />
  );
}
