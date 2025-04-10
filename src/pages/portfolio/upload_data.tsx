import { useParams } from "react-router-dom";
import Button from "../../components/button/_component";
import Upload from "../../components/upload/_component";
import { UploadDataProps } from "../../core/interfaces";
import { CreatePortfolioIngestion } from "../../core/services/portfolio.service";
import { showToast } from "../../core/hooks/alert";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

function UploadData({ close }: UploadDataProps) {
  const { id } = useParams();
  const toastId = useRef<string | number | null>(null);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [customer_details, setCustomerDetails] = useState<File | null>(null);
  const [loan_details, setLoanDetails] = useState<File | null>(null);
  const [loan_guarantee_data, setLoanGuarantee] = useState<File | null>(null);
  const [loan_collateral_data, setLoanCollateral] = useState<File | null>(null);

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

  const listenToWebSocket = (wsUrl: string) => {
    const token = localStorage.getItem("u_token");
    const socketUrl = `${wsUrl}?token=${token}`;
    console.log("tok:", socketUrl);
    const socket = new WebSocket(socketUrl);

    socket.onopen = () => {
      console.log("WebSocket connection opened");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("WebSocket Message:", data);
      if (data && data?.error) {
        showToast(`An error occurred: ` + " " + data?.error, false);
      }
      if (data && !data?.error) {
        showToast(
          `${data && data?.status + ":" + " "} ${data && data?.status_message}`,
          true,
          true
        );
      }

      if (data.status === "completed") {
        setIsDone(false);
        if (toastId.current) toast.dismiss(toastId.current);
        setTimeout(() => {
          window.location.reload();
        }, 2200);
        socket.close();
      } else if (data.status === "failed") {
        showToast("Ingestion failed", false);
        setIsDone(false);
        socket.close();
      } else {
        // maybe show progress updates
        // setIsDone(false);
        console.log("Ingestion in progress:", data.progress);
      }
    };

    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
      showToast("An error occurred. Please try again", false);
      setIsDone(false);
      showToast("Connection error", false);
    };

    socket.onclose = () => {
      setIsDone(false);
      console.log("WebSocket connection closed");
    };
  };

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
    showToast("Ingestion set to begin", true);
    if (id) {
      CreatePortfolioIngestion(id, formData)
        .then((res) => {
          console.log("res: ", res);
          const { websocket_url, message } = res.data;
          console.log("websocket_url: ", websocket_url);
          if (websocket_url) {
            listenToWebSocket(websocket_url);
          }

          showToast(message, true);
        })
        .catch((err) => {
          setIsDone(false);
          showToast(
            err?.response?.data?.detail ??
              "An error occurred, please try again",
            false
          );
        });
    }
  };

  return (
    <>
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
