import { toast } from "react-toastify";

export const showToast = (
  message: string,
  success: boolean,
  manualClose = false
) => {
  if (success === true)
    toast.success(message, {
      position: "bottom-right",
      autoClose: !manualClose ? 4000 : false,
      style: { fontSize: "12px", fontWeight: "bold" },
    });
  else if (success === false) {
    toast.error(message, {
      position: "bottom-right",
      autoClose: !manualClose ? 4000 : false,
      style: { fontSize: "12px", fontWeight: "bold" },
    });
  }
};
