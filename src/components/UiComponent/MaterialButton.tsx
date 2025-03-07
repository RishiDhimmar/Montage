import React from "react";

interface MaterialButtonProps {
  label: string;
  color: string;
  onClick: () => void;
}

const MaterialButton: React.FC<MaterialButtonProps> = ({ label, color, onClick }) => {
  return (
    <button
      className="w-16 h-16 rounded-full border-2 border-gray-400 shadow-md"
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default MaterialButton;
