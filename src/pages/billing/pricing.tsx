import "react-data-grid/lib/styles.css";
import { DataGrid } from "react-data-grid";
import Button from "../../components/button/_component";
import {
  useBillingPricing,
  useInitializeTransaction,
} from "../../core/hooks/dashboard";
import { showToast } from "../../core/hooks/alert";
import { useState } from "react";
import { AxiosError } from "axios";
import ApiErrorPage from "../errors/api";

interface BillingPlan {
  name: string;
  amount: number;
  currency: string;
  interval: string;
  code: string;
  status: "active" | "inactive";
}

interface PricingRow {
  id: string;
  tier: string;
  volume: string;
  annual_fee: string;
  planCode: string;
  isActive: boolean;
  rawPlan: {
    amount: number;
    code: string;
    name: string;
  };
}

const Pricing = () => {
  const [processingPlanCode, setProcessingPlanCode] = useState<string | null>(
    null
  );

  const { data, isLoading, isError, error, refetch } = useBillingPricing();
  const { mutateAsync } = useInitializeTransaction();

  if (isLoading) {
    return (
      <div className="p-6 text-sm text-gray-500">Loading pricing plans…</div>
    );
  }

  const handleRetry = () => {
    refetch();
  };

  if (isError) {
    let errorMessage = "Unable to fetch data from server.";

    if (error instanceof AxiosError) {
      errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.message;
    }

    return <ApiErrorPage message={errorMessage} onRetry={handleRetry} />;
  }

  const plans: BillingPlan[] = data?.data.plans ?? [];
  const activePlanCode = data?.data.active_plan_code ?? null;

  const handleSubscribe = async (plan: {
    amount: number;
    code: string;
    name: string;
  }) => {
    try {
      setProcessingPlanCode(plan.code);
      const payload = {
        amount: plan.amount,
        reference: `sub_${Date.now()}`,
        callback_url: `${window.location.origin}/dashboard/billing`,
        plan: plan.code,
        metadata: {
          plan_name: plan.name,
        },
      };

      const res = await mutateAsync(payload);

      const authUrl =
        res?.data?.data?.authorization_url ?? res?.data?.authorization_url;

      if (!authUrl) {
        throw new Error("Authorization URL not returned");
      }

      window.location.href = authUrl;
    } catch (error: any) {
      setProcessingPlanCode(null);
      showToast(
        error?.response?.data?.detail ?? "Failed to initialize payment",
        false
      );
    }
  };

  const rows: PricingRow[] = plans.map((plan) => {
    const isActive = plan.status === "active" || plan.code === activePlanCode;

    return {
      id: plan.code,
      tier: plan.name,
      volume:
        plan.interval === "annually" ? "Annual subscription" : plan.interval,
      annual_fee: `${plan.currency} ${(plan.amount / 100).toLocaleString()}`,
      planCode: plan.code,
      isActive,
      rawPlan: {
        amount: plan.amount,
        code: plan.code,
        name: plan.name,
      },
    };
  });

  const renderTierCell = ({ row }: any) => (
    <div className="flex items-center gap-2">
      <span>{row.tier}</span>
      {row.isActive && (
        <span className="text-[11px] text-[#0E9F6E] bg-[#E6FAEF] px-2 py-[2px] rounded-md border border-[#B5E8CB]">
          Active subscription
        </span>
      )}
    </div>
  );

  const renderActionCell = ({ row }: any) => (
    <div className="flex justify-end pr-2">
      {!row.isActive && (
        <Button
          text={
            processingPlanCode === row.rawPlan.code
              ? "Processing..."
              : "Subscribe"
          }
          disabled={processingPlanCode !== null}
          className="w-auto bg-[#F1F1F1]"
          onClick={() => handleSubscribe(row.rawPlan)}
        />
      )}
    </div>
  );

  const columns = [
    { key: "tier", name: "Tier", width: 350, renderCell: renderTierCell },
    { key: "volume", name: "Plan type", width: 270 },
    { key: "annual_fee", name: "Annual fee", width: 180 },
    { key: "action", name: "", width: 150, renderCell: renderActionCell },
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
