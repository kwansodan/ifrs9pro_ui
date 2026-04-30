import { CategoryProps } from "../../core/interfaces";
import { Images } from "../../data/Assets";
import Button from "../../components/button/_component";
import { useState } from "react";
import { CreateSecondStepPortfolioApi } from "../../core/services/portfolio.service";
import { showToast } from "../../core/hooks/alert";
import { usePortfolios } from "../../core/hooks/portfolio";
import { useTranslation } from "react-i18next";

function FourthStep({ close, id }: any) {
  const { t } = useTranslation();
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const { portfoliosQuery } = usePortfolios();
  const [categories, setCategories] = useState<CategoryProps[]>([
    { category: "stage_1", range: "0-30" },
    { category: "stage_2", range: "31-89" },
    { category: "stage_3", range: "90-179" },
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
    value: string,
  ) => {
    const updatedCategories = [...categories];
    updatedCategories[index][field] = value;
    setCategories(updatedCategories);
  };

  const handleSubmit = () => {
    setIsCreating(true);

    if (!id) {
      showToast(t("fourthStep.createThirdStep"), false);
      setIsCreating(false);
      return;
    }

    for (const item of categories) {
      const { category, range } = item;

      if (!range?.trim()) {
        showToast(t("fourthStep.fillAllFields", { category }), false);
        setIsCreating(false);
        return;
      }
    }

    const payload = categories.reduce(
      (acc, item) => {
        const key = item.category.toLowerCase();

        acc[key] = {
          days_range: item.range ?? "",
        };

        return acc;
      },
      {} as Record<string, { days_range: string }>,
    );
    const finalPayload = {
      ecl_staging_config: payload,
    };
    if (id) {
      CreateSecondStepPortfolioApi(id, finalPayload)
        .then(() => {
          setIsCreating(false);
          showToast(t("fourthStep.success"), true);
          close?.();
          portfoliosQuery.refetch();
        })
        .catch((err) => {
          setIsCreating(false);
          showToast(
            err?.response?.data?.detail ?? t("fourthStep.errorOccurred"),
            false,
          );
        });
    }
  };
  return (
    <>
      <div className="px-6 py-8 bg-white rounded-lg">
        <h3 className="text-[14px] text-center font-bol">ECL staging</h3>
        <div className="mt-4 overflow-x-auto">
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
        </div>

        <div className="flex justify-end mt-3">
          <Button
            text="Cancel"
            onClick={close}
            className="px-4 !w-[90px] !text-[14px] bg-white border border-gray-400 rounded-[10px] mr-2"
          />
          <Button
            onClick={handleSubmit}
            isLoading={isCreating}
            text="Complete portfolio creation"
            className="bg-[#166E94] !text-[14px] !w-[210px] text-white px-4 py-2 rounded-[10px]"
          />
        </div>
      </div>
    </>
  );
}

export default FourthStep;
