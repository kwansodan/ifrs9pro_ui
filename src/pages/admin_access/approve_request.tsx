import Select from "react-select";
import { reportTypeOptions } from "../../data";
import Button from "../../components/button/_component";
import { UploadDataProps } from "../../core/interfaces";
function ApproveRequest({ close }: UploadDataProps) {
  return (
    <>
      <div className="p-8">
        <div className="mt-3 leading-9 min-w-[510px]">
          <label className="text-[#1E1E1E] text-[14px] font-medium">Role</label>
          <Select
            className="w-full"
            onChange={() => {}}
            options={reportTypeOptions}
            id="asset-type"
            placeholder="Select role"
          />
        </div>

        <div className="flex justify-end mt-3">
          <Button
            text="Cancel"
            onClick={close}
            className="px-4 !w-[90px]  !text-[14px] bg-white border border-gray-400 rounded-[10px] mr-2"
          />
          <Button
            text="Authorize"
            className="bg-[#166E94] !text-[14px] !w-[90px] text-white px-4 py-2 rounded-[10px]"
          />
        </div>
      </div>
    </>
  );
}

export default ApproveRequest;
