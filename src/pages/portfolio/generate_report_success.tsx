function GenerateReportSuccess({ report_type }: any) {
  return (
    <>
      <div className="bg-white min-h-[200px] min-w-[600px] pt-5 pb-3 px-16 rounded-[20px]">
        <div className="max-w-[580px] mt-3 p-[18px] text-[#1E1E1E] text-[14px] font-medium rounded-[10px] bg-[#D9EFF929]">
          Your {report_type} report has been successfully generated.
          <br />
          <span className="text-blue-500">
            Scroll to report history to download it.
          </span>
        </div>
        <div className="flex justify-end mt-3">
          {/* <Button
            onClick={handleSubmit}
            text="Save report"
            isLoading={save}
            className="px-4 !w-[30%]  !text-[14px] bg-white border border-gray-400 rounded-[10px] mr-2"
          /> */}
          {/* <Button
            text="Download report"
            onClick={() => downloadDocument()}
            className="bg-[#166E94] !text-[14px] !w-[30%]  text-white px-4 py-2 rounded-[10px]"
          /> */}
        </div>
      </div>
    </>
  );
}

export default GenerateReportSuccess;
