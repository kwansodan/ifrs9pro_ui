import { useEffect, useState } from "react";
import { Images } from "../../../data/Assets";
import { customerMainOverview, portfolioMainOverview } from "../../../data";
import Card from "../../../components/card/_component";
import "react-data-grid/lib/styles.css";
import Button from "../../../components/button/_component";
import { DataGrid } from "react-data-grid";

function Main() {
  const [currentDate, setCurrentDate] = useState("");
  const [greeting, setGreeting] = useState("");
  useEffect(() => {
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date());

    const hour = new Date().getHours();
    const greetingMessage =
      hour < 12
        ? "Good morning"
        : hour < 18
        ? "Good afternoon"
        : "Good evening";

    setCurrentDate(formattedDate);
    setGreeting(greetingMessage);
  }, []);

  const renderActionsRow = () => {
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

  const rows = Array(5).fill({
    name: "Personal loans",
    assetType: "Debt",
    customerType: "Individuals",
    totalLoans: "2,587",
    totalValue: "$5,000,900",
    lastCalculation: "Jan 24, 2025",
  });

  return (
    <>
      <div>
        <h3 className="text-[#6F6F6F] text-[14px] font-normal mt-6">
          {currentDate}
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h3 className="text-[#1E1E1E] text-[18px]">{greeting} User</h3>
            <img
              className="w-[20px] h-[20px] ml-2"
              src={Images.greeting}
              alt=""
            />
          </div>
          <Button
            text="Create new portfolio"
            className="bg-[#166E94] font-normal mt-3 text-white text-[12px] !rounded-[10px] !max-w-[180px]"
          />
        </div>

        <h3 className="text-[16px] font-semibold mt-7">Portfolio overview</h3>
        <div className="flex gap-4">
          {portfolioMainOverview.map((item: any) => (
            <Card
              title={item.name}
              value={item.fig}
              valueClassName="text-black"
            />
          ))}
        </div>

        <h3 className="text-[16px] font-semibold mt-6">Customer overview</h3>
        <div className="flex gap-4">
          {customerMainOverview.map((item: any) => (
            <Card
              title={item.name}
              value={item.fig}
              valueClassName="!text-black"
            />
          ))}
        </div>

        <h3 className="text-[16px] font-semibold mt-8 mb-3">Portfolios</h3>
        <div className="md:max-w-[1160px] h-[398px] border-[1px] border-[#F0F0F0] rounded-[11px]">
          <DataGrid
            columns={columns}
            rows={rows}
            className="rdg-light custom-grid"
          />
        </div>
      </div>
    </>
  );
}

export default Main;
