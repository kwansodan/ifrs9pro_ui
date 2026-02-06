import { toast } from "react-toastify";

export const showToast = (
  message: string,
  success: boolean,
  manualClose = false,
  timeout = 8000,
) => {
  if (success === true)
    toast.success(message, {
      position: "bottom-right",
      autoClose: !manualClose ? timeout : false,
      style: { fontSize: "12px", fontWeight: "bold" },
    });
  else if (success === false) {
    toast.error(message, {
      position: "bottom-right",
      autoClose: !manualClose ? timeout : false,
      style: { fontSize: "12px", fontWeight: "bold" },
    });
  }
};
