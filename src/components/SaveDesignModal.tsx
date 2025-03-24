import  { useState } from "react";
import { observer } from "mobx-react-lite";
import modelStore from "../stores/ModelStore";
import textureStore from "../stores/TextureStore";
import { saveDesign } from "../components/DesignApi";
import { BASE_URL, AUTH_TOKEN } from "../Constants";
import portfolioStore from "../stores/PortfolioStore";
import Button from "./UiComponent/Button";
import designStore from "../stores/DesignStore";

interface SaveDesignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const SaveDesignModal: React.FC<SaveDesignModalProps> = observer(({ isOpen, onConfirm }) => {
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const handleSaveAndProceed = async () => {
    setIsSaving(true);

    try {
      const selectedPortfolio = portfolioStore.selectedPortfolio.get();
      const portfolioId = selectedPortfolio ? String(selectedPortfolio.id) : "";

      const response = await saveDesign(designStore.designName, portfolioId, textureStore, modelStore);

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
          console.log("Design added to portfolio");
          modelStore.setDesignSaved(true);
          onConfirm();
        } else {
          console.error("Failed to add design to portfolio");
        }
      } else {
        console.error("Failed to save design.");
      }
    } catch (error) {
      console.error("Error saving design:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-md">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Save Design?</h2>
        <p className="text-sm mb-4">Would you like to save this design before proceeding with the order?</p>
        <div className="flex justify-end gap-4">
          <Button label="Don't Save" variant="secondary" onClick={onConfirm} />
          <Button label={isSaving ? "Saving..." : "Save & Continue"} variant="primary" onClick={handleSaveAndProceed} disabled={isSaving} />
        </div>
      </div>
    </div>
  );
});

export default SaveDesignModal;
