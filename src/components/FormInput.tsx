import React from "react";

type FormInputProps = {
  id: string;
  label: string;
  type?: string;
 name?: string; 
  placeholder?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  autoComplete?: string;
};

const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  name,
  type = "text",
  placeholder = "",
  value,
  onChange,
  required = false,
  autoComplete,
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-[#7F55B1] font-medium mb-1">
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        className="w-full px-4 py-2 border border-[#9B7EBD] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F49BAB]"
      />
    </div>
  );
};

export default FormInput;