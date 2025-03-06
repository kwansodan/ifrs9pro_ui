import Button from "../../components/button/_component";
import Upload from "../../components/upload/_component";
import { UploadDataProps } from "../../core/interfaces";

function UploadData({ close }: UploadDataProps) {
  return (
    <>
      <Upload UploadTitle="Import loan details" />
      <Upload UploadTitle="Import loan guarantee data" />
      <Upload UploadTitle="Import loan collateral data" />
      <Upload UploadTitle="Import historical repayments data" />
      <div className="flex justify-end mt-2">
        <Button
          text="Cancel"
          onClick={close}
          className="bg-white !py-0 mr-3 border-[1px] border-[#6F6F6F] font-normal text-[#6F6F6F] text-[12px] !rounded-[10px] !w-[90px] "
        />
        <Button
          text="Done"
          // onClick={() => setStep(2)}
          className="bg-[#166E94] font-normal text-white text-[12px] !rounded-[10px] !w-[90px] "
        />
      </div>
    </>
  );
}

export default UploadData;
