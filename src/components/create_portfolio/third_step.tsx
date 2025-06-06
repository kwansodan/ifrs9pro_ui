import { CategoryProps } from "../../core/interfaces";
import { Images } from "../../data/Assets";
import Button from "../../components/button/_component";
import { useState } from "react";
import { CreateSecondStepPortfolioApi } from "../../core/services/portfolio.service";

import { showToast } from "../../core/hooks/alert";
import { validateSequentialRanges } from "../../core/utility";

function ThirdStep({ close, id, setStep }: any) {
  // const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [categories, setCategories] = useState<CategoryProps[]>([
    { category: "Current", range: "0-30", rate: "0.1" },
    { category: "OLEM", range: "31-89", rate: "0.2" },
    { category: "Substandard", range: "90-179", rate: "0.25" },
    { category: "Doubtful", range: "180-359", rate: "0.50" },
    { category: "Loss", range: "360+", rate: "1.00" },
  ]);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleEditClick = (index: number) => {
    setEditingIndex(index);
  };

  const handleToggle = () => {
    setEditingIndex(null);
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

  const handleSubmit = () => {
    setIsCreating(true);
    for (const item of categories) {
      const { category, range } = item;

      if (!range?.trim()) {
        showToast(
          `Please ensure all fields are filled. Missing values in "${category}"`,
          false
        );
        setIsCreating(false);
        return;
      }
    }

    if (!id) {
      showToast("Please create second step of portfolio.", false);
      setIsCreating(false);
      return;
    }

    const payload = categories.reduce((acc, item) => {
      const key = item.category.toLowerCase();

      acc[key] = {
        days_range: item.range ?? "",
        rate: item.rate ?? "",
      };

      return acc;
    }, {} as Record<string, { days_range: string; rate: string }>);

    const isValidPayload = validateSequentialRanges(payload);
    if (!isValidPayload) {
      setIsCreating(false);
      return;
    }
    const finalPayload = {
      bog_staging_config: payload,
    };
    try {
      CreateSecondStepPortfolioApi(id, finalPayload)
        .then((res) => {
          setIsCreating(false);
          if (res.status === 200 || res.status === 201) {
            showToast("Third step of portfolio created successfully.", true);

            setStep(4);
          } else {
            setIsCreating(false);
            showToast("An error occurred. Please try again.", false);
          }
        })
        .catch((err) => {
          setIsCreating(false);
          showToast(
            err?.response?.data.detail ??
              "An error occurred. Please try again.",
            false
          );
        });
    } catch (err) {
      showToast("An error occurred. Please try again.", false);
      return { success: false, error: "An error occurred. Please try again." };
    }
  };

  return (
    <>
      <div className="px-8 py-6 mt-1 bg-white rounded-lg">
        <h3 className="text-[14px] text-center font-bol mt-2">BOG staging</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border rounded-lg">
            <thead>
              <tr className="text-left text-gray-700 bg-gray-100">
                <th className="p-3">Category</th>
                <th className="p-3">Days range</th>
                <th className="p-3">Rate(%)</th>
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
                  {/* Rate input field */}
                  <td className="p-3">
                    <input
                      type="text"
                      className="w-full px-2 py-1 border rounded-md outline-0 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      value={item.rate}
                      disabled={editingIndex !== index}
                      onChange={(e) =>
                        handleInputChange(index, "rate", e.target.value)
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
        </div>
        {/* <small>Reporting date</small>
        <div className="w-full">
          <input
            placeholder="Select a date"
            className=" w-full border rounded-[10px] border-gray-300 px-[6px] py-[5px] focus:outline-[#166E94] text-gray-400"
            type="date"
            id="reporting_date"
          />
        </div> */}
        <div className="flex justify-end mt-3">
          <Button
            text="Cancel"
            onClick={close}
            className="px-4 !w-[90px] !text-[14px] bg-white border border-gray-400 rounded-[10px] mr-2"
          />
          <Button
            onClick={handleSubmit}
            isLoading={isCreating}
            text="Next"
            className="bg-[#166E94] !text-[14px] !w-[120px] text-white px-4 py-2 rounded-[10px]"
          />
        </div>
      </div>
    </>
  );
}

export default ThirdStep;
