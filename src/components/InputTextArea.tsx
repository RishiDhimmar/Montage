import React from "react";

interface InputBoxProps {
  label: string;
  type?: string;
  placeholder?: string;
}

const InputBox: React.FC<InputBoxProps> = ({
  label,
  type = "text",
  placeholder = "", // Default position in 3D space
}) => {
  return (
    
      <div className="w-full">
        <label className="block text-gray-700 font-sm">{label}</label>
        <input
          type={type}
          placeholder={placeholder}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
    
  );
};

export default InputBox;
