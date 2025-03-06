import Select from "react-select";
import { reportTypeOptions } from "../../data";
import Button from "../../components/button/_component";
import { UploadDataProps } from "../../core/interfaces";
function NewUser({ close }: UploadDataProps) {
  return (
    <>
      <div className="p-8">
        <div className="mt-3 leading-9">
          <label className="text-[#1E1E1E] text-[14px] font-medium">
            User name
          </label>
          <input
            type="email"
            placeholder="Enter user name"
            className="w-full h-[4%] text-[14px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-[#166E94]"
            // onChange={(e) => setEmailValue(e.target.value)}
          />
          <label className="text-[#1E1E1E] text-[14px] font-medium">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter email address"
            className="w-full h-[4%] text-[14px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-[#166E94]"
            // onChange={(e) => setEmailValue(e.target.value)}
          />
          <label className="text-[#1E1E1E] text-[14px] font-medium">Role</label>
          <Select
            className="w-full"
            onChange={() => {}}
            options={reportTypeOptions}
            id="asset-type"
            placeholder="Select role"
          />

          <label className="text-[#1E1E1E] text-[14px] font-medium">
            Assign portfolio
          </label>
          <Select
            className="w-full"
            onChange={() => {}}
            options={reportTypeOptions}
            id="asset-type"
            placeholder="Select portfolio"
          />
        </div>

        <div className="flex justify-end mt-3">
          <Button
            text="Cancel"
            onClick={close}
            className="px-4 !w-[90px]  !text-[14px] bg-white border border-gray-400 rounded-[10px] mr-2"
          />
          <Button
            text="Save"
            className="bg-[#166E94] !text-[14px] !w-[90px] text-white px-4 py-2 rounded-[10px]"
          />
        </div>
      </div>
    </>
  );
}

export default NewUser;
