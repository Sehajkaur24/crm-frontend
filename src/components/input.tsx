import React from "react";

interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  type = "text",
  placeholder,
  required = false,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-[#7F55B1] font-medium mb-1">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="border border-[#D1BEE7] px-4 py-2 rounded-xl focus:ring-2 focus:ring-[#F49BAB] outline-none"
        required={required}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default FormInput;
