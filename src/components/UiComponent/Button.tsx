import React from "react";

interface ButtonProps {
  label?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "tertiary" | "none";
  icon?: React.ReactNode;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, variant="tertiary", disabled , icon }) => {
  const buttonStyles = {
    primary: `bg-[#001833] text-white ${disabled ? "opacity-50 cursor-not-allowed" : ""}`,
    secondary: `bg-white text-black border border-gray-300 hover:bg-gray-100 ${disabled ? "opacity-50 cursor-not-allowed" : ""}`,
    tertiary: ` text-black ${disabled ? "opacity-50 cursor-not-allowed" : ""}`,
    none: `bg-gray-100 text-gray-600 hover:bg-gray-200 ${disabled ? "opacity-50 cursor-not-allowed" : ""}`,
  };

  return (
    <button
      onClick={onClick}
      className={`w-full p-2 rounded-md transition-all duration-300 ${buttonStyles[variant]}`}
      disabled={disabled}
    >
      <div className="flex items-center justify-center gap-2">
      {icon && <span className="">{icon}</span>}
      {label}
      </div>
    </button>
  );
};

export default Button;

