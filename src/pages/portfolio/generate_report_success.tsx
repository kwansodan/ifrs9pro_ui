import Button from "../../components/button/_component";
function GenerateReportSuccess() {
  return (
    <>
      <div className="max-w-[580px] mt-3 p-[18px] text-[#1E1E1E] text-[14px] font-medium rounded-[10px] bg-[#D9EFF929]">
        Your summary of collateral data report has been successfully generated.
      </div>
      <div className="flex justify-end mt-3">
        <Button
          text="Save report"
          className="px-4 !w-[20%]  !text-[14px] bg-white border border-gray-400 rounded-[10px] mr-2"
        />
        <Button
          text="Download report"
          className="bg-[#166E94] !text-[14px] !w-[30%]  text-white px-4 py-2 rounded-[10px]"
        />
      </div>
    </>
  );
}

export default GenerateReportSuccess;
