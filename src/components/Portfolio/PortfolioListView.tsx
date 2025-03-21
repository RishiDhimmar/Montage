import React from "react";
import { observer } from "mobx-react-lite";
import { HiDotsHorizontal } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../Constants";
import portfolioStore from "../../stores/PortfolioStore";
import modelStore from "../../stores/ModelStore";
import { fetchData } from "../../utils/fetchData";
import { formatDate } from "../../utils/FormatDate";

const PortfolioListView: React.FC = observer(() => {
  const selectedPortfolio = portfolioStore.selectedPortfolio.get();
  const navigate = useNavigate();

  const handleDesignClick = async (designId: string) => {
    try {
      const url = `${BASE_URL}/design/${designId}`;
      const data = await fetchData(url);
      if (data && data.designData) {
        const design = data.designData;
        modelStore.models = [];

        if (Array.isArray(design.moduleArr)) {
          design.moduleArr.forEach((moduleObj: any) => {
            const newModel = {
              id: Date.now() + Math.random(), // Unique id
              moduleId: moduleObj.moduleId || moduleObj.module?.id || null,
              modelPath: moduleObj.module?.glbFile || "",
              image: moduleObj.module?.moduleImage || "",
              name: moduleObj.module?.name || "",
              position: Array.isArray(moduleObj.position)
                ? moduleObj.position
                : [0, 0, 0],
              rotation: Array.isArray(moduleObj.rotate)
                ? moduleObj.rotate
                : [0, 0, 0],
              scale: Array.isArray(moduleObj.scale)
                ? moduleObj.scale
                : [1, 1, 1],
              nodePositions: [], 
              noOfBathRooms: moduleObj.module?.noOfBathrooms ?? 0,
              noOfBedRooms: moduleObj.module?.noOfBedrooms ?? 0,
              size: moduleObj.module?.size ?? 1000,
              price: moduleObj.module?.pricePerSqft ?? 0,
              appliedTextures: []
            };

            modelStore.models.push(newModel);
          });
        }
        navigate("/design");
      }
    } catch (error) {
      console.error("Error loading design:", error);
    }
  };

  if (portfolioStore.loading) return <p>Loading portfolios...</p>;
  if (portfolioStore.error)
    return <p className="text-red-500">{portfolioStore.error}</p>;
  if (!selectedPortfolio) return <p>No portfolio selected</p>;

  return (
    <>
      <div className="flex justify-between items-center px-4">
        <div>Design</div>
        <div className="flex gap-10 mr-13">
          <div>Modules</div>
          <div>Date Updated</div>
        </div>
      </div>

      {selectedPortfolio.designs && selectedPortfolio.designs.length > 0 ? (
        selectedPortfolio.designs.map((design) => (
          <div
            key={design.id}
            className="flex justify-between gap-5 border border-gray-300 bg-white m-2 px-3 items-center rounded cursor-pointer"
            onClick={() => handleDesignClick(design.id)}
          >
            <div className="flex gap-3">
              <div>
                {design.designImage && (
                  <img
                    src={design.designImage}
                    alt={design.name}
                    className="w-12 h-12"
                  />
                )}
              </div>
              <div>
                <div>{design.name}</div>
                <div>Created at: {formatDate(design.createdAt)}</div>
              </div>
            </div>
            <div className="flex gap-10">
              <div className="flex gap-15">
                <div>{design.moduleArr ? design.moduleArr.length : 0}</div>
                <div>{formatDate(design.updatedAt)}</div>
              </div>
              <div>
                <HiDotsHorizontal />
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No designs available for this portfolio</p>
      )}
    </>
  );
});

export default PortfolioListView;
