import { toast } from "react-toastify";

export const showToast = (message: string, success: boolean) => {
  if (success === true)
    toast.success(message, {
      position: "bottom-right",
      autoClose: 3000,
      style: { fontSize: "12px", fontWeight: "bold" },
    });
  else if (success === false) {
    toast.error(message, {
      position: "bottom-right",
      autoClose: 3000,
      style: { fontSize: "12px", fontWeight: "bold" },
    });
  }
};
