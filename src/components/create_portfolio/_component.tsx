import Select from "react-select";
import {
  assetsOptions,
  customerTypeOptions,
  dataSourceOptions,
  fundingSourceOptions,
} from "../../data";
import Button from "../button/_component";
import { useActionState, useState } from "react";
import { Modal } from "../modal/_component";
import SecondStep from "./second_step";
import { CreatePortfolioApi } from "../../core/services/portfolio.service";
import { showToast } from "../../core/hooks/alert";

function CreatePorfolio({ cancel }: any) {
  const [step, setStep] = useState<number>(1);
  const [openSecondStepCreatePortfolio, setOpenSecondStepCreatePortfolio] =
    useState<boolean>(false);
  const [selectedAsset, setSelectedAsset] = useState<string>();
  const [repaymentValue, setRepaymentValue] = useState<boolean>();
  const [selectedCustomerType, setSelectedCustomerType] = useState<string>();
  const [selectedFundingSource, setSelectedFundingSource] = useState<string>();
  const [selectedDataSource, setSelectedDataSource] = useState<string>();

  const handleAssetChange = (selectedOption: string) => {
    setSelectedAsset(selectedOption);
  };

  const handleCustomerTypeChange = (selectedOption: string) => {
    setSelectedCustomerType(selectedOption);
  };

  const handleFundingSourceChange = (selectedOption: string) => {
    setSelectedFundingSource(selectedOption);
  };

  const handleDataSourceChange = (selectedOption: string) => {
    setSelectedDataSource(selectedOption);
  };

  const handleRepaymentToggle = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRepaymentValue(event.target.checked);
  };

  const handleSubmit = async (prevState: any, formData: FormData) => {
    console.log("prev: ", prevState);
    const email = formData.get("email") as string | null;
    const password = formData.get("password") as string | null;
    if (!email || !password) {
      showToast("Email and password are required.", false);

      return { success: false, error: "Email and password are required." };
    }
    // if (email.toLocaleLowerCase() !== "admin@ifrs9pro.com") navigate("/");

    const payload = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      asset_type: selectedAsset as string,
      customer_type: selectedCustomerType as string,
      funding_source: selectedFundingSource as string,
      data_source: selectedDataSource as string,
      repayment_source: repaymentValue as boolean,
    };
    try {
      CreatePortfolioApi(payload)
        .then((res) => {
          if (res.status === 200) {
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
    <>
      <Modal
        close={() => setOpenSecondStepCreatePortfolio(false)}
        open={openSecondStepCreatePortfolio}
        modalHeader="Create Portfolio"
      ></Modal>
      <div className="bg-white min-w-[500px] rounded-[20px]">
        {step === 1 ? (
          <form action={formAction}>
            <div className="p-8 ">
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
              <div className="mt-3">
                <label>Asset type</label>
                <Select
                  className="w-full"
                  onChange={() => handleAssetChange}
                  options={assetsOptions}
                  id="asset-type"
                  placeholder="Select asset type"
                />
              </div>
              <div className="mt-3">
                <label>Customer type</label>
                <Select
                  className="w-full"
                  onChange={() => handleCustomerTypeChange}
                  options={customerTypeOptions}
                  id="customer-type"
                  placeholder="Select customer type"
                />
              </div>
              <div className="mt-3">
                <label>Funding source</label>
                <Select
                  className="w-full"
                  onChange={() => handleFundingSourceChange}
                  options={fundingSourceOptions}
                  id="funding-source"
                  placeholder="Select funding source"
                />
              </div>
              <div className="mt-3">
                <label>Data source</label>
                <Select
                  className="w-full"
                  onChange={() => handleDataSourceChange}
                  options={dataSourceOptions}
                  id="data-source"
                  placeholder="Select data source"
                />
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
              <Button
                text="Cancel"
                onClick={() => {
                  cancel();
                }}
                className="bg-white !py-0 mr-3 border-[1px] border-[#6F6F6F] font-normal mt-3 text-[#6F6F6F] text-[12px] !rounded-[10px] !w-[90px] "
              />
              <Button
                text="Next"
                onClick={() => setStep(2)}
                className="bg-[#166E94] font-normal mt-3 text-white text-[12px] !rounded-[10px] !w-[90px] "
              />
            </div>
          </form>
        ) : (
          <SecondStep close={() => cancel()} />
        )}
      </div>
    </>
  );
}

export default CreatePorfolio;
