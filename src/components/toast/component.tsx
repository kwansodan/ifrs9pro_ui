// components/CustomToast.tsx
import React, { useEffect } from "react";

type ToastProps = {
  message: string;
  type: "success" | "error" | "info";
  onClose?: () => void;
};

const bgColorMap = {
  success: "bg-green-500",
  error: "bg-red-500",
  info: "bg-blue-500",
};

export const CustomToast: React.FC<ToastProps> = ({
  message,
  type,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, 10000); // auto dismiss after 10s (optional)

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-4 right-4 max-w-sm w-full shadow-lg rounded-md p-4 text-white flex items-start gap-3 z-50 ${bgColorMap[type]}`}
    >
      <div
        className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
      <div className="flex-1">
        <p className="text-sm">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="ml-2 font-bold text-white hover:opacity-80"
      >
        ×
      </button>
    </div>
  );
};
