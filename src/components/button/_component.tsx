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
      className={`px-4 py-2 w-full rounded-[10px] text-[14px] text-[#AFAFAF] font-medium transition-all
        ${
          disabled || isLoading
            ? "bg-[#D9EFF9] cursor-not-allowed"
            : "bg-[#166E94]"
        } 
        ${className}`}
    >
      {isLoading ? "loading..." : text}
    </button>
  );
};

export default Button;
