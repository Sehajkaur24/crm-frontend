import React from "react";

type ButtonProps = {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
};

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  type = "button",
  variant = "primary",
}) => {
  const baseClasses =
    "w-full py-2 font-semibold rounded-xl transition duration-300";

  const variantClasses =
    variant === "primary"
      ? "bg-[#7F55B1] hover:bg-[#9B7EBD] text-white"
      : "bg-[#F49BAB] hover:bg-[#f77f95] text-white";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses}`}
    >
      {text}
    </button>
  );
};

export default Button;
