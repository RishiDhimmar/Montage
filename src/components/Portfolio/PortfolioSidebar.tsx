import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { FaChevronDown, FaChevronUp, FaTh } from "react-icons/fa";
import portfolioStore from "../../stores/PortfolioStore";

const Sidebar: React.FC = observer(() => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const selectedPortfolio = portfolioStore.selectedPortfolio.get();

  return (
    <div className="w-1/4 h-[calc(100vh-64px)] bg-white p-4">
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full flex items-center justify-between p-2 border border-gray-200 rounded-lg bg-gray-100"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-300 rounded-lg flex items-center justify-center text-gray-700 font-semibold">
              {selectedPortfolio?.name.charAt(0).toUpperCase() || "P"}
            </div>
            <span className="font-medium">{selectedPortfolio?.name || "Select Portfolio"}</span>
          </div>
          {isDropdownOpen ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
        </button>

        {isDropdownOpen && (
          <div className="absolute w-full bg-gray-100 border border-gray-200 rounded-lg mt-2">
            {portfolioStore.portfolios.map((portfolio) => (
              <button
                key={portfolio.id}
                className="p-2 w-full text-left flex items-center gap-2 rounded hover:bg-white"
                onClick={() => {
                  portfolioStore.setSelectedPortfolio(portfolio);
                  setIsDropdownOpen(false);
                }}
              >
                <div className="w-8 h-8 bg-gray-300 rounded-lg flex items-center justify-center text-gray-700 font-semibold">
                  {portfolio.name.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium">{portfolio.name}</span>
              </button>
            ))}
            <div className="border-t border-gray-200 mt-1"></div>
            <button className="w-full text-gray-400 p-2 text-left cursor-not-allowed">Create Portfolio</button>
            <button className="w-full p-2 text-left hover:bg-gray-100">Manage Portfolios</button>
          </div>
        )}
      </div>

      <div className="mt-4">
        <SidebarItem icon={<FaTh />} label="All Designs" />
      </div>
    </div>
  );
});

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active = false }) => {
  return (
    <button className={`flex items-center gap-3 p-2 w-full rounded-lg ${active ? "bg-gray-100 font-semibold" : "hover:bg-gray-100"} text-left`}>
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default Sidebar;