import Button from "../../components/button/_component";
import { UploadDataProps } from "../../core/interfaces";

function EditComment({ close }: UploadDataProps) {
  return (
    <>
      <hr className="my-6" />

      <div className="flex flex-col">
        <label className="font-medium text-[#1E1E1E]" htmlFor="">
          Comment
        </label>
        <textarea
          placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut "
          className="min-w-[580px] h-[80px] text-[14px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-[#166E94]"
        />
      </div>
      <hr className="my-6" />
      <div className="flex items-center justify-end">
        <Button
          text="Cancel"
          onClick={close}
          className="bg-white !text-center gap-2 py-2 font-normal rounded-[10px] border-[1px] mr-2 !text-[14px] text-[#6F6F6F] !w-[120px] border-[#6F6F6F] "
        />
        <Button
          text={"Edit"}
          className="!text-center gap-2 py-2 font-normal !text-[14px] text-white !w-[120px] bg-[#166E94]"
        />
      </div>
    </>
  );
}

export default EditComment;
