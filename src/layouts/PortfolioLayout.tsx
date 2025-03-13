import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Sidebar from "../components/Portfolio/PortfolioSidebar";
import portfolioStore from "../stores/PortfolioStore"; 
import PortfolioGridView from "../components/Portfolio/PortfolioGridView";
import PortfolioListView from "../components/Portfolio/PortfolioListView";

const PortfolioLayout: React.FC = observer(() => {
  useEffect(() => {
    portfolioStore.fetchDesigns();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex h-[calc(100vh-97px)]">
        <Sidebar />
        <div className="w-full">
          <Header />
          <div className="flex justify-start items-center gap-15 p-4 w-[300px]">
            <div>All Designs</div>
          </div>

        {portfolioStore.selectedView === "grid" ? <PortfolioGridView /> : <PortfolioListView />}
          
        </div>
      </div>
    </>
  );
});

export default PortfolioLayout;

