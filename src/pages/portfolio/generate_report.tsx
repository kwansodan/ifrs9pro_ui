import Select from "react-select";
import { reportTypeOptions } from "../../data";
import Button from "../../components/button/_component";
import { UploadDataProps } from "../../core/interfaces";
import { useParams } from "react-router-dom";
import { showToast } from "../../core/hooks/alert";
import { GenerateReports } from "../../core/services/portfolio.service";
import { useState } from "react";
import { Modal } from "../../components/modal/_component";
import GerneratingReport from "./generating_report";
function GenerateReport({ close }: UploadDataProps) {
  const { id } = useParams();
  const [report_type, setReportType] = useState<string>("");

  const [triggerReportGeneration, setTriggerReportGeneration] =
    useState<boolean>(false);

  const handleReportType = (selectedOption: any) => {
    setReportType(selectedOption.value);
  };

  const handleSubmit = () => {
    const reportDateElement = document.getElementById(
      "report_date"
    ) as HTMLInputElement | null;
    const report_date = reportDateElement?.value ?? "";

    if (!id || !report_date) {
      showToast("All fields required", false);
      return;
    }

    const payload = { report_date, report_type };
    setTriggerReportGeneration(true);
    if (id) {
      GenerateReports(id, payload)
        .then((res) => {
          setTriggerReportGeneration(false);
          showToast(res.data.message, true);

          setTimeout(() => {
            window.location.reload();
          }, 1600);
        })
        .catch(() => {
          setTriggerReportGeneration(false);
          showToast("Submission failed", false);
        });
    }
  };

  // const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const dateStr = e.target.value;
  //   if (!dateStr) return;

  //   const selectedDate = new Date(dateStr);
  //   const selectedDay = selectedDate.getDate();
  //   const lastDayOfMonth = new Date(
  //     selectedDate.getFullYear(),
  //     selectedDate.getMonth() + 1,
  //     0
  //   ).getDate();

  //   if (selectedDay !== lastDayOfMonth) {
  //     alert("Please select the last day of a month.");
  //     e.target.value = "";
  //   }
  // };

  return (
    <>
      <Modal showClose={true} open={triggerReportGeneration}>
        <GerneratingReport />
      </Modal>
      {/* <Modal
        showClose={false}
        close={() => setTriggerReportGeneration(false)}
        open={triggerReportGenerationSuccess}
      >
        <GenerateReportSuccess
          report_type={report_type}
          report_date={report_date}
        />
      </Modal> */}
      <div className="mt-3 leading-9">
        <label className="text-[#1E1E1E] text-[14px] font-medium">
          Report date
        </label>
        <div className="w-full ">
          <input
            // onChange={handleDateChange}
            placeholder="Select a date"
            className="w-full h-10 border rounded-[10px] border-gray-300 px-[6px] py-[5px] focus:outline-[#166E94] text-gray-400"
            type="date"
            id="report_date"
          />
        </div>
        <label className="text-[#1E1E1E] text-[14px] font-medium">
          Report type
        </label>
        <Select
          className="w-full"
          onChange={handleReportType}
          options={reportTypeOptions}
          id="asset-type"
          placeholder="Select report to run"
        />
      </div>
      <div className="max-w-[580px] text-[#6F6F6F] text-[14px] mt-3 p-[18px] rounded-[10px] bg-[#D9EFF929]">
        Report date 26-04-2025 hint text here Report type Summary of Collateral
        data  hint text here Lorem ipsum dolor sit amet, consectetur adipiscing
        elit, sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </div>
      <div className="flex justify-end mt-3">
        <Button
          text="Cancel"
          onClick={close}
          className="px-4 !w-[90px]  !text-[14px] bg-white border border-gray-400 rounded-[10px] mr-2"
        />
        <Button
          onClick={handleSubmit}
          text="Generate"
          className="bg-[#166E94] !text-[14px] !w-[90px] text-white px-4 py-2 rounded-[10px]"
        />
      </div>
    </>
  );
}

export default GenerateReport;
