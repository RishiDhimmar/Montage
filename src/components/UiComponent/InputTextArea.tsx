import React from "react";

interface InputBoxProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBox: React.FC<InputBoxProps> = ({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
}) => {
  return (
    <div className="w-full">
      <label className="block text-gray-700 font-sm mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded-md"
      />
    </div>
  );
};

export default InputBox;
