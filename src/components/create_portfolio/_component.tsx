import Select from "react-select";
import {
  assetsOptions,
  customerTypeOptions,
  dataSourceOptions,
  fundingSourceOptions,
} from "../../data";
import Button from "../button/_component";
import { useActionState, useState } from "react";
import SecondStep from "./second_step";
import { CreatePortfolioApi } from "../../core/services/portfolio.service";
import { showToast } from "../../core/hooks/alert";
import ThirdStep from "./third_step";
import FourthStep from "./fourth_step";

function CreatePorfolio({ cancel }: any) {
  const [step, setStep] = useState<number>(4);
  const [portfolioId, setPortfolioId] = useState<string>("");
  const [selectedAsset, setSelectedAsset] = useState<string>("");
  const [repaymentValue, setRepaymentValue] = useState<boolean>(false);
  const [isSubmittingFirstStep, setIsSubmittingFirstStep] =
    useState<boolean>(false);
  const [selectedCustomerType, setSelectedCustomerType] = useState<string>("");
  const [selectedFundingSource, setSelectedFundingSource] =
    useState<string>("");
  const [selectedDataSource, setSelectedDataSource] = useState<string>("");

  const handleAssetChange = (selectedOption: any) => {
    setSelectedAsset(selectedOption.value);
  };

  const handleCustomerTypeChange = (selectedOption: any) => {
    setSelectedCustomerType(selectedOption.value);
  };

  const handleFundingSourceChange = (selectedOption: any) => {
    setSelectedFundingSource(selectedOption.value);
  };

  const handleDataSourceChange = (selectedOption: any) => {
    setSelectedDataSource(selectedOption.value);
  };

  const handleRepaymentToggle = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRepaymentValue(event.target.checked);
  };

  const handleSubmit = async (prevState: any, formData: FormData) => {
    console.log("prev: ", prevState);
    setIsSubmittingFirstStep(true);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    const assetType = selectedAsset as string;
    const customerType = selectedCustomerType as string;
    const fundingSource = selectedFundingSource as string;
    const dataSource = selectedDataSource as string;
    const repaymentSource = repaymentValue as boolean;
    const payload = {
      name,
      description,
      asset_type: assetType,
      customer_type: customerType,
      funding_source: fundingSource,
      data_source: dataSource,
      repayment_source: repaymentSource,
    };
    if (
      !name ||
      !description ||
      !assetType ||
      !customerType ||
      !fundingSource ||
      !dataSource
    ) {
      setIsSubmittingFirstStep(false);
      showToast("Please fill in all fields.", false);
      return;
    }

    try {
      CreatePortfolioApi(payload)
        .then((res) => {
          setIsSubmittingFirstStep(false);
          if (res.status === 200 || res.status === 201) {
            showToast("First step of portfolio created successfully.", true);
            setPortfolioId(res?.data?.id);

            setStep(2);
          } else {
            console.log(res);
            setIsSubmittingFirstStep(false);
            showToast("An error occurred. Please try again.", false);
          }
        })
        .catch((err) => {
          setIsSubmittingFirstStep(false);
          showToast(
            err?.response?.data.detail ??
              "An error occurred. Please try again.",
            false
          );
        });
    } catch (err) {
      setIsSubmittingFirstStep(false);
      showToast("An error occurred. Please try again.", false);
      return;
    }
  };

  const [state, formAction] = useActionState(handleSubmit, null);
  console.log("state: ", state);

  const handleSetSecondStep = (step: any) => {
    setStep(step);
  };
  const handleSetThirdStep = (step: any) => {
    setStep(step);
  };
  const handleSetFourthStep = (step: any) => {
    setStep(step);
  };
  return (
    <>
      <div className="bg-white min-w-[550px] rounded-[20px]">
        {step === 1 && (
          <form action={formAction}>
            <div className="p-8">
              <div className="mt-3">
                <label>Portfolio name</label>
                <input
                  type="name"
                  name="name"
                  placeholder="Enter portfolio name"
                  className="w-full h-[4%] text-[14px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-[#166E94]"
                />
              </div>
              <div className="mt-3">
                <label>Description</label>
                <textarea
                  name="description"
                  placeholder="Enter portfolio description"
                  className="w-full h-[100px] text-[14px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-[#166E94]"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="mt-3">
                  <label>Asset type</label>
                  <Select
                    className="min-w-[280px] mr-2"
                    onChange={handleAssetChange}
                    options={assetsOptions}
                    placeholder="Select asset type"
                  />
                </div>
                <div className="mt-3">
                  <label>Customer type</label>
                  <Select
                    className="min-w-[280px] mr-2"
                    onChange={handleCustomerTypeChange}
                    options={customerTypeOptions}
                    placeholder="Select customer type"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="mt-3">
                  <label>Funding source</label>
                  <Select
                    className="min-w-[280px] mr-2"
                    onChange={handleFundingSourceChange}
                    options={fundingSourceOptions}
                    placeholder="Select funding source"
                  />
                </div>
                <div className="mt-3">
                  <label>Data source</label>
                  <Select
                    className="min-w-[280px] mr-2"
                    onChange={handleDataSourceChange}
                    options={dataSourceOptions}
                    placeholder="Select data source"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between mt-3">
                <div className="flex flex-col">
                  <label>Repayment source</label>
                  <span className="text-[#AFAFAF] text-[14px]">
                    Choose between manual transfer or at source
                  </span>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={repaymentValue}
                    onChange={handleRepaymentToggle}
                    className="sr-only peer"
                  />
                  <div className="w-[42px] h-[23px] bg-gray-200 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-[#D2D5DA] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#166E94]"></div>
                </label>
              </div>
            </div>
            <hr />
            <div className="flex justify-end p-2">
              <div
                onClick={() => cancel()}
                className="bg-white cursor-pointer flex justify-center items-center !py-0 mr-3 border-[1px] border-[#6F6F6F] font-normal mt-3 text-[#6F6F6F] text-[12px] !rounded-[10px] !w-[90px]"
              >
                Cancel
              </div>

              <Button
                isLoading={isSubmittingFirstStep}
                text="Next"
                type="submit"
                className="bg-[#166E94] font-normal mt-3 text-white text-[12px] !rounded-[10px] !w-[90px] "
              />
            </div>
          </form>
        )}

        {step === 2 && (
          <SecondStep
            setStep={handleSetSecondStep}
            id={portfolioId}
            close={() => cancel()}
          />
        )}
        {step === 3 && (
          <ThirdStep
            id={portfolioId}
            close={() => cancel()}
            setStep={handleSetThirdStep}
          />
        )}
        {step === 4 && (
          <FourthStep
            id={portfolioId}
            close={() => cancel()}
            setStep={handleSetFourthStep}
          />
        )}
      </div>
    </>
  );
}

export default CreatePorfolio;
