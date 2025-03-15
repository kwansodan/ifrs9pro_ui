import { useActionState } from "react";
import { showToast } from "../../core/hooks/alert";
import { CreateSecondStepPortfolioApi } from "../../core/services/portfolio.service";
import Button from "../button/_component";
import { useNavigate } from "react-router-dom";
function SecondStep({ close, id, setStep }: any) {
  const navigate = useNavigate();
  const handleSubmit = async (prevState: any, formData: FormData) => {
    console.log("prev: ", prevState);
    const creditReserve = formData.get("credit_source") as string;
    const loanAssets = formData.get("loan_assets") as string;
    const eclImpairmentAccount = formData.get(
      "ecl_impairment_account"
    ) as string;

    const payload = {
      name,
      creditReserve,
      loanAssets,
      eclImpairmentAccount,
    };
    if (!creditReserve || !loanAssets || !eclImpairmentAccount) {
      showToast("Please fill in all fields.", false);
      return { success: false, error: "All fields are required." };
    }
    if (!id) {
      showToast("Please create first step of portfolio.", false);
      return { success: false, error: "Portfolio id is required." };
    }
    try {
      CreateSecondStepPortfolioApi(id, payload)
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            showToast("Second step of portfolio created successfully.", true);
            console.log("res: ", res);
            setStep(2);
            setTimeout(() => {
              navigate("/dashboard/portfolio");
            }, 1000);
          }
        })
        .catch((err) => {
          showToast(err?.response?.data.detail, false);
        });
    } catch (err) {
      showToast("Login failed. Please try again.", false);
      return { success: false, error: "Login failed. Please try again." };
    }
  };

  const [state, formAction] = useActionState(handleSubmit, null);
  console.log("state: ", state);
  return (
    <div className="bg-white min-w-[500px] rounded-[20px]">
      <form action={formAction}>
        <div className="p-8 ">
          <div className="mt-3">
            <label>Credit risk reserve</label>
            <input
              type="text"
              name="credit_source"
              placeholder="B5938492"
              className="w-full h-[4%] text-[14px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-[#166E94]"
            />
          </div>
          <div className="mt-3">
            <label>Loan assets</label>
            <input
              type="text"
              name="loan_assets"
              placeholder="A000567"
              className="w-full h-[4%] text-[14px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-[#166E94]"
            />
          </div>
          <div className="mt-3">
            <label>ECL impairment account</label>
            <input
              type="text"
              name="ecl_impairment_account"
              placeholder="C98342432"
              className="w-full h-[4%] text-[14px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-[#166E94]"
            />
          </div>
        </div>
        <hr />
        <div className="flex justify-end p-2">
          <div
            onClick={() => close()}
            className="bg-white cursor-pointer flex justify-center items-center !py-0 mr-3 border-[1px] border-[#6F6F6F] font-normal mt-3 text-[#6F6F6F] text-[12px] !rounded-[10px] !w-[90px]"
          >
            Cancel
          </div>
          <Button
            text="Create"
            //   onClick={() => {
            //     setOpenSecondStepCreatePortfolio(true);
            //   }}
            className="bg-[#166E94] font-normal mt-3 text-white text-[12px] !rounded-[10px] !w-[90px] "
          />
        </div>
      </form>
    </div>
  );
}

export default SecondStep;
