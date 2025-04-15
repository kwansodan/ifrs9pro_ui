import { useState } from "react";
import Button from "../../components/button/_component";
import { showToast } from "../../core/hooks/alert";
import { AddCommentToQualityIssue } from "../../core/services/portfolio.service";

function Comment({ close, issue_id, portfolio_id }: any) {
  const [saving, setIsSaving] = useState<boolean>(false);
  const handleSumit = () => {
    setIsSaving(true);
    let comment = (
      document.getElementById("comment-field") as HTMLTextAreaElement
    )?.value;
    if (!comment) {
      showToast("All field are required.", false);
      setIsSaving(false);
      return;
    }
    AddCommentToQualityIssue(portfolio_id, issue_id, { comment })
      .then((res) => {
        setIsSaving(false);
        showToast(res.data.message ?? "Operation successful", true);
        close();
      })
      .catch((err) => {
        setIsSaving(false);
        showToast(
          err?.response?.data.detail ?? "An error occurred, please try again",
          false
        );
      });
  };

  return (
    <>
      <hr className="my-6" />

      <div className="flex flex-col">
        <label className="font-medium text-[#1E1E1E]" htmlFor="">
          Comment
        </label>
        <textarea
          id="comment-field"
          placeholder="Leave comment here"
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
          onClick={handleSumit}
          text={"Save"}
          type="submit"
          isLoading={saving}
          className="!text-center gap-2 py-2 font-normal !text-[14px] text-white !w-[120px] bg-[#166E94]"
        />
      </div>
    </>
  );
}

export default Comment;
