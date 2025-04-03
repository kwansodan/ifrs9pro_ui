import { useState } from "react";
import { FilterTrayProps, FilterValues } from "../../core/interfaces";
import Button from "../button/_component";

function FilterTray({
  closeFilter,
  onApply,
  initialFilters,
  clearFilters,
}: FilterTrayProps) {
  const [filters, setFilters] = useState(initialFilters);

  const handleCheckboxChange = (
    category: keyof FilterValues,
    value: string
  ) => {
    setFilters((prev: any) => {
      const currentValues = prev[category] || [];

      const updatedValues = currentValues.includes(value)
        ? currentValues.filter((item: any) => item !== value)
        : [...currentValues, value];

      return { ...prev, [category]: updatedValues };
    });
  };

  return (
    <div className="absolute p-6 mt-2 bg-white rounded-lg shadow-lg right-[32rem] top-[8rem] w-96 z-50">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[16px] font-semibold">Filter by</h2>
        <span onClick={closeFilter} className="text-gray-500 cursor-pointer">
          &times;
        </span>
      </div>

      {/* Asset Type */}
      <div className="mb-4 text-[13px]">
        <label className="block font-medium">Asset type</label>
        <div className="flex gap-4 mt-2">
          {["Debt", "Equity"].map((type) => (
            <label
              key={type}
              className="flex items-center px-3 py-1 border rounded-lg"
            >
              <input
                type="checkbox"
                checked={filters.asset_type.includes(type)}
                onChange={() => handleCheckboxChange("asset_type", type)}
                className="mr-2"
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      {/* Funding Source */}
      <div className="mb-4 text-[13px]">
        <label className="block font-medium">Funding source</label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {[
            "Private investors",
            "Pension fund",
            "Mutual fund",
            "Other funds",
          ].map((source) => (
            <label
              key={source}
              className="flex items-center px-3 py-1 border rounded-lg"
            >
              <input
                type="checkbox"
                checked={filters.funding_source.includes(source)}
                onChange={() => handleCheckboxChange("funding_source", source)}
                className="mr-2"
              />
              {source}
            </label>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-2 mt-3">
        <Button
          text="Cancel"
          onClick={closeFilter}
          className="w-[90px] border bg-white border-gray-400 rounded-lg"
        />
        <Button
          text="Apply"
          onClick={() => onApply(filters)}
          className="bg-[#166E94] w-[90px] text-white px-4 py-2 rounded-lg"
        />
      </div>
      <small
        onClick={clearFilters}
        className="text-red-600 underline cursor-pointer"
      >
        Clear filters
      </small>
    </div>
  );
}

export default FilterTray;
