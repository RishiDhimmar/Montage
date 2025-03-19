// import React from "react";
// import { observer } from "mobx-react-lite";
// import portfolioStore from "../../stores/PortfolioStore"; 
// import PortfolioCard from "./PortfolioCard";

// const PortfolioGridView: React.FC = observer(() => {
//   if (portfolioStore.loading) return <p>Loading portfolios...</p>;
//   if (portfolioStore.error) return <p className="text-red-500">{portfolioStore.error}</p>;

//   return (
//     <div className="flex gap-5 p-4">
//       {portfolioStore.portfolios.length > 0 ? (
//         portfolioStore.portfolios.map((portfolio) => (
//           <PortfolioCard
//             key={portfolio.id}
//             id={portfolio.id}
//             imageSrc={portfolio.gridUrl}
//             hoverImageSrc={portfolio.listUrl}
//             title={portfolio.title}
//             noOfModules={portfolio.noOfModules}
//           />
//         ))
//       ) : (
//         <p>No portfolios available</p>
//       )}
//     </div>
//   );
// });

// export default PortfolioGridView;


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
    <div className="flex gap-5 p-4">
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
