import { useState } from "react";
import { DataGrid } from "react-data-grid";
import { Images } from "../../data/Assets";
import FilterTray from "../../components/filter_tray/_component";
import Button from "../../components/button/_component";

function PortfolioMain() {
  const [showFilter, setShowFilter] = useState(false);
  const renderActionsRow = (data: any) => {
    return (
      <div className="flex cursor-pointer">
        <img src={Images.options} className="w-[24px]" alt="" />
      </div>
    );
  };

  const columns = [
    { key: "name", name: "Name", width: 200 },
    { key: "assetType", name: "Asset type", width: 150 },
    { key: "customerType", name: "Customer type", width: 180 },
    { key: "totalLoans", name: "Total loans", width: 150 },
    { key: "totalValue", name: "Total value", width: 180 },
    { key: "lastCalculation", name: "Last calculation", width: 180 },

    {
      key: "update",
      name: "Actions",
      renderCell: renderActionsRow,
      width: "100px",
    },
  ];

  const rows = Array(15).fill({
    name: "Personal loans",
    assetType: "Debt",
    customerType: "Individuals",
    totalLoans: "2,587",
    totalValue: "$5,000,900",
    lastCalculation: "Jan 24, 2025",
  });
  return (
    <>
      <div className="flex items-center justify-between bg-[#f8f9fa] rounded-t-lg py-[10px] px-[12px] mt-6 max-w-[1160px]">
        <h1 className="text-[16px] font-semibold">Portfolios</h1>

        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              className="pl-10 h-[35px] min-w-[385px] pr-3 py-2 border border-gray-300 rounded-lg focus:outline-[#166E94]"
            />
            <img
              onClick={() => setShowFilter(!showFilter)}
              className="w-[13px] h-[13px] absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
              src={Images.search}
              alt=""
            />
            <img
              onClick={() => setShowFilter(!showFilter)}
              className="w-[20px] h-[20px] absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
              src={Images.filter}
              alt=""
            />
          </div>
          <Button
            text="New portfolio"
            // onClick={() => setOpenCreatePortfolioModal(true)}
            className="bg-[#166E94] text-white px-4 py-2 rounded-lg min-w-[144px] min-h-[35px]"
          />
        </div>

        {showFilter && <FilterTray closeFilter={() => setShowFilter(false)} />}
      </div>
      <div className="max-w-[1160px] h-[398px] border-[1px] border-[#F0F0F0] rounded-[11px]">
        <DataGrid
          columns={columns}
          rows={rows}
          className="rdg-light custom-grid"
        />
      </div>
    </>
  );
}

export default PortfolioMain;
