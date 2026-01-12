import { useState, useMemo } from "react";
import { DataGrid } from "react-data-grid";
import "react-data-grid/lib/styles.css";
import { useBillingSubscription } from "../../core/hooks/dashboard";
import { AxiosError } from "axios";
import ApiErrorPage from "../errors/api";

interface InvoiceRow {
  id: string;
  due_date: string;
  billing_period: string;
  billing_profile: string;
  status: "Paid" | "Unpaid";
  amount: string;
  amount_paid: string;
  outstanding: string;
}

const Invoices = () => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [billingProfile, setBillingProfile] = useState("All");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showBillingDropdown, setShowBillingDropdown] = useState(false);

  const { data, isLoading, isError, error, refetch } = useBillingSubscription();

  const invoices: InvoiceRow[] = useMemo(() => {
    const apiInvoices = data?.data?.data?.invoices ?? [];

    return apiInvoices.map((inv: any) => {
      const isPaid = inv.status === "success";
      const formattedAmount = `${inv.currency} ${(
        inv.amount / 100
      ).toLocaleString()}`;

      return {
        id: `#${inv.id}`,
        due_date: inv.created_at
          ? new Date(inv.created_at).toLocaleDateString()
          : "-",
        billing_period: inv.paid_at
          ? new Date(inv.paid_at).toLocaleDateString()
          : "-",
        billing_profile: "Name on profile",
        status: isPaid ? "Paid" : "Unpaid",
        amount: formattedAmount,
        amount_paid: isPaid ? formattedAmount : `${inv.currency} 0`,
        outstanding: isPaid ? `${inv.currency} 0` : formattedAmount,
      };
    });
  }, [data]);

  const handleRetry = () => {
    refetch();
  };

  const filteredData = useMemo(
    () =>
      invoices.filter((invoice) => {
        const matchesStatus =
          statusFilter === "All" ||
          invoice.status.toLowerCase() === statusFilter.toLowerCase();

        const matchesBilling =
          billingProfile === "All" ||
          invoice.billing_profile.toLowerCase() ===
            billingProfile.toLowerCase();

        return matchesStatus && matchesBilling;
      }),
    [invoices, statusFilter, billingProfile]
  );

  const renderStatus = ({ row }: any) => (
    <span
      className={`${
        row.status === "Paid" ? "text-green-600" : "text-red-500"
      } font-medium`}
    >
      {row.status}
    </span>
  );

  // const renderDownload = () => (
  //   <div className="text-right text-[#166E94] text-lg cursor-pointer">↓</div>
  // );

  const columns = [
    { key: "id", name: "Invoice ID", width: 120 },
    { key: "due_date", name: "Due date", width: 140 },
    { key: "billing_period", name: "Billing period", width: 140 },
    { key: "billing_profile", name: "Billing profile", width: 150 },
    { key: "status", name: "Status", width: 120, renderCell: renderStatus },
    { key: "amount", name: "Amount", width: 140 },
    { key: "outstanding", name: "Outstanding amount", width: 200 },
    //{ key: "download", name: "", width: 80, renderCell: renderDownload },
  ];

  if (isLoading) {
    return <div className="p-6 text-sm text-gray-500">Loading invoices…</div>;
  }

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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:w-1/2">
        <div className="p-6 text-left bg-white border rounded-xl">
          <p className="text-sm text-gray-500">Total invoices</p>
          <p className="mt-5 text-5xl font-semibold">{invoices.length}</p>
        </div>
        <div className="p-6 text-left bg-white border rounded-xl">
          <p className="text-sm text-gray-500">Amount due</p>
          <p className="mt-5 text-5xl font-semibold">
            {invoices
              .filter((i) => i.status === "Unpaid")
              .reduce((sum, i) => {
                const val = Number(i.outstanding.replace(/[^\d]/g, ""));
                return sum + val;
              }, 0)
              .toLocaleString()}
          </p>
        </div>
      </div>

      <div className="rounded-2xl">
        <div className="flex flex-wrap items-center gap-2 p-4 mb-4 bg-[#F0F0F0] rounded-t-lg">
          <h3 className="mr-3 text-sm font-medium text-gray-800">Invoices</h3>

          <div className="relative">
            <button
              onClick={() => {
                setShowStatusDropdown(!showStatusDropdown);
                setShowBillingDropdown(false);
              }}
              className="text-sm bg-[#D9EFF9] border text-[#166E94] px-3 py-[5px] rounded-xl"
            >
              Status: {statusFilter}
            </button>

            {showStatusDropdown && (
              <div className="absolute z-10 mt-1 bg-white border rounded-md shadow-md w-28">
                {["All", "Paid", "Unpaid"].map((status) => (
                  <div
                    key={status}
                    className="px-3 py-2 text-sm text-[#166E94] cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setStatusFilter(status);
                      setShowStatusDropdown(false);
                    }}
                  >
                    {status}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => {
                setShowBillingDropdown(!showBillingDropdown);
                setShowStatusDropdown(false);
              }}
              className="text-sm bg-[#D9EFF9] border text-[#166E94] px-3 py-[5px] rounded-xl"
            >
              Billing profile: {billingProfile}
            </button>

            {showBillingDropdown && (
              <div className="absolute z-10 mt-1 bg-white border rounded-md shadow-md w-36">
                {[
                  "All",
                  "Name on profile",
                  "Profile name 1",
                  "Profile name 2.",
                ].map((profile) => (
                  <div
                    key={profile}
                    className="px-3 py-2 text-sm text-[#166E94] cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setBillingProfile(profile);
                      setShowBillingDropdown(false);
                    }}
                  >
                    {profile}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="w-full overflow-x-auto bg-white rounded-b-2xl">
          <div className="min-w-[900px]">
            <DataGrid
              columns={columns}
              rows={filteredData}
              rowHeight={56}
              headerRowHeight={44}
              className="rdg-light custom-grid"
              style={{ borderRadius: 12 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoices;
