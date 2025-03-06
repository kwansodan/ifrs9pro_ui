import Select from "react-select";
import { assetsOptions } from "../../data";
import { Images } from "../../data/Assets";
import Button from "../../components/button/_component";
import { UploadDataProps } from "../../core/interfaces";
function CalculateEcl({ close }: UploadDataProps) {
  return (
    <>
      <div className="mt-3">
        <label className="text-[#1E1E1E] text-[14px] font-medium">
          Configure ECL
        </label>
        <Select
          className="w-full"
          onChange={() => {}}
          options={assetsOptions}
          id="asset-type"
          placeholder="Select asset type"
        />
        <div className="flex justify-between mt-4">
          <label className="mr-2">
            0 probability of default for government workers{" "}
          </label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-[42px] h-[23px] bg-gray-200 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-[#D2D5DA] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#166E94]"></div>
          </label>
        </div>
        <div className="bg-[#D9EFF929] mt-4">
          <h3 className="text-[#04161E] text-[14px] font-medium">
            Prediction features
          </h3>
          <p className="text-[14px] text-[#6F6F6F]">
            The following features will be used for ECL prediction
          </p>
        </div>
        <div className="leading-[30px]">
          <div className="flex items-center">
            <img
              src={Images.checkbox}
              alt=""
              className="w-[14px] h-[14px] mr-2"
            />
            <span>Historical payment behavior</span>
          </div>
          <div className="flex items-center">
            <img
              src={Images.checkbox}
              alt=""
              className="w-[14px] h-[14px] mr-2"
            />
            <span>Loan-to-value ratio</span>
          </div>
          <div className="flex items-center">
            <img
              src={Images.checkbox}
              alt=""
              className="w-[14px] h-[14px] mr-2"
            />
            <span>Delinquency history</span>
          </div>
        </div>
        <hr className="my-4" />
        <div className="flex justify-end mt-3">
          <Button
            text="Cancel"
            onClick={close}
            className="px-4 !w-[90px] !text-[14px] bg-white border border-gray-400 rounded-[10px] mr-2"
          />
          <Button
            text="Start prediction"
            className="bg-[#166E94] !text-[14px] !w-[150px] text-white px-4 py-2 rounded-[10px]"
          />
        </div>
      </div>
    </>
  );
}

export default CalculateEcl;
