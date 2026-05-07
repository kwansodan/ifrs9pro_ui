import { useActionState, useState } from "react";
import { showToast } from "../../core/hooks/alert";
import { CreateSecondStepPortfolioApi } from "../../core/services/portfolio.service";
import { useTranslation } from "react-i18next";
import Button from "../button/_component";
function SecondStep({ close, id, setStep }: any) {
  const { t } = useTranslation();
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const handleSubmit = async (prevState: any, formData: FormData) => {
    setIsCreating(true);
    console.log("prev: ", prevState);
    const credit_risk_reserve = formData.get("credit_risk_reserve") as string;
    const loan_assets = formData.get("loan_assets") as string;
    const ecl_impairment_account = formData.get(
      "ecl_impairment_account",
    ) as string;

    const payload = {
      credit_risk_reserve,
      loan_assets,
      ecl_impairment_account,
    };
    if (!credit_risk_reserve || !loan_assets || !ecl_impairment_account) {
      showToast(t("secondStep.fillAllFields"), false);
      setIsCreating(false);
      return;
    }
    if (!id) {
      showToast(t("secondStep.createFirstStep"), false);
      setIsCreating(false);
      return;
    }
    try {
      CreateSecondStepPortfolioApi(id, payload)
        .then((res) => {
          setIsCreating(false);
          if (res.status === 200 || res.status === 201) {
            showToast(t("secondStep.success"), true);
            setStep(3);
          } else {
            setIsCreating(false);
            showToast(t("secondStep.errorOccurred"), false);
          }
        })
        .catch((err) => {
          setIsCreating(false);
          showToast(
            err?.response?.data.detail[0].msg ?? t("secondStep.serverError"),
            false,
          );
        });
    } catch (err) {
      showToast(t("secondStep.serverError"), false);
    }
  };

  const [state, formAction] = useActionState(handleSubmit, null);
  console.log("state: ", state);
  return (
    <div className="bg-white min-w-[500px] rounded-[20px]">
      <form action={formAction}>
        <div className="p-8 ">
          <div className="mt-3">
            <label>{t("secondStep.creditRiskReserve")}</label>
            <input
              type="text"
              name="credit_risk_reserve"
              placeholder={t("secondStep.creditRiskReservePlaceholder")}
              className="w-full h-[4%] text-[14px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-[#166E94]"
            />
          </div>
          <div className="mt-3">
            <label>{t("secondStep.loanAssets")}</label>
            <input
              type="text"
              name="loan_assets"
              placeholder={t("secondStep.loanAssetsPlaceholder")}
              className="w-full h-[4%] text-[14px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-[#166E94]"
            />
          </div>
          <div className="mt-3">
            <label>{t("secondStep.eclImpairmentAccount")}</label>
            <input
              type="text"
              name="ecl_impairment_account"
              placeholder={t("secondStep.eclImpairmentAccountPlaceholder")}
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
            {t("secondStep.cancel")}
          </div>
          <Button
            text={t("secondStep.next")}
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
