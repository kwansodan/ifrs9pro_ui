import { UploadDataProps } from "../../core/interfaces";
import Button from "../../components/button/_component";
import { useState } from "react";
import { CreatePortfolioLocalImpairmentCalculation } from "../../core/services/portfolio.service";
import { useParams } from "react-router-dom";
import { showToast } from "../../core/hooks/alert";

function CalculateLocalImpairment({ close }: UploadDataProps) {
  const { id } = useParams();
  const [calculating, setCalculating] = useState<boolean>(false);

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
          showToast("Operation successful", true);
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        })
        .catch((err) => {
          setCalculating(false);
          showToast(err?.response?.data?.detail || "Submission failed", false);
        });
    }
  };
  return (
    <>
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
