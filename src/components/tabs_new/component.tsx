import React from "react";
import { TabsProps } from "../../core/interfaces";

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="relative w-[23.1rem] border-2 border-[#F0F0F0] rounded-lg">
      <div
        role="tablist"
        aria-label="Billing tabs"
        className="flex overflow-x-auto rounded-lg no-scrollbar"
      >
        {tabs.map((tab, idx) => {
          const isActive = activeTab === tab;
          return (
            <div
              key={tab}
              className={idx === 0 ? "" : "border-l border-gray-200"}
            >
              <button
                role="tab"
                aria-selected={isActive}
                onClick={() => onTabChange(tab)}
                className={`px-4 sm:px-5 py-2 text-sm whitespace-nowrap transition-all
                  ${
                    isActive
                      ? "bg-[#166E94] rounded-none text-white shadow-sm"
                      : "text-gray-700 hover:text-[#166E94]"
                  }`}
              >
                {tab}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;
