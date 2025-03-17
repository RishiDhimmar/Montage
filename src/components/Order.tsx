import { useState } from "react";
import { FaChevronLeft, FaChevronDown } from "react-icons/fa";
import Button from "./UiComponent/Button";

export default function OrderSummary({ onBack }: { onBack: () => void }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="w-full h-screen p-4 bg-white ">
      <button className="flex items-center text-gray-600 mb-4" onClick={onBack}>
        <FaChevronLeft className="w-5 h-5 mr-2" /> Edit Your Design
      </button>
      
      <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
        <span>3D Model Preview</span>
      </div>
      
      <h2 className="text-xl font-semibold mt-4">Your Montage</h2>
      <p className="text-gray-500 text-sm">Saved File Name: Untitled-1</p>
      <p className="text-gray-500 text-sm">Annex-1 + Dwelling + Lifestyle-1</p>
      <p className="text-gray-500 text-sm">Weathered Alaskan Yellow Cedar</p>
      <p className="text-gray-500 text-sm">Pure White Interior</p>
      <p className="text-gray-500 text-sm">White Herringbone Kitchen, Backsplash</p>
      <p className="text-gray-500 text-sm">White Basis Cabinets, Smart Home Package</p>
      
      <div className="mt-4 border p-4 rounded-lg shadow-sm">
        <div className="flex justify-between text-sm">
          <span>Estimated Home Construction Cost</span>
          <span className="font-semibold">$297</span>
        </div>
        <button 
          className="flex items-center text-blue-500 text-sm mt-2"
          onClick={() => setShowDetails(!showDetails)}
        >
          Show Details <FaChevronDown className="w-4 h-4 ml-1" />
        </button>
        {showDetails && (
          <div className="text-gray-500 text-sm mt-2">
            <p>Foundation, framing, exterior, interior finishes, etc.</p>
          </div>
        )}
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between text-sm">
          <span>Design Options</span>
          <span className="font-semibold">$1</span>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span>Design Plus Package</span>
          <span className="font-semibold">$1</span>
        </div>
      </div>
      
      <div className="border-t border-gray-300 mt-4 pt-2">
        <div className="flex justify-between font-semibold text-sm">
          <span>Your Montage</span>
          <span>$1</span>
        </div>
        <div className="flex justify-between text-gray-500 text-sm mt-1">
          <span>Excluding taxes & other fees</span>
        </div>
      </div>
      
      <div className="border-t border-gray-300 mt-4 pt-2">
        <div className="flex justify-between text-lg font-semibold">
          <span>Due Today</span>
          <span>$1</span>
        </div>
        <p className="text-gray-500 text-sm">Non-refundable Order Fee</p>
      </div>
      
      <Button label="Order with Paypal" variant="primary" />
    </div>
  );
}