import { useActionState, useState } from "react";
import { showToast } from "../../core/hooks/alert";
import { CreateSecondStepPortfolioApi } from "../../core/services/portfolio.service";
import Button from "../button/_component";
function SecondStep({ close, id, setStep }: any) {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const handleSubmit = async (prevState: any, formData: FormData) => {
    setIsCreating(true);
    console.log("prev: ", prevState);
    const credit_risk_reserve = formData.get("credit_risk_reserve") as string;
    const loan_assets = formData.get("loan_assets") as string;
    const ecl_impairment_account = formData.get(
      "ecl_impairment_account"
    ) as string;

    const payload = {
      credit_risk_reserve,
      loan_assets,
      ecl_impairment_account,
    };
    if (!credit_risk_reserve || !loan_assets || !ecl_impairment_account) {
      showToast("Please fill in all fields.", false);
      setIsCreating(false);
      return;
    }
    if (!id) {
      showToast("Please create first step of portfolio.", false);
      setIsCreating(false);
      return;
    }
    try {
      CreateSecondStepPortfolioApi(id, payload)
        .then((res) => {
          setIsCreating(false);
          if (res.status === 200 || res.status === 201) {
            showToast("Second step of portfolio created successfully.", true);
            setStep(3);
          }
        })
        .catch((err) => {
          console.log("err: ", err);
          setIsCreating(false);
          showToast(
            err?.response?.data.detail[0].msg ??
              "An error occured. Please try again",
            false
          );
        });
    } catch (err) {
      showToast("An error occured. Please try again", false);
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
              name="credit_risk_reserve"
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
            text="Next"
            //   onClick={() => {
            //     setOpenSecondStepCreatePortfolio(true);
            //   }}
            isLoading={isCreating}
            className="bg-[#166E94] font-normal mt-3 text-white text-[12px] !rounded-[10px] !w-[90px] "
          />
        </div>
      </form>
    </div>
  );
}

export default SecondStep;
