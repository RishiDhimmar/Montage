import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { FaChevronLeft, FaChevronDown } from "react-icons/fa";
import Button from "./UiComponent/Button"; // Adjust if needed

import modelStore from "../stores/ModelStore";
import textureStore from "../stores/TextureStore";

interface OrderSummaryProps {
  onBack: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = observer(({ onBack }) => {
  const [showDetails, setShowDetails] = useState(false);

  const selectedTexturesArray = Object.values(textureStore.selectedTextures).filter(Boolean);

  const filteredTextures = selectedTexturesArray.filter((_, index) => [0, 2, 3].includes(index));

  const allItems = [
    ...modelStore.models.map((model) => ({ label: model.name, price: model.price })),
    ...filteredTextures.map((tex) => ({ label: tex!.label, price: tex!.price })),
  ];

  const totalCost = allItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="w-full overflow-y-auto p-4 bg-white">
      <button className="flex items-center text-gray-600 mb-4" onClick={onBack}>
        <FaChevronLeft className="w-5 h-5 mr-2" /> Edit Your Design
      </button>

      <h2 className="text-xl font-semibold mt-4">Your Montage</h2>

      <p className="text-gray-500 text-sm">
        Saved File Name: <strong>Untitled-2</strong>
      </p>

      <div className="border-t border-gray-300 mt-4 pt-2">
        <div
          className="flex justify-between items-center font-semibold text-sm cursor-pointer"
          onClick={() => setShowDetails(!showDetails)}
        >
          <span>Your Selected Items</span>
          <FaChevronDown className={`transition-transform ${showDetails ? "rotate-180" : ""}`} />
        </div>

        {showDetails && (
          <div className="mt-2 space-y-1">
            {allItems.map((item, index) => (
              <div key={`${item.label}-${index}`} className="flex justify-between">
                <span>{item.label}</span>
                <span>{item.price === 0 ? "Included" : `$${item.price.toLocaleString()}`}</span>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-between font-semibold mt-2">
          <span>Total</span>
          <span>${totalCost.toLocaleString()}</span>
        </div>
      </div>

      <Button label="Order with Paypal" variant="primary" />
    </div>
  );
});

export default OrderSummary;

