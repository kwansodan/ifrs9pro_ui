import "react-data-grid/lib/styles.css";
import { useEffect, useState } from "react";
import { DataGrid } from "react-data-grid";
import { useNavigate } from "react-router-dom";

import Button from "../../components/button/_component";
import { showToast } from "../../core/hooks/alert";
import { GetPricingPlans } from "../../core/services/dashboard.service";

interface BillingPlan {
  name: string;
  amount: number;
  currency: string;
  interval: string;
  code: string;
}

interface PricingRow {
  id: string;
  tier: string;
  volume: string;
  annual_fee: string;
  planCode: string;
  active?: boolean;
}

const Pricing = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState<PricingRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await GetPricingPlans();
        const plans: BillingPlan[] = res?.data ?? [];

        const mappedRows: PricingRow[] = plans.map((plan) => ({
          id: plan.code,
          tier: plan.name,
          volume:
            plan.interval === "annually"
              ? "Annual subscription"
              : plan.interval,
          annual_fee: `${plan.currency} ${(
            plan.amount / 100
          ).toLocaleString()}`,
          planCode: plan.code,
          active: false, // replace when backend sends active subscription
        }));

        setRows(mappedRows);
      } catch (err: any) {
        showToast(
          err?.response?.data?.detail ?? "Failed to load pricing plans",
          false
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

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

  const renderActionCell = ({ row }: any) => (
    <div className="flex justify-end pr-2">
      <Button
        text="Subscribe"
        className="w-auto bg-[#F1F1F1]"
        onClick={() =>
          navigate("/dashboard/susbscription-payment", {
            state: {
              planCode: row.planCode,
              planName: row.tier,
              amount: row.annual_fee,
            },
          })
        }
      />
    </div>
  );

  const columns = [
    { key: "tier", name: "Tier", width: 240, renderCell: renderTierCell },
    { key: "volume", name: "Plan type", resizable: true },
    { key: "annual_fee", name: "Annual fee", width: 180 },
    { key: "action", name: "", width: 160, renderCell: renderActionCell },
  ];

  if (loading) {
    return (
      <div className="p-6 text-sm text-gray-500">Loading pricing plans…</div>
    );
  }

  return (
    <div className="rounded-2xl">
      <h3 className="p-4 mb-4 text-sm font-medium text-gray-800 bg-[#F0F0F0] rounded-t-lg">
        Pricing plans
      </h3>

      <div className="w-full overflow-x-auto bg-white">
        <div className="min-w-[720px]">
          <DataGrid
            columns={columns}
            rows={rows}
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
