import { useParams } from "react-router-dom";
import Button from "../../components/button/_component";
import Upload from "../../components/upload/_component";
import { UploadDataProps } from "../../core/interfaces";
import { CreatePortfolioIngestion } from "../../core/services/portfolio.service";
import { showToast } from "../../core/hooks/alert";
import { useState } from "react";
// import { toast } from "react-toastify";
import { CustomToast } from "../../components/toast/component";

function UploadData({ close }: UploadDataProps) {
  const { id } = useParams();
  const [customToastData, setCustomToastData] = useState<{
    message: string;
    type: "success" | "error" | "info";
    show: boolean;
  }>({ message: "", type: "info", show: false });
  // const toastId = useRef<string | number | null>(null);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [customer_details, setCustomerDetails] = useState<File | null>(null);
  const [loan_details, setLoanDetails] = useState<File | null>(null);
  const [loan_guarantee_data, setLoanGuarantee] = useState<File | null>(null);
  const [loan_collateral_data, setLoanCollateral] = useState<File | null>(null);

  // const showCustomToast = (
  //   message: string,
  //   type: "success" | "error" | "info"
  // ) => {
  //   setCustomToastData({ message, type, show: true });
  // };

  const getCustomerDataFile = (file: File) => {
    setCustomerDetails(() => {
      return file;
    });
  };
  const getLoanDetailsFile = (file: File) => {
    setLoanDetails(() => {
      return file;
    });
  };

  const getLoanGuaranteeFile = (file: File) => {
    setLoanGuarantee(() => file);
  };

  const getLoanCollateralFile = (file: File) => {
    setLoanCollateral(() => file);
  };

  // const MAX_RETRIES = 5;
  // const RECONNECT_DELAY = 2000;

  // const socketRef = useRef<WebSocket | null>(null);
  // const retryCountRef = useRef(0);

  // const listenToWebSocket = (wsUrl: string) => {
  //   const token = localStorage.getItem("u_token");
  //   const socketUrl = `${wsUrl}?token=${token}`;
  //   console.log("Connecting to:", socketUrl);

  //   if (socketRef.current) {
  //     socketRef.current.close();
  //   }

  //   const socket = new WebSocket(socketUrl);
  //   socketRef.current = socket;

  //   socket.onopen = () => {
  //     console.log("WebSocket connected");
  //     retryCountRef.current = 0;
  //     showCustomToast("Connected to server", "info");
  //   };

  //   socket.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     console.log("Message from WebSocket:", data);

  //     if (data?.error) {
  //       showCustomToast(`An error occurred: ${data.error}`, "error");
  //     } else {
  //       showCustomToast(`${data.status}: ${data.status_message}`, "success");
  //     }

  //     if (data.status === "completed") {
  //       setIsDone(false);
  //       if (toastId.current) toast.dismiss(toastId.current);
  //       setTimeout(() => window.location.reload(), 2200);
  //       socket.close();
  //     } else if (data.status === "failed") {
  //       showToast("Ingestion failed", false);
  //       setIsDone(false);
  //       socket.close();
  //     } else {
  //       console.log("Progress:", data.progress);
  //     }
  //   };

  //   socket.onerror = (err) => {
  //     console.error("WebSocket error:", err);
  //     showToast("WebSocket error. Will retry...", false);
  //     socket.close();
  //   };

  //   socket.onclose = (event) => {
  //     setIsDone(false);
  //     console.log("WebSocket closed:", event.reason);

  //     // Retry only if task isn't completed or failed
  //     if (retryCountRef.current < MAX_RETRIES) {
  //       retryCountRef.current += 1;
  //       const delay = RECONNECT_DELAY * retryCountRef.current;
  //       console.log(
  //         `Retrying connection in ${delay / 1000}s (attempt ${
  //           retryCountRef.current
  //         })...`
  //       );
  //       setTimeout(() => listenToWebSocket(wsUrl), delay);
  //     } else {
  //       showToast("Failed to reconnect to the server", false);
  //     }
  //   };
  // };

  const handleSubmit = () => {
    setIsDone(true);
    if (!loan_details || !customer_details) {
      showToast("Please upload loan details and customer data.", false);
      setIsDone(false);
      return;
    }

    const formData = new FormData();
    formData.append("client_data", customer_details);
    formData.append("loan_details", loan_details);
    if (loan_guarantee_data) {
      formData.append("loan_guarantee_data", loan_guarantee_data);
    }

    if (loan_collateral_data) {
      formData.append("loan_collateral_data", loan_collateral_data);
    }

    if (id) {
      CreatePortfolioIngestion(id, formData)
        .then((res) => {
          console.log("res: ", res?.data);
          setIsDone(false);
          showToast("Ingestion done", true);
          setTimeout(() => window.location.reload(), 2200);
          // console.log("websocket_url: ", websocket_url);
          // if (websocket_url) {
          //   listenToWebSocket(websocket_url);
          // }

          // showCustomToast(message, "success");
        })
        .catch((err) => {
          setIsDone(false);
          showToast(
            err?.response?.data?.detail ??
              "Server error occurred, please try again",
            false
          );
        });
    }
  };

  return (
    <>
      {customToastData.show && (
        <CustomToast
          message={customToastData.message}
          type={customToastData.type}
          onClose={() =>
            setCustomToastData({ ...customToastData, show: false })
          }
        />
      )}
      <div className="flex flex-col w-full">
        <Upload
          templateLink={"/Customer_data.xlsx"}
          setFile={getCustomerDataFile}
          UploadTitle="Import customer data"
        />
        <Upload
          templateLink={"/Loan_master.xlsx"}
          setFile={getLoanDetailsFile}
          UploadTitle="Import loan details"
        />
        <Upload
          templateLink={"/Loan_guarantee.xlsx"}
          setFile={getLoanGuaranteeFile}
          UploadTitle="Import loan guarantee data"
        />
        <Upload
          templateLink={"/Collateral_Data.xlsx"}
          setFile={getLoanCollateralFile}
          UploadTitle="Import loan collateral data"
        />
      </div>

      <div className="flex justify-end mt-2">
        <Button
          text="Cancel"
          onClick={close}
          className="bg-white !py-0 mr-3 border-[1px] border-[#6F6F6F] font-normal text-[#6F6F6F] text-[12px] !rounded-[10px] !w-[90px] "
        />
        <Button
          text="Done"
          isLoading={isDone}
          onClick={handleSubmit}
          className="bg-[#166E94] font-normal text-white text-[12px] !rounded-[10px] !w-[90px] "
        />
      </div>
    </>
  );
}

export default UploadData;
