import React from "react";
import Button from "../UiComponent/Button";

const SidebarFooter: React.FC = () => {
  return (
    <div className="flex items-center border-t border-gray-300 bg-transparent  p-3 bottom-2">
      <div className="w-2/3">
        <h3 className="text-lg font-semibold">$55,555</h3>
        <div>Estimated Construction cost</div>
      </div>
      <div>
        <Button label="Order Now" variant="primary" />
      </div>
    </div>
  );
};

export default SidebarFooter;
