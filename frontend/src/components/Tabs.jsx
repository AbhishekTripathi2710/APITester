import React from "react";

const Tabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { name: "REST", icon: "" },
    { name: "WebSocket", icon: "" }
  ];

  return (
    <div className="flex gap-2 bg-gray-800/50 p-1 rounded-lg border border-gray-800">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          onClick={() => setActiveTab(tab.name)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-md font-medium transition-all duration-200 ${
            activeTab === tab.name
              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20"
              : "text-gray-400 hover:text-white hover:bg-gray-700/50"
          }`}
        >
          <span className="text-lg">{tab.icon}</span>
          <span>{tab.name}</span>
        </button>
      ))}
    </div>
  );
};

export default Tabs;
