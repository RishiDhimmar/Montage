import React from "react";
import { observer } from "mobx-react-lite";
import { HiDotsHorizontal } from "react-icons/hi";
import portfolioStore from "../../stores/PortfolioStore";

const PortfolioListView: React.FC = observer(() => {
  if (portfolioStore.loading) return <p>Loading portfolios...</p>;
  if (portfolioStore.error)
    return <p className="text-red-500">{portfolioStore.error}</p>;

  return (
    <>
      <div className="flex justify-between items-center px-4">
        <div>Design</div>
        <div className="flex gap-10 mr-13">
          <div>Modules</div>
          <div>Date Updated</div>
        </div>
      </div>

      {portfolioStore.portfolios.length > 0 ? (
        portfolioStore.portfolios.map((portfolio) => (
          <div
            key={portfolio.id}
            className="flex justify-between gap-5 border border-gray-300 bg-white shadow-md m-2 px-3 items-center rounded"
          >
            <div className="flex gap-3">
              <div>
                {portfolio.gridUrl && (
                  <img
                    src={portfolio.gridUrl}
                    alt={portfolio.title}
                    className="w-12 h-12"
                  />
                )}
              </div>
              <div>
                <div>{portfolio.title}</div>
                <div>Created at: 10/03/25</div>
              </div>
            </div>
            <div className="flex gap-10">
              <div className="flex gap-15">
                <div>{portfolio.noOfModules}</div>
                <div>11 Mar 2025</div>
              </div>
              <div>
                <HiDotsHorizontal />
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No portfolios available</p>
      )}
    </>
  );
});

export default PortfolioListView;
