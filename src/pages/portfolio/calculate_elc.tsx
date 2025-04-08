import { UploadDataProps } from "../../core/interfaces";

import Button from "../../components/button/_component";
import { useState } from "react";
import { CreatePortfolioECLCalculation } from "../../core/services/portfolio.service";
import { useParams } from "react-router-dom";
import { showToast } from "../../core/hooks/alert";
import { Images } from "../../data/Assets";

function CalculateEcl({ close }: UploadDataProps) {
  const { id } = useParams();
  const [calculating, setCalculating] = useState<boolean>(false);
  // const [categories, setCategories] = useState<CategoryProps[]>([
  //   { category: "stage_1", range: "0-30" },
  //   { category: "stage_2", range: "31-89" },
  //   { category: "stage_3", range: "90-179" },
  // ]);

  // const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // const handleEditClick = (index: number) => {
  //   setEditingIndex(index);
  // };

  // const handleToggle = () => {
  //   setEditingIndex(null);
  // };

  // const handleInputChange = (
  //   index: number,
  //   field: keyof CategoryProps,
  //   value: string
  // ) => {
  //   const updatedCategories = [...categories];
  //   updatedCategories[index][field] = value;
  //   setCategories(updatedCategories);
  // };

  const handleSubmit = () => {
    setCalculating(true);
    const reportingDateElement = document.getElementById(
      "ecl_reporting_date"
    ) as HTMLInputElement | null;
    const reporting_date = reportingDateElement?.value ?? "";

    if (!id || !reporting_date) {
      setCalculating(false);
      showToast("All fields required", false);
      return;
    }
    // for (const item of categories) {
    //   const { category, range } = item;

    //   if (!range?.trim()) {
    //     showToast(
    //       `Please ensure all fields are filled. Missing values in "${category}"`,
    //       false
    //     );
    //     setCalculating(false);
    //     return;
    //   }
    // }

    // const payload = categories.reduce((acc, item) => {
    //   const key = item.category.toLowerCase();

    //   acc[key] = {
    //     days_range: item.range ?? "",
    //   };

    //   return acc;
    // }, {} as Record<string, { days_range: string }>);

    if (id && reporting_date) {
      CreatePortfolioECLCalculation(id, reporting_date)
        .then(() => {
          setCalculating(false);
          showToast("Operation successful", true);
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        })
        .catch((err) => {
          setCalculating(false);
          showToast(err?.response?.data.detail ?? "Submission failed", false);
        });
    }
  };
  const features = [
    "Historical payment behavior",
    "Loan-to-value ratio",
    "Delinquency history",
  ];
  return (
    <>
      <div className="py-6 bg-white rounded-lg">
        {/* <div className="overflow-x-auto">
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
        </div> */}
        <small>Reporting date</small>
        <div className="w-full">
          <input
            placeholder="Select a date"
            className=" w-full border rounded-[10px] border-gray-300 px-[6px] py-[5px] focus:outline-[#166E94] text-gray-400"
            type="date"
            id="ecl_reporting_date"
          />
        </div>
        <div className="my-4 bg-[#D9EFF929] border w-full border-[#e5f0fb] rounded-xl p-6 shadow-sm">
          <h3 className="mb-2 text-[14px] font-semibold text-[#04161E]">
            Prediction features
          </h3>
          <p className="mb-4 text-xs text-[#6F6F6F]">
            The following features will be used for ECL prediction
          </p>
          <ul className="space-y-3">
            {features.map((feature) => (
              <li
                key={feature}
                className="flex items-center text-sm text-gray-700"
              >
                <img
                  src={Images.check}
                  className="text-[#52a5f8] w-4 h-4 mr-2"
                />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-end mt-3">
          <Button
            text="Cancel"
            onClick={close}
            className="px-4 !w-[90px] !text-[14px] bg-white border border-gray-400 rounded-[10px] mr-2"
          />
          <Button
            onClick={handleSubmit}
            isLoading={calculating}
            text="Calculate Ecl"
            className="bg-[#166E94] !text-[14px] !w-[170px] text-white px-4 py-2 rounded-[10px]"
          />
        </div>
      </div>
    </>
  );
}

export default CalculateEcl;
