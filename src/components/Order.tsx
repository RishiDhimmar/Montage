// import  { useState } from "react";
// import { observer } from "mobx-react-lite";
// import { FaChevronLeft, FaChevronDown } from "react-icons/fa";
// import Button from "./UiComponent/Button";

// import modelStore from "../stores/ModelStore";
// import textureStore from "../stores/TextureStore";
// import designStore from "../stores/DesignStore";

// interface OrderSummaryProps {
//   onBack: () => void;
// }

// const OrderSummary: React.FC<OrderSummaryProps> = observer(({ onBack }) => {
//   const [showDetails, setShowDetails] = useState(false);

//   const selectedTexturesArray = Object.values(textureStore.selectedTextures).filter(Boolean);
//   const filteredTextures = selectedTexturesArray.filter((_, index) => [0, 2, 3].includes(index));

//   const allItems = [
//     ...modelStore.models.map((model) => ({ label: model.name, price: model.price })),
//     ...filteredTextures.map((tex) => ({ label: tex!.label, price: tex!.price })),
//   ];

//   const totalCost = allItems.reduce((sum, item) => sum + item.price, 0);

//   return (
//     <div className="w-full overflow-y-auto p-4 bg-white">
//       <button className="flex items-center text-gray-600 mb-4" onClick={onBack}>
//         <FaChevronLeft className="w-5 h-5 mr-2" /> Edit Your Design
//       </button>

//       <div className="text-xl font-semibold mt-4">Your Montage</div>

//       <div className="text-gray-500 text-sm font-semibold">
//         {designStore.designName}
//       </div>

//       <div className="border-t border-gray-300 mt-4 pt-2">
//         <div
//           className="flex justify-between items-center font-semibold text-sm cursor-pointer"
//           onClick={() => setShowDetails(!showDetails)}
//         >
//           <div>Your Selected Items</div>
//           <FaChevronDown className={`transition-transform ${showDetails ? "rotate-180" : ""}`} />
//         </div>

//         {showDetails && (
//           <div className="mt-2 space-y-1">
//             {allItems.map((item, index) => (
//               <div key={`${item.label}-${index}`} className="flex justify-between">
//                 <div>{item.label}</div>
//                 <div>{item.price === 0 ? "Included" : `$${item.price.toLocaleString()}`}</div>
//               </div>
//             ))}
//           </div>
//         )}

//         <div className="flex justify-between font-semibold mt-2">
//           <div>Total</div>
//           <div>${totalCost.toLocaleString()}</div>
//         </div>
//       </div>

//       <Button label="Place Order" variant="primary" />
//     </div>
//   );
// });

// export default OrderSummary;

import  { useState } from "react";
import { observer } from "mobx-react-lite";
import { FaChevronLeft, FaChevronDown } from "react-icons/fa";
import Button from "./UiComponent/Button";
import modelStore from "../stores/ModelStore";
import textureStore from "../stores/TextureStore";
import designStore from "../stores/DesignStore";
import { AUTH_TOKEN, BASE_URL } from "../Constants"; // Make sure this is correctly set

interface OrderSummaryProps {
  onBack: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = observer(({ onBack }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(false);

  const selectedTexturesArray = Object.values(
    textureStore.selectedTextures
  ).filter(Boolean);
  const filteredTextures = selectedTexturesArray.filter((_, index) =>
    [0, 2, 3].includes(index)
  );

  const allItems = [
    ...modelStore.models.map((model) => ({
      label: model.name,
      price: model.price,
    })),
    ...filteredTextures.map((tex) => ({
      label: tex!.label,
      price: tex!.price,
    })),
  ];

  const totalCost = allItems.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = async () => {
    const designId = designStore.designId;

    if (!designId) {
      console.error("No design selected");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/stripe-checkout/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify({
          designId,
          packageId: "5e489a12-0067-4cf8-be1e-58cd8594e942",
          packageAddonsIds: ["9c515ced-cee4-4ad6-8723-1a747ad367c1"],
          additionalOptIds: [1],
          address: {
            firstName: "John",
            lastName: "Dove",
            phone: "123456789",
            email: "pruthav@hexacoder.com",
          },
        }),
      });

      const data = await response.json();

      if (data.clientSecret) {
        // Redirect to Stripe Checkout
        window.location.href = data.clientSecret;
      } else {
        console.error("Error: Invalid response from server", data);
      }
    } catch (error) {
      console.error("Checkout failed:", error);
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <div className="w-full overflow-y-auto p-4 bg-white">
      <button className="flex items-center text-gray-600 mb-4" onClick={onBack}>
        <FaChevronLeft className="w-5 h-5 mr-2" /> Edit Your Design
      </button>

      <div className="text-xl font-semibold mt-4">Your Montage</div>

      <div className="text-gray-500 text-sm font-semibold">
        {designStore.designName}
      </div>

      <div className="border-t border-gray-300 mt-4 pt-2">
        <div
          className="flex justify-between items-center font-semibold text-sm cursor-pointer"
          onClick={() => setShowDetails(!showDetails)}
        >
          <div>Your Selected Items</div>
          <FaChevronDown
            className={`transition-transform ${
              showDetails ? "rotate-180" : ""
            }`}
          />
        </div>

        {showDetails && (
          <div className="mt-2 space-y-1">
            {allItems.map((item, index) => (
              <div
                key={`${item.label}-${index}`}
                className="flex justify-between"
              >
                <div>{item.label}</div>
                <div>
                  {item.price === 0
                    ? "Included"
                    : `$${item.price.toLocaleString()}`}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between font-semibold mt-2">
          <div>Total</div>
          <div>${totalCost.toLocaleString()}</div>
        </div>
      </div>

      <Button
        label={loading ? "Processing..." : "Place Order"}
        variant="primary"
        onClick={handleCheckout}
        disabled={loading}
      />
    </div>
  );
});

export default OrderSummary;
