import { useState } from "react";
import Tabs from "../../components/tabs_new/component";
import Overview from "./overview";
import Pricing from "./pricing";
import Invoices from "./invoice";
import History from "./history";

const Billing = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const tabs = ["Overview", "Pricing", "Invoices", "History"];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl px-4 py-6 mx-auto sm:px-6 lg:px-8 lg:py-8">
        <h2 className="mb-6 text-xl font-semibold">Billing</h2>

        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="mt-6">
          {activeTab === "Overview" && <Overview />}
          {activeTab === "Pricing" && (
            <div className="text-sm text-gray-600 border rounded-xl">
              <Pricing />
            </div>
          )}
          {activeTab === "Invoices" && (
            <div className="p-4 text-sm text-gray-600 border rounded-xl bg-gray-50">
              <Invoices />
            </div>
          )}
          {activeTab === "History" && (
            <div className="text-sm text-gray-600 border rounded-xl ">
              <History />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Billing;
