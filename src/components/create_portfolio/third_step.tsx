import { CategoryProps } from "../../core/interfaces";
import { Images } from "../../data/Assets";
import Button from "../../components/button/_component";
import { useState } from "react";
import { CreateSecondStepPortfolioApi } from "../../core/services/portfolio.service";

import { showToast } from "../../core/hooks/alert";
import { useNavigate } from "react-router-dom";

function ThirdStep({ close, id, setStep }: any) {
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [categories, setCategories] = useState<CategoryProps[]>([
    { category: "Current", range: "0-30" },
    { category: "OLEM", range: "31-89" },
    { category: "Substandard", range: "90-179" },
    { category: "Doubtful", range: "180-359" },
    { category: "Loss", range: "360+" },
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
      };

      return acc;
    }, {} as Record<string, { days_range: string }>);

    try {
      CreateSecondStepPortfolioApi(id, payload)
        .then((res) => {
          setIsCreating(false);
          if (res.status === 200 || res.status === 201) {
            showToast("Third step of portfolio created successfully.", true);

            setStep(4);
            setTimeout(() => {
              navigate("/dashboard/portfolio");
            }, 1000);
          }
        })
        .catch((err) => {
          setIsCreating(false);
          showToast(err?.response?.data.detail, false);
        });
    } catch (err) {
      showToast("Login failed. Please try again.", false);
      return { success: false, error: "Login failed. Please try again." };
    }
  };

  return (
    <>
      <div className="px-8 py-6 bg-white rounded-lg">
        <h3 className="text-[14px] font-bold mt-2">Local staging</h3>
        <div className="overflow-x-auto">
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
            text="Calculate impairment"
            className="bg-[#166E94] !text-[14px] !w-[170px] text-white px-4 py-2 rounded-[10px]"
          />
        </div>
      </div>
    </>
  );
}

export default ThirdStep;
