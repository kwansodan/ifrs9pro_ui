import "react-data-grid/lib/styles.css";
import { DataGrid } from "react-data-grid";
import { useMemo } from "react";
import { useBillingSubscription } from "../../core/hooks/dashboard";

interface HistoryRow {
  id: number;
  plan_title: string;
  plan_amount: string;
  date: string;
  status: "Current" | "Expired";
}

const History = () => {
  const { data, isLoading, isError } = useBillingSubscription();

  const rows: HistoryRow[] = useMemo(() => {
    const history = data?.data?.data?.invoices_history ?? [];
    const plan = data?.data?.data?.plan;

    return history.map((item: any) => {
      const periodEnd = item.period_end ? new Date(item.period_end) : null;

      const isCurrent =
        item.paid === true &&
        periodEnd !== null &&
        periodEnd.getTime() > Date.now();

      return {
        id: item.id,
        plan_title: plan?.name ?? "Subscription plan",
        plan_amount: plan
          ? `${plan.currency} ${(plan.amount / 100).toLocaleString()}`
          : "-",
        date: periodEnd ? periodEnd.toLocaleDateString() : "-",
        status: isCurrent ? "Current" : "Expired",
      };
    });
  }, [data]);

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

  if (isLoading) {
    return (
      <div className="p-6 text-sm text-gray-500">Loading billing history…</div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-sm text-red-500">
        Failed to load billing history
      </div>
    );
  }

  return (
    <div className="rounded-2xl">
      <h3 className="p-4 text-sm font-medium text-gray-800 bg-[#F0F0F0] rounded-t-lg">
        History
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

export default History;
