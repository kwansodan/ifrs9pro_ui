import { CategoryProps, UploadDataProps } from "../../core/interfaces";
import { Images } from "../../data/Assets";
import Button from "../../components/button/_component";
import { useState } from "react";

function CalculateLocalImpairment({ close }: UploadDataProps) {
  const [categories, setCategories] = useState<CategoryProps[]>([
    { category: "Current", range: "0 - 30", rate: "1%" },
    { category: "OLEM", range: "31 - 89", rate: "10%" },
    { category: "Substandard", range: "90 - 179", rate: "25%" },
    { category: "Doubtful", range: "180 - 359", rate: "50%" },
    { category: "Loss", range: "360+", rate: "100%" },
  ]);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleEditClick = (index: number) => {
    setEditingIndex(index);
  };

  const handleSaveClick = () => {
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
  return (
    <>
      <div className="py-6 bg-white rounded-lg">
        {/* Table */}
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

                  {/* Days range input field */}
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

                  {/* Edit/Save button */}
                  <td className="p-3 text-gray-500 cursor-pointer hover:text-gray-700">
                    {editingIndex === index ? (
                      <img
                        src={Images.edit}
                        className="w-[14px] h-[14px]"
                        alt=""
                        onClick={handleSaveClick}
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
        {/* Buttons */}
        <div className="flex justify-end mt-3">
          <Button
            text="Cancel"
            onClick={close}
            className="px-4 !w-[90px] !text-[14px] bg-white border border-gray-400 rounded-[10px] mr-2"
          />
          <Button
            text="Calculate impairment"
            className="bg-[#166E94] !text-[14px] !w-[170px] text-white px-4 py-2 rounded-[10px]"
          />
        </div>
      </div>
    </>
  );
}

export default CalculateLocalImpairment;
