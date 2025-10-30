import { useState } from "react";
import { DataGrid } from "react-data-grid";

import "react-data-grid/lib/styles.css";

const Invoices = () => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [billingProfile, setBillingProfile] = useState("All");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showBillingDropdown, setShowBillingDropdown] = useState(false);

  const invoices = [
    {
      id: "#0003",
      due_date: "26/04/2025",
      billing_period: "26/04/2025",
      billing_profile: "Name on profile",
      status: "Paid",
      amount: "$2000.00",
      amount_paid: "$2000.00",
      outstanding: "$0.00",
    },
    {
      id: "#0002",
      due_date: "26/04/2025",
      billing_period: "26/04/2025",
      billing_profile: "Name on profile",
      status: "Unpaid",
      amount: "$2000.00",
      amount_paid: "$0.00",
      outstanding: "$2000.00",
    },
    {
      id: "#0001",
      due_date: "26/04/2025",
      billing_period: "26/04/2025",
      billing_profile: "Name on profile",
      status: "Paid",
      amount: "$2000.00",
      amount_paid: "$2000.00",
      outstanding: "$0.00",
    },
  ];

  const filteredData = invoices.filter((invoice) => {
    const matchesStatus =
      statusFilter === "All" ||
      invoice.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesBilling =
      billingProfile === "All" ||
      invoice.billing_profile.toLowerCase() === billingProfile.toLowerCase();
    return matchesStatus && matchesBilling;
  });

  const renderStatus = ({ row }: any) => (
    <span
      className={`${
        row.status === "Paid" ? "text-green-600" : "text-red-500"
      } font-medium`}
    >
      {row.status}
    </span>
  );

  const renderDownload = () => (
    <div className="text-right text-[#166E94] text-lg cursor-pointer">↓</div>
  );

  const columns = [
    { key: "id", name: "Invoice ID", width: 120 },
    { key: "due_date", name: "Due date", width: 140 },
    { key: "billing_period", name: "Billing period", width: 140 },
    { key: "billing_profile", name: "Billing profile", width: 200 },
    { key: "status", name: "Status", renderCell: renderStatus, width: 120 },
    { key: "amount", name: "Amount", width: 140 },
    { key: "amount_paid", name: "Amount paid", width: 160 },
    { key: "outstanding", name: "Outstanding amount", width: 200 },
    { key: "download", name: "", width: 80, renderCell: renderDownload },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:w-1/2">
        <div className="p-6 text-left bg-white border rounded-xl">
          <p className="text-sm text-gray-500">Total invoices</p>
          <p className="mt-5 text-5xl font-semibold">5</p>
        </div>
        <div className="p-6 text-left bg-white border rounded-xl">
          <p className="text-sm text-gray-500">Amount due</p>
          <p className="mt-5 text-5xl font-semibold">$600</p>
        </div>
      </div>

      <div className="rounded-2xl">
        <div className="flex flex-wrap items-center  gap-2 p-4 mb-4 bg-[#F0F0F0] rounded-t-lg">
          <h3 className="mr-3 text-sm font-medium text-gray-800">Invoices</h3>

          <div className="relative flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => {
                  setShowStatusDropdown(!showStatusDropdown);
                  setShowBillingDropdown(false);
                }}
                className="text-sm bg-[#D9EFF9] border text-[#166E94] px-3 py-[5px] rounded-xl flex items-center gap-1 hover:bg-gray-50"
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
                className="text-sm bg-[#D9EFF9] border text-[#166E94] px-3 py-[5px] rounded-lg flex items-center gap-1 hover:bg-gray-50"
              >
                Billing profile: {billingProfile}
              </button>

              {showBillingDropdown && (
                <div className="absolute z-10 mt-1 bg-white border rounded-md shadow-md w-36">
                  {[
                    "All",
                    "Name on profile",
                    "Profile name 1",
                    "Profile name 2",
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
