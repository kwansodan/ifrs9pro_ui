import { useState } from "react";
import Button from "../../components/button/_component";
import { showToast } from "../../core/hooks/alert";
import { UploadDataProps } from "../../core/interfaces";
import { DeleteAFeedback } from "../../core/services/feedback.service";
function DeleteFeedback({ close, rowId }: UploadDataProps) {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const confirmDelete = () => {
    setIsDeleting(true);
    DeleteAFeedback(Number(rowId))
      .then(() => {
        setIsDeleting(false);
        showToast("Operation successful", true);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        setIsDeleting(false);
        showToast(err?.response?.data.detail, false);
      });
  };
  return (
    <>
      <div className="p-8 bg-white">
        <p className="text-[#1E1E1E] text-[14px] my-8">
          Are you sure you want to delete this? This action cannot be undone
        </p>

        <div className="flex justify-end mt-3">
          <Button
            text="Cancel"
            onClick={close}
            className="px-4 !w-[90px]  !text-[14px] bg-white border border-gray-400 rounded-[10px] mr-2"
          />
          <Button
            onClick={confirmDelete}
            isLoading={isDeleting}
            text="Delete"
            className="bg-[#FF3B30] !text-[14px] !w-[90px] text-white px-4 py-2 rounded-[10px]"
          />
        </div>
      </div>
    </>
  );
}

export default DeleteFeedback;
