import "react-data-grid/lib/styles.css";
import { DataGrid } from "react-data-grid";

const History = () => {
  const historyData = [
    {
      id: 1,
      plan_title: "Plan name",
      plan_amount: "$2000.00",
      date: "26/04/2025",
      status: "Current",
    },
    {
      id: 2,
      plan_title: "Plan name",
      plan_amount: "$2000.00",
      date: "26/03/2025",
      status: "Expired",
    },
    {
      id: 3,
      plan_title: "Plan name",
      plan_amount: "$2000.00",
      date: "26/02/2025",
      status: "Expired",
    },
  ];

  const renderStatus = ({ row }: any) => (
    <span
      className={`${
        row.status === "Current"
          ? "text-green-600 font-medium"
          : "text-gray-400 font-normal"
      }`}
    >
      {row.status}
    </span>
  );

  const columns = [
    { key: "plan_title", name: "Plan title", resizable: true },
    { key: "plan_amount", name: "Plan amount", width: 200 },
    { key: "date", name: "Date", width: 180 },
    { key: "status", name: "Status", renderCell: renderStatus, width: 160 },
  ];

  return (
    <div className="rounded-2xl">
      <h3 className="p-4 mb- text-sm font-medium text-gray-800 bg-[#F0F0F0] rounded-t-lg">
        History
      </h3>

      <div className="w-full overflow-x-auto bg-white">
        <div className="min-w-[720px]">
          <DataGrid
            columns={columns}
            rows={historyData}
            rowHeight={56}
            headerRowHeight={44}
            className="rdg-light custom-grid"
            style={{ borderRadius: 12 }}
          />
        </div>
      </div>
    </div>
  );
};

export default History;
