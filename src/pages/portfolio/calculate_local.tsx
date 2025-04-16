import { UploadDataProps } from "../../core/interfaces";
import Button from "../../components/button/_component";
import { useState } from "react";
import { CreatePortfolioLocalImpairmentCalculation } from "../../core/services/portfolio.service";
import { useParams } from "react-router-dom";
import { showToast } from "../../core/hooks/alert";
import { CustomToast } from "../../components/toast/component";
import PageLoader from "../../components/page_loader/_component";
import { Modal } from "../../components/modal/_component";
// import { toast } from "react-toastify";

function CalculateLocalImpairment({ close }: UploadDataProps) {
  const { id } = useParams();
  // const toastId = useRef<string | number | null>(null);
  const [calculating, setCalculating] = useState<boolean>(false);
  const [customToastData, setCustomToastData] = useState<{
    message: string;
    type: "success" | "error" | "info";
    show: boolean;
  }>({ message: "", type: "info", show: false });

  // const showCustomToast = (
  //   message: string,
  //   type: "success" | "error" | "info"
  // ) => {
  //   setCustomToastData({ message, type, show: true });
  // };

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
  //       setCalculating(false);
  //       if (toastId.current) toast.dismiss(toastId.current);
  //       setTimeout(() => window.location.reload(), 2200);
  //       socket.close();
  //     } else if (data.status === "failed") {
  //       showToast("Ingestion failed", false);
  //       setCalculating(false);
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
  //     setCalculating(false);
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
    const reportingDateElement = document.getElementById(
      "local-impairment"
    ) as HTMLInputElement | null;
    const reporting_date = reportingDateElement?.value ?? "";

    if (!id || !reporting_date) {
      setCalculating(false);
      showToast("All fields required", false);
      return;
    }
    setCalculating(true);

    if (id && reporting_date) {
      CreatePortfolioLocalImpairmentCalculation(id, reporting_date)
        .then(() => {
          setCalculating(false);
          showToast("BOG Impairment Calculation Done", true);
          setTimeout(() => window.location.reload(), 1800);
          // const { websocket_url, message } = res.data;
          // console.log("websocket_url: ", websocket_url);
          // if (websocket_url) {
          //   listenToWebSocket(websocket_url);
          // }

          // showCustomToast(message, "success");
        })
        .catch((err) => {
          setCalculating(false);
          showToast(err?.response?.data?.detail ?? "Submission failed", false);
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

      <Modal
        showClose={true}
        open={calculating}
        modalHeader="Operation ongoing"
      >
        <div className="flex flex-col items-center justify-center p-8 bg-white ">
          <PageLoader />
          <small className="text-[#F7941E]">
            BOG impairment calculation in progress. Please wait. Do not close,
            refresh or navigate the page.
          </small>
        </div>
      </Modal>
      <div className="py-6 bg-white rounded-lg">
        <small>Reporting date</small>
        <div className="w-full">
          <input
            placeholder="Select a date"
            className=" w-full border rounded-[10px] border-gray-300 px-[6px] py-[5px] focus:outline-[#166E94] text-gray-400"
            type="date"
            id="local-impairment"
          />
        </div>
        <div className="flex justify-end mt-3">
          <Button
            text="Cancel"
            onClick={close}
            className="px-4 !w-[90px] !text-[14px] bg-white border border-gray-400 rounded-[10px] mr-2"
          />
          <Button
            onClick={handleSubmit}
            isLoading={calculating}
            text="Calculate Impairment"
            className="bg-[#166E94] !text-[14px] !w-[170px] text-white px-4 py-2 rounded-[10px]"
          />
        </div>
      </div>
    </>
  );
}

export default CalculateLocalImpairment;
