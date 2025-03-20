import React from "react";
import { observer } from "mobx-react-lite";
import portfolioStore from "../../stores/PortfolioStore";
import PortfolioCard from "./PortfolioCard";

const PortfolioGridView: React.FC = observer(() => {
  const selectedPortfolio = portfolioStore.selectedPortfolio.get();

  if (portfolioStore.loading) return <p>Loading portfolios...</p>;
  if (portfolioStore.error) return <p className="text-red-500">{portfolioStore.error}</p>;

  if (!selectedPortfolio) return <p>No portfolio selected</p>;

  return (
    <div className="flex flex-wrap gap-4 p-4">
      {selectedPortfolio.designs && selectedPortfolio.designs.length > 0 ? (
        selectedPortfolio.designs.map((design) => (
          <PortfolioCard
            key={design.id}
            id={design.id}
            imageSrc={design.designImage}
            hoverImageSrc={design.monogramImage}
            title={design.name}
            noOfModules={design.moduleArr ? design.moduleArr.length : 0}
          />
        ))
      ) : (
        <p>No designs available for this portfolio</p>
      )}
    </div>
  );
});

export default PortfolioGridView;
