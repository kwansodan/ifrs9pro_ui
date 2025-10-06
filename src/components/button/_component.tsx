import React from "react";
import { ButtonProps } from "../../core/interfaces";

const Button: React.FC<ButtonProps> = ({
  text,
  disabled,
  onClick,
  isLoading,
  btnId,
  className = "",
}) => {
  return (
    <button
      id={btnId}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`px-4 py-2 flex items-center justify-center w-full whitespace-nowrap rounded-[10px] text-[12px] text-[#AFAFAF] font-medium transition-all
      
        ${className}`}
    >
      {isLoading ? "loading..." : text}
    </button>
  );
};

export default Button;
