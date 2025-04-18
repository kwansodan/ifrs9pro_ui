import { useParams } from "react-router-dom";
import Button from "../../components/button/_component";
import { SaveReports } from "../../core/services/portfolio.service";
import { showToast } from "../../core/hooks/alert";
import { useState } from "react";
function GenerateReportSuccess({ report_date, report_type }: any) {
  const { id } = useParams();
  const [save, setSave] = useState<boolean>(false);

  const handleSubmit = () => {
    setSave(true);
    const payload = {
      report_date,
      report_type,
      report_name: "",
      report_data: {},
    };

    if (!report_date || !report_type) {
      showToast(
        "Missing some properties, could be report date, or type",
        false
      );
      setSave(false);
      return;
    }

    if (id) {
      SaveReports(id, payload)
        .then(() => {
          setSave(false);
          showToast("Save successful", true);
          // setTimeout(() => {
          //   window.location.reload();
          // }, 1500);
        })
        .catch(() => {
          setSave(false);
          showToast("Sorry, an error occured", false);
        });
    }
  };

  const downloadDocument = () => {
    showToast("Please save report to be able to download", false);
  };
  return (
    <>
      <div className="bg-white min-h-[200px] min-w-[600px] pt-5 pb-3 px-16 rounded-[20px]">
        <div className="max-w-[580px] mt-3 p-[18px] text-[#1E1E1E] text-[14px] font-medium rounded-[10px] bg-[#D9EFF929]">
          Your summary of collateral data report has been successfully
          generated.
        </div>
        <div className="flex justify-end mt-3">
          <Button
            onClick={handleSubmit}
            text="Save report"
            isLoading={save}
            className="px-4 !w-[30%]  !text-[14px] bg-white border border-gray-400 rounded-[10px] mr-2"
          />
          <Button
            text="Download report"
            onClick={() => downloadDocument()}
            className="bg-[#166E94] !text-[14px] !w-[30%]  text-white px-4 py-2 rounded-[10px]"
          />
        </div>
      </div>
    </>
  );
}

export default GenerateReportSuccess;
