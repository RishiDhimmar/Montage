// import { useState } from "react";
// import { IoIosMenu } from "react-icons/io";
// import { CustomDropdown } from "./CustomDropdown";
// import { RiSave2Line } from "react-icons/ri";
// import modelStore from "../../stores/ModelStore";
// import textureStore from "../../stores/TextureStore";
// import { saveDesign } from "../../components/DesignApi";
// import { BASE_URL, AUTH_TOKEN } from "../../Constants";
// import portfolioStore from "../../stores/PortfolioStore";
// import designStore from "../../stores/DesignStore";

// interface MainMenuDropdownProps {
//   designName: string;
// }

// interface SaveDesignResponse {
//   message: string;
//   id: string; // UUID
//   designImage: string;
//   monogramImage: string;
// }

// export function MainMenuDropdown({ designName }: MainMenuDropdownProps) {
//   const [isSaving, setIsSaving] = useState<boolean>(false);

//   const handleSaveDesign = async (): Promise<void> => {
//     if (isSaving) return;
//     setIsSaving(true);

//     try {
//       const selectedPortfolio = portfolioStore.selectedPortfolio.get();
//       const portfolioId = selectedPortfolio ? String(selectedPortfolio.id) : "";

//       // Ensure API call returns the correct type
//       const response: SaveDesignResponse | null = await saveDesign(
//         designName,
//         portfolioId,
//         textureStore,
//         modelStore
//       );

//       if (response && response.id) {
//         console.log("Design saved successfully:", response);

//         const secondApiResponse = await fetch(
//           `${BASE_URL}/portfolio/${portfolioId}/design`,
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${AUTH_TOKEN}`,
//             },
//             body: JSON.stringify({ designIds: [response.id] }),
//           }
//         );

//         if (secondApiResponse.ok) {
//           const secondResponseData = await secondApiResponse.json();
//           console.log("Design added to portfolio:", secondResponseData);
//           modelStore.setDesignSaved(true);
//           designStore.setDesignId(response.id);
//         } else {
//           const errorText = await secondApiResponse.text();
//           console.error("Failed to add design to portfolio:", errorText);
//         }
//       } else {
//         console.error("Failed to save design.");
//       }
//     } catch (error) {
//       console.error("Error saving design:", error);
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   return (
//     <CustomDropdown
//       icon={<IoIosMenu size={20} />}
//       options={[
//         {
//           label: "Save",
//           onClick: handleSaveDesign,
//           icon: <RiSave2Line size={20} />,
//         },
//       ]}
//     />
//   );
// }


import { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { CustomDropdown } from "./CustomDropdown";
import { RiSave2Line } from "react-icons/ri";
import modelStore from "../../stores/ModelStore";
import textureStore from "../../stores/TextureStore";
import { saveDesign, SaveDesignResponse } from "../../components/DesignApi";
import { BASE_URL, AUTH_TOKEN } from "../../Constants";
import portfolioStore from "../../stores/PortfolioStore";
import designStore from "../../stores/DesignStore";

interface MainMenuDropdownProps {
  designName: string;
}

export function MainMenuDropdown({ designName }: MainMenuDropdownProps) {
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleSaveDesign = async (): Promise<void> => {
    if (isSaving) return;
    setIsSaving(true);

    try {
      const selectedPortfolio = portfolioStore.selectedPortfolio.get();
      const portfolioId = selectedPortfolio ? String(selectedPortfolio.id) : "";

      //  Fixed: Ensure response matches the corrected SaveDesignResponse type
      const response: SaveDesignResponse | null = await saveDesign(
        designName,
        portfolioId,
        textureStore,
        modelStore
      );

      if (response && response.id) {
        console.log("Design saved successfully:", response);

        const secondApiResponse = await fetch(
          `${BASE_URL}/portfolio/${portfolioId}/design`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${AUTH_TOKEN}`,
            },
            body: JSON.stringify({ designIds: [response.id] }),
          }
        );

        if (secondApiResponse.ok) {
          const secondResponseData = await secondApiResponse.json();
          console.log("Design added to portfolio:", secondResponseData);
          modelStore.setDesignSaved(true);
          designStore.setDesignId(response.id);
        } else {
          const errorText = await secondApiResponse.text();
          console.error("Failed to add design to portfolio:", errorText);
        }
      } else {
        console.error("Failed to save design:", response?.error || "Unknown error");
      }
    } catch (error) {
      console.error("Error saving design:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <CustomDropdown
      icon={<IoIosMenu size={20} />}
      options={[
        {
          label: "Save",
          onClick: handleSaveDesign,
          icon: <RiSave2Line size={20} />,
        },
      ]}
    />
  );
}
