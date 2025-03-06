function Tabs({
  activeTab,
  setActiveTab,
  tabTitle,
}: {
  activeTab: string;
  tabTitle: string[];
  setActiveTab: (tab: string) => void;
}) {
  return (
    <div className="flex space-x-2">
      {tabTitle.map((tab: any) => (
        <button
          key={tab}
          className={`px-4 py-1 rounded-md text-sm font-medium ${
            activeTab === tab
              ? "bg-white text-black"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default Tabs;
