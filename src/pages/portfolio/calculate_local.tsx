import { CategoryProps, UploadDataProps } from "../../core/interfaces";
import { Images } from "../../data/Assets";
import Button from "../../components/button/_component";
import { useState } from "react";
import { CreatePortfolioLocalImpairmentCalculation } from "../../core/services/portfolio.service";
import { useParams } from "react-router-dom";
import { showToast } from "../../core/hooks/alert";

function CalculateLocalImpairment({ close }: UploadDataProps) {
  const { id } = useParams();
  const [categories, setCategories] = useState<CategoryProps[]>([
    { category: "Current", range: "0-30", rate: "1%" },
    { category: "OLEM", range: "31-89", rate: "10%" },
    { category: "Substandard", range: "90-179", rate: "25%" },
    { category: "Doubtful", range: "180-359", rate: "50%" },
    { category: "Loss", range: "360+", rate: "100%" },
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
    const reportingDateElement = document.getElementById(
      "reporting_date"
    ) as HTMLInputElement | null;
    const reporting_date = reportingDateElement?.value ?? "";

    if (!id || !reporting_date) {
      showToast("All fields required", false);
      return;
    }
    for (const item of categories) {
      const { category, range, rate } = item;

      if (!range?.trim() || !rate?.trim()) {
        showToast(
          `Please ensure all fields are filled. Missing values in "${category}"`,
          false
        );
        return;
      }

      if (isNaN(parseFloat(rate))) {
        showToast(`Invalid rate in "${category}". Must be a number.`, false);
        return;
      }
    }

    const payload = categories.reduce((acc, item) => {
      const key = item.category.toLowerCase();

      acc[key] = {
        days_range: item.range ?? "",
        rate: parseFloat(item.rate ?? "0"),
      };

      return acc;
    }, {} as Record<string, { days_range: string; rate: number }>);

    if (id && reporting_date) {
      CreatePortfolioLocalImpairmentCalculation(id, reporting_date, payload)
        .then(() => {
          showToast("Operation successful", true);
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        })
        .catch((err) => {
          showToast(err?.response?.data?.detail || "Submission failed", false);
        });
    }
  };
  return (
    <>
      <div className="py-6 bg-white rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full border rounded-lg">
            <thead>
              <tr className="text-left text-gray-700 bg-gray-100">
                <th className="p-3">Category</th>
                <th className="p-3">Days range</th>
                <th className="p-3">Rate (%)</th>
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

                  {/* Rate input field */}
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
        <small>Reporting date</small>
        <div className="w-full">
          <input
            placeholder="Select a date"
            className=" w-full border rounded-[10px] border-gray-300 px-[6px] py-[5px] focus:outline-[#166E94] text-gray-400"
            type="date"
            id="reporting_date"
          />
        </div>
        <div className="flex justify-end mt-3">
          <Button
            text="Cancel"
            onClick={close}
            className="px-4 !w-[90px] !text-[14px] bg-white border border-gray-400 rounded-[10px] mr-2"
          />
          <Button
            onClick={handleSubmit}
            text="Calculate impairment"
            className="bg-[#166E94] !text-[14px] !w-[170px] text-white px-4 py-2 rounded-[10px]"
          />
        </div>
      </div>
    </>
  );
}

export default CalculateLocalImpairment;
