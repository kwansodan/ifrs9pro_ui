import { FilterTrayProps } from "../../core/interfaces";
import Button from "../button/_component";
import { useNavigate } from "react-router-dom";

function FilterTray({ closeFilter }: FilterTrayProps) {
  const navigate = useNavigate();
  return (
    <>
      <div className="absolute p-6 mt-2 bg-white rounded-lg shadow-lg right-[32rem] top-[8rem] w-96 z-50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[16px] font-semibold">Filter by</h2>
          <hr className="border-[1px] border-gray-400" />
          <span onClick={closeFilter} className="text-gray-500 cursor-pointer">
            &times;
          </span>
        </div>

        <div className="mb-4 text-[13px]">
          <label className="block font-medium">Asset type</label>
          <div className="flex gap-4 mt-2">
            <label className="flex items-center  border-[1px] border-[#EAEAEA] px-[9px] py-[3px] rounded-[8px]">
              <input type="checkbox" className="mr-2" /> Debt
            </label>
            <label className="flex items-center  border-[1px] border-[#EAEAEA] px-[9px] py-[3px] rounded-[8px]">
              <input type="checkbox" className="mr-2" /> Equity
            </label>
          </div>
        </div>

        <div className="mb-4 text-[13px]">
          <label className="block font-medium">Calculation status</label>
          <div className="flex gap-4 mt-2">
            <label className="flex items-center  border-[1px] border-[#EAEAEA] px-[9px] py-[3px] rounded-[8px]">
              <input type="checkbox" className="mr-2" /> ECL calculated
            </label>
            <label className="flex items-center  border-[1px] border-[#EAEAEA] px-[9px] py-[3px] rounded-[8px]">
              <input type="checkbox" className="mr-2" /> BOG calculated
            </label>
          </div>
        </div>

        <div className="mb-4 text-[13px]">
          <label className="block font-medium">Funding source</label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <label className="flex items-center  border-[1px] border-[#EAEAEA] px-[9px] py-[3px] rounded-[8px]">
              <input type="checkbox" className="mr-2" /> Private investors
            </label>
            <label className="flex items-center  border-[1px] border-[#EAEAEA] px-[9px] py-[3px] rounded-[8px]">
              <input type="checkbox" className="mr-2" /> Pension fund
            </label>
            <label className="flex items-center  border-[1px] border-[#EAEAEA] px-[9px] py-[3px] rounded-[8px]">
              <input type="checkbox" className="mr-2" /> Mutual fund
            </label>
            <label className="flex items-center  border-[1px] border-[#EAEAEA] px-[9px] py-[3px] rounded-[8px]">
              <input type="checkbox" className="mr-2" /> Other funds
            </label>
          </div>
        </div>

        <div className="w-full ">
          <input
            placeholder="Select a date"
            className="w-full border rounded-[10px] border-gray-300 px-[6px] py-[5px] focus:outline-[#166E94] text-gray-400"
            type="date"
          />
          {/* <img
            className="w-[14px] h-[14px] absolute right-3 top-3"
            src={Images.calendar}
            alt=""
            onClick={() => setInputType("date")}
          /> */}
        </div>

        <div className="flex justify-end gap-2 mt-3">
          <Button
            text="Cancel"
            onClick={closeFilter}
            className="px-4 w-[90px] py-2 bg-white border border-gray-400 rounded-lg"
          />
          <Button
            text="Apply"
            onClick={() => navigate("/dashboard/filtered-results")}
            className="bg-[#166E94] w-[90px] text-white px-4 py-2 rounded-lg"
          />
        </div>
      </div>
    </>
  );
}

export default FilterTray;
