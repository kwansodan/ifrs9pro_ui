import Button from "../../components/button/_component";
import { UploadDataProps } from "../../core/interfaces";
import { useActionState, useEffect, useState } from "react";
import { showToast } from "../../core/hooks/alert";
import { useGetAFeedback } from "../../core/hooks/feedback";
import { UpdateFeedback } from "../../core/services/feedback.service";
import Select from "react-select";
import { feedbackStatuses } from "../../data";
function EditFeedback({ close, rowId }: UploadDataProps) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedFeedback, setSelectedFeedback] = useState<string>("");

  useEffect(() => {
    aFeedBackQuery.refetch();
  }, [rowId && rowId]);
  const { aFeedBackQuery } = useGetAFeedback(Number(rowId));
  const handleSubmit = async (prevState: any) => {
    console.log("prev: ", prevState);
    setIsSubmitting(true);
    const payload = {
      status: selectedFeedback.toLocaleLowerCase(),
    };

    if (!selectedFeedback) {
      showToast("Please select status.", false);
      setIsSubmitting(false);
      return;
    }

    try {
      UpdateFeedback(Number(rowId), payload)
        .then((res) => {
          console.log("res: ", res);
          setIsSubmitting(false);
          showToast("Edit done successfully", true);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((err) => {
          setIsSubmitting(false);
          showToast(err?.response?.data.detail[0].msg, false);
        });
    } catch (err) {
      setIsSubmitting(false);
      showToast("User creation failed. Please try again", false);
    }
  };
  const handleFeedbackChange = (selectedOption: any) => {
    setSelectedFeedback(selectedOption.value);
  };

  const [state, formAction] = useActionState(handleSubmit, null);
  console.log("state: ", state);
  return (
    <>
      <div className="p-8 bg-white">
        <form action={formAction}>
          <div className="p-8 ">
            {/* {aFeedBackQuery?.isFetching ? (
              <>
                <TextLoader />
              </>
            ) : (
              <>
                <div className="mt-3">
                  <textarea
                    name="description"
                    disabled
                    defaultValue={
                      aFeedBackQuery &&
                      aFeedBackQuery.data &&
                      aFeedBackQuery.data.data &&
                      aFeedBackQuery.data.data.description
                    }
                    className="w-96 h-[100px] text-[14px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-[#166E94]"
                  />
                </div>
              </>
            )} */}

            <label className="text-[#1E1E1E] text-[14px] font-medium">
              Status
            </label>
            <Select
              className="w-80 "
              onChange={handleFeedbackChange}
              options={feedbackStatuses}
              id="asset-type"
              placeholder="Select status"
            />
          </div>
          <hr />
          <div className="flex justify-end p-2">
            <div
              onClick={close}
              className="flex items-center justify-center cursor-pointer bg-white !py-0 mr-3 border-[1px] border-[#6F6F6F] font-normal mt-3 text-[#6F6F6F] text-[12px] !rounded-[10px] !w-[90px] "
            >
              Cancel
            </div>

            <Button
              text="Submit"
              isLoading={isSubmitting}
              className="bg-[#166E94] font-normal mt-3 text-white text-[12px] !rounded-[10px] !w-[90px] "
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default EditFeedback;
