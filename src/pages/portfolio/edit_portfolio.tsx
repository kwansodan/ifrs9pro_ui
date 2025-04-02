import React, { useActionState, useState } from "react";
import Select from "react-select";
import { showToast } from "../../core/hooks/alert";
import { CreatePortfolioApi } from "../../core/services/portfolio.service";
import {
  assetsOptions,
  customerTypeOptions,
  dataSourceOptions,
  fundingSourceOptions,
} from "../../data";
import Button from "../../components/button/_component";
import { CategoryProps } from "../../core/interfaces";
import { Images } from "../../data/Assets";
import { usePortfolio } from "../../core/hooks/portfolio";
import { useParams } from "react-router-dom";
import PageLoader from "../../components/page_loader/_component";

function EditPortfolio() {
  const { id } = useParams();

  const { portfolioQuery } = usePortfolio(Number(id));
  const [selectedAsset, setSelectedAsset] = useState<string>("");
  const [repaymentValue, setRepaymentValue] = useState<boolean>(false);
  const [isSubmittingFirstStep, setIsSubmittingFirstStep] =
    useState<boolean>(false);
  const [assetHasChanged, setAssetHasChanged] = useState<boolean>(false);
  const [customerTypeHasChanged, setCustomerTypeHasChanged] =
    useState<boolean>(false);
  const [fundingSourceHasChanged, setFundingSourceHasChanged] =
    useState<boolean>(false);
  const [dataSourceHasChanged, setDataSourceHasChanged] =
    useState<boolean>(false);

  const [selectedCustomerType, setSelectedCustomerType] = useState<string>("");
  const [selectedFundingSource, setSelectedFundingSource] =
    useState<string>("");
  const [selectedDataSource, setSelectedDataSource] = useState<string>("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [fourthEditingIndex, setFourthEditingIndex] = useState<number | null>(
    null
  );

  const [categories, setCategories] = useState<CategoryProps[]>([
    { category: "Current", range: "0-30" },
    { category: "OLEM", range: "31-89" },
    { category: "Substandard", range: "90-179" },
    { category: "Doubtful", range: "180-359" },
    { category: "Loss", range: "360+" },
  ]);

  const [fourthCategories, setFourthCategories] = useState<CategoryProps[]>([
    { category: "stage_1", range: "0-30" },
    { category: "stage_2", range: "31-89" },
    { category: "stage_3", range: "90-179" },
  ]);

  const handleFourthEditClick = (index: number) => {
    setFourthEditingIndex(index);
  };

  const handleFourthToggle = () => {
    setFourthEditingIndex(null);
  };

  const handleFourthInputChange = (
    index: number,
    field: keyof CategoryProps,
    value: string
  ) => {
    const updatedCategories = [...categories];
    updatedCategories[index][field] = value;
    setFourthCategories(updatedCategories);
  };

  const handleAssetChange = (selectedOption: any) => {
    setSelectedAsset(selectedOption.value);
    setAssetHasChanged(true);
  };

  const handleCustomerTypeChange = (selectedOption: any) => {
    setSelectedCustomerType(selectedOption.value);
    setCustomerTypeHasChanged(true);
  };

  const handleFundingSourceChange = (selectedOption: any) => {
    setSelectedFundingSource(selectedOption.value);
    setFundingSourceHasChanged(true);
  };

  const handleDataSourceChange = (selectedOption: any) => {
    setSelectedDataSource(selectedOption.value);
    setDataSourceHasChanged(true);
  };

  const handleRepaymentToggle = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRepaymentValue(event.target.checked);
  };

  const handleInputChange = (
    index: number,
    field: keyof CategoryProps,
    value: string
  ) => {
    const updatedCategories = [...categories];
    updatedCategories[index][field] = value;
    setCategories(updatedCategories);
  };

  const handleToggle = () => {
    setEditingIndex(null);
  };

  const handleEditClick = (index: number) => {
    setEditingIndex(index);
  };

  const handleSubmit = async (prevState: any, formData: FormData) => {
    console.log("prev: ", prevState);
    setIsSubmittingFirstStep(true);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const credit_source = formData.get("credit_source") as string;
    const loan_assets = formData.get("loan_assets") as string;
    const ecl_impairment_account = formData.get(
      "ecl_impairment_account"
    ) as string;
    const assetType = selectedAsset as string;
    const customerType = selectedCustomerType as string;
    const fundingSource = selectedFundingSource as string;
    const dataSource = selectedDataSource as string;
    const repaymentSource = repaymentValue as boolean;
    const payload = {
      name,
      description,
      credit_source,
      loan_assets,
      ecl_impairment_account,
      asset_type: assetHasChanged ? assetType : data?.asset_type,
      customer_type: customerTypeHasChanged
        ? customerType
        : data?.customer_type,
      funding_source: fundingSourceHasChanged
        ? fundingSource
        : data?.funding_source,
      data_source: dataSourceHasChanged ? dataSource : data?.data_source,
      repayment_source: repaymentSource,
    };
    if (
      !name ||
      !description ||
      !credit_source ||
      !loan_assets ||
      !ecl_impairment_account ||
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
          }
        })
        .catch((err) => {
          setIsSubmittingFirstStep(false);
          showToast(err?.response?.data.detail, false);
        });
    } catch (err) {
      setIsSubmittingFirstStep(false);
      return;
    }
  };

  const [state, formAction] = useActionState(handleSubmit, null);
  console.log("state: ", state);
  const data =
    portfolioQuery && portfolioQuery.data && portfolioQuery.data.data;
  return (
    <>
      {portfolioQuery?.isLoading ? (
        <>
          <div className="flex items-center justify-center h-screen">
            <PageLoader />
          </div>
        </>
      ) : (
        <>
          <form action={formAction}>
            <div className="p-8">
              <div className="grid grid-cols-3 gap-4">
                <div className="mt-3">
                  <label>Portfolio name</label>
                  <input
                    type="name"
                    name="name"
                    defaultValue={data && data?.name}
                    placeholder="Enter portfolio name"
                    className="w-full  text-[14px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-[#166E94]"
                  />
                </div>
                <div className="mt-3">
                  <label>Description</label>
                  <textarea
                    name="description"
                    defaultValue={data && data?.description}
                    placeholder="Enter portfolio description"
                    className="w-full h-[100px] text-[14px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-[#166E94]"
                  />
                </div>
                <div className="mt-3">
                  <label>Asset type</label>
                  <Select
                    className="min-w-[280px] mr-2"
                    onChange={handleAssetChange}
                    options={assetsOptions}
                    placeholder={(data && data.asset_type) || ""}
                  />
                </div>
                <div className="mt-3">
                  <label>Customer type</label>
                  <Select
                    className="min-w-[280px] mr-2"
                    onChange={handleCustomerTypeChange}
                    options={customerTypeOptions}
                    placeholder={(data && data.customer_type) || ""}
                  />
                </div>

                <div className="mt-3">
                  <label>Funding source</label>
                  <Select
                    className="min-w-[280px] mr-2"
                    onChange={handleFundingSourceChange}
                    options={fundingSourceOptions}
                    placeholder={(data && data.funding_source) || ""}
                  />
                </div>
                <div className="mt-3">
                  <label>Data source</label>
                  <Select
                    className="min-w-[280px] mr-2"
                    onChange={handleDataSourceChange}
                    options={dataSourceOptions}
                    placeholder={(data && data.data_source) || ""}
                  />
                </div>
                <div className="mt-3">
                  <label>Credit source</label>
                  <input
                    type="name"
                    name="credit_source"
                    defaultValue={(data && data.credit_source) || ""}
                    className="w-full  text-[14px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-[#166E94]"
                  />
                </div>
              </div>

              <div className="flex items-center mt-3">
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
            <hr className="my-6" />
            <div className="grid grid-cols-3 gap-3">
              <div className="mt-3">
                <label>Credit risk reserve</label>
                <input
                  type="text"
                  name="credit_source"
                  defaultValue={(data && data.credit_risk_reserve) || ""}
                  className="w-full  text-[14px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-[#166E94]"
                />
              </div>
              <div className="mt-3">
                <label>Loan assetss</label>
                <input
                  type="name"
                  name="loan_assets"
                  defaultValue={(data && data.loan_assets) || ""}
                  className="w-full  text-[14px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-[#166E94]"
                />
              </div>
              <div className="mt-3">
                <label>Ecl impairment account</label>
                <input
                  type="name"
                  name="ecl_impairment_account"
                  defaultValue={(data && data.ecl_impairment_account) || ""}
                  className="w-full  text-[14px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-[#166E94]"
                />
              </div>
            </div>
            <hr className="my-6" />
            <table className="w-full border rounded-lg">
              <thead>
                <tr className="text-left text-gray-700 bg-gray-100">
                  <th className="p-3">Category</th>
                  <th className="p-3">Days range</th>
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody>
                {categories.map((item, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="p-3">{item.category}</td>

                    <td className="p-3">
                      <input
                        type="text"
                        className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        value={item.range}
                        disabled={editingIndex !== index}
                        onChange={(e) =>
                          handleInputChange(index, "range", e.target.value)
                        }
                      />
                    </td>

                    {/* Rate input field
                        <td className="p-3">
                          <input
                            type="text"
                            className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                            value={item.rate}
                            disabled={editingIndex !== index}
                            onChange={(e) =>
                              handleInputChange(index, "rate", e.target.value)
                            }
                          />
                        </td> */}

                    <td className="p-3 text-gray-500 cursor-pointer hover:text-gray-700">
                      {editingIndex === index ? (
                        <img
                          src={Images.edit}
                          className="w-[14px] h-[14px]"
                          alt=""
                          onClick={handleToggle}
                        />
                      ) : (
                        <img
                          src={Images.edit}
                          className="w-[14px] h-[14px]"
                          alt=""
                          onClick={() => handleEditClick(index)}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <hr className="my-6" />

            <table className="w-full border rounded-lg">
              <thead>
                <tr className="text-left text-gray-700 bg-gray-100">
                  <th className="p-3">Category</th>
                  <th className="p-3">Days range</th>
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody>
                {fourthCategories.map((item, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="p-3">{item.category}</td>

                    <td className="p-3">
                      <input
                        type="text"
                        className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        value={item.range}
                        disabled={editingIndex !== index}
                        onChange={(e) =>
                          handleFourthInputChange(
                            index,
                            "range",
                            e.target.value
                          )
                        }
                      />
                    </td>

                    <td className="p-3 text-gray-500 cursor-pointer hover:text-gray-700">
                      {fourthEditingIndex === index ? (
                        <img
                          src={Images.edit}
                          className="w-[14px] h-[14px]"
                          alt=""
                          onClick={handleFourthToggle}
                        />
                      ) : (
                        <img
                          src={Images.edit}
                          className="w-[14px] h-[14px]"
                          alt=""
                          onClick={() => handleFourthEditClick(index)}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end p-2">
              <Button
                isLoading={isSubmittingFirstStep}
                text="Edit"
                type="submit"
                className="bg-[#166E94] font-normal mt-3 text-white text-[12px] !rounded-[10px] !w-[90px] "
              />
            </div>
          </form>
        </>
      )}
    </>
  );
}

export default EditPortfolio;
