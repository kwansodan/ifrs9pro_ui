import { useActionState, useState } from "react";
import Button from "../../components/button/_component";
import { SendFeedback } from "../../core/services/feedback.service";
import { showToast } from "../../core/hooks/alert";

function ShareFeedback({ cancel }: any) {
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

  const submit = async (prevState: any, formData: FormData) => {
    setButtonLoading(true);
    console.log("prev: ", prevState);
    const description = formData.get("description") as string | null;
    if (!description) {
      showToast("Please enter description", false);
      setButtonLoading(false);
      return;
    }

    const payload = { description };
    try {
      SendFeedback(payload)
        .then((res) => {
          showToast(res.data.message ?? "Operation successful", true);
          setButtonLoading(false);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((err) => {
          setButtonLoading(false);
          showToast(err?.response?.data.detail[0].msg, false);
        });
    } catch {
      setButtonLoading(false);
      showToast("Login failed. Please try again.", false);
      return;
    }
  };
  const [state, formAction] = useActionState(submit, null);
  console.log("state: ", state);
  return (
    <>
      <div className="bg-white min-w-[500px] rounded-[20px]">
        <form action={formAction}>
          <div className="p-8 ">
            <div className="mt-3">
              <textarea
                name="description"
                placeholder="Leave feedback here"
                className="w-full h-[100px] text-[14px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-[#166E94]"
              />
            </div>
          </div>
          <hr />
          <div className="flex justify-end p-2">
            <div
              onClick={() => cancel()}
              className="flex items-center justify-center cursor-pointer bg-white !py-0 mr-3 border-[1px] border-[#6F6F6F] font-normal mt-3 text-[#6F6F6F] text-[12px] !rounded-[10px] !w-[90px] "
            >
              Cancel
            </div>

            <Button
              text="Submit"
              isLoading={buttonLoading}
              className="bg-[#166E94] font-normal mt-3 text-white text-[12px] !rounded-[10px] !w-[90px] "
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default ShareFeedback;
