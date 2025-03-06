import Select from "react-select";
import { reportTypeOptions } from "../../data";
import Button from "../../components/button/_component";
import { UploadDataProps } from "../../core/interfaces";
function GenerateReport({ close }: UploadDataProps) {
  return (
    <>
      <div className="mt-3 leading-9">
        <label className="text-[#1E1E1E] text-[14px] font-medium">
          Report date
        </label>
        <div className="w-full ">
          <input
            placeholder="Select a date"
            className="w-full border rounded-[10px] border-gray-300 px-[6px] py-[5px] focus:outline-[#166E94] text-gray-400"
            type="date"
          />
        </div>
        <label className="text-[#1E1E1E] text-[14px] font-medium">
          Report type
        </label>
        <Select
          className="w-full"
          onChange={() => {}}
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
          text="Generate"
          className="bg-[#166E94] !text-[14px] !w-[90px] text-white px-4 py-2 rounded-[10px]"
        />
      </div>
    </>
  );
}

export default GenerateReport;
