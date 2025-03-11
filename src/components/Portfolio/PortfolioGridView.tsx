import React from "react";
import { observer } from "mobx-react-lite";
import portfolioStore from "../../stores/PortfolioStore"; 
import PortfolioCard from "./PortfolioCard";

const PortfolioGridView: React.FC = observer(() => {
  if (portfolioStore.loading) return <p>Loading portfolios...</p>;
  if (portfolioStore.error) return <p className="text-red-500">{portfolioStore.error}</p>;

  return (
    <div className="flex gap-5 p-4">
      {portfolioStore.portfolios.length > 0 ? (
        portfolioStore.portfolios.map((portfolio) => (
          <PortfolioCard
            key={portfolio.id}
            id={portfolio.id}
            imageSrc={portfolio.gridUrl}
            hoverImageSrc={portfolio.listUrl}
            title={portfolio.title}
            noOfModules={portfolio.noOfModules}
          />
        ))
      ) : (
        <p>No portfolios available</p>
      )}
    </div>
  );
});

export default PortfolioGridView;
