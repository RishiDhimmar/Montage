import  { useState } from "react";
import Button from "../UiComponent/Button";
import modelStore from "../../stores/ModelStore";
import { observer } from "mobx-react-lite";
import SaveDesignModal from "../SaveDesignModal"; 

const SidebarFooter: React.FC<{ blurIntensity: number; onOrderNow: () => void }> = ({ blurIntensity, onOrderNow }) => {
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  const handleOrderClick = () => {
    if (modelStore.isDesignSaved) {
      setIsSaveModalOpen(true);
      return;
    }else{
      onOrderNow();
    }
    
  };

  return (
    <>
      <div
        className="flex items-center border-t border-gray-300 p-3 transition-all duration-300"
        style={{
          backgroundColor: `rgba(255, 255, 255, ${0.3 + blurIntensity * 0.05})`,
          backdropFilter: `blur(${blurIntensity}px)`,
        }}
      >
        <div className="w-2/3">
          <h3 className="text-lg font-semibold">{"$ "}{modelStore.totalPrice}</h3>
          <div>Estimated Construction Cost</div>
        </div>
        <div>
          <Button label="Order Now" variant="primary" onClick={handleOrderClick} disabled={!modelStore.isDesignSaved} />
        </div>
      </div>

      {/* Save Confirmation Modal */}
      <SaveDesignModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onConfirm={() => {
          setIsSaveModalOpen(false);
          onOrderNow();
        }}
      />
    </>
  );
};

export default observer(SidebarFooter);
