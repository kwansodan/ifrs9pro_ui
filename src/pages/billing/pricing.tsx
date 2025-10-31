import "react-data-grid/lib/styles.css";
import Button from "../../components/button/_component";
import { DataGrid } from "react-data-grid";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    id: 1,
    tier: "Starter",
    volume: "Up to 5,000 loans",
    annual_fee: "$3,000",
    active: true,
  },
  {
    id: 2,
    tier: "Growth",
    volume: "5,001 - 20,000 loans",
    annual_fee: "$6,000",
  },
  {
    id: 3,
    tier: "Scale",
    volume: "20,001 - 50,000 loans",
    annual_fee: "$10,000",
  },
  {
    id: 4,
    tier: "Enterprise",
    volume: "50,001 - 100,000 loans",
    annual_fee: "$15,000",
  },
  {
    id: 5,
    tier: "Custom",
    volume: "100,000+ loans",
    annual_fee: "Custom price",
  },
];

const renderTierCell = ({ row }: any) => (
  <div className="flex items-center gap-2">
    <span>{row.tier}</span>
    {row.active && (
      <span className="text-[11px] text-[#0E9F6E] bg-[#E6FAEF] px-2 py-[2px] rounded-md border border-[#B5E8CB]">
        Active subscription
      </span>
    )}
  </div>
);

const Pricing = () => {
  const navigate = useNavigate();

  const renderActionCell = ({ row }: any) => (
    <div className="flex justify-end pr-2">
      {row.tier === "Custom" ? (
        <Button
          text="Contact us"
          className="w-auto bg-[#F1F1F1]"
          onClick={() =>
            navigate("/dashboard/susbscription-payment", {
              state: { plan: row },
            })
          }
        />
      ) : (
        <Button
          text="Subscribe"
          className="w-auto bg-[#F1F1F1]"
          onClick={() =>
            navigate("/dashboard/susbscription-payment", {
              state: { plan: row },
            })
          }
        />
      )}
    </div>
  );
  const columns = [
    { key: "tier", name: "Tier", width: 180, renderCell: renderTierCell },
    { key: "volume", name: "Loan volume", resizable: true }, // flex column
    { key: "annual_fee", name: "Annual fee (USD)", width: 180 },
    { key: "action", name: "", width: 160, renderCell: renderActionCell },
  ];

  return (
    <div className="rounded-2xl">
      <h3 className="p-4 mb-4 text-sm font-medium text-gray-800 bg-[#F0F0F0] rounded-t-lg">
        Pricing plans
      </h3>

      <div className="w-full overflow-x-auto bg-white">
        <div className="min-w-[720px]">
          <DataGrid
            columns={columns}
            rows={plans}
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

export default Pricing;
