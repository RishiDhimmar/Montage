import React from "react";
import { observer } from "mobx-react-lite";
import { HiDotsHorizontal } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../Constants";
import portfolioStore from "../../stores/PortfolioStore";
import modelStore from "../../stores/ModelStore";
import { fetchData } from "../../utils/fetchData";
import { formatDate } from "../../utils/FormatDate";
import designStore from "../../stores/DesignStore";

// Define module structure
interface Module {
  id: string;
  glbFile: string;
  moduleImage: string;
  name: string;
  noOfBathrooms: number;
  noOfBedrooms: number;
  size: number;
  pricePerSqft: number;
}

// Define the structure of a module inside moduleArr
interface ModuleArrItem {
  moduleId?: string;
  module?: Module;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
}

// Define Design structure
interface Design {
  id: string;
  name: string;
  designImage?: string;
  monogramImage?: string;
  moduleArr: ModuleArrItem[];
  createdAt?: string;
  updatedAt?: string;
}

// Define Portfolio structure
interface Portfolio {
  designs: Design[];
}

const PortfolioListView: React.FC = observer(() => {
  const selectedPortfolio = portfolioStore.selectedPortfolio.get() as Portfolio | null;
  const navigate = useNavigate();

  const handleDesignClick = async (designId: string) => {
    try {
      const url = `${BASE_URL}/design/${designId}`;
      const data = await fetchData(url);

      if (data && data.designData) {
        const design = data.designData as Design;
        modelStore.models = [];

        const portfolioName = design.name || "Unknown Portfolio";

        if (Array.isArray(design.moduleArr)) {
          design.moduleArr.forEach((moduleObj) => {
            if (!moduleObj.module) return; // Ensure module exists

            modelStore.models.push({
              id: Date.now() + Math.random(),
              moduleId: Number(moduleObj.moduleId ?? moduleObj.module?.id ?? 0),
              modelPath: moduleObj.module.glbFile,
              image: moduleObj.module.moduleImage,
              name: moduleObj.module.name,
              position: moduleObj.position ?? [0, 0, 0],
              rotation: moduleObj.rotation ?? [0, 0, 0],
              scale: moduleObj.scale ?? [1, 1, 1],
              nodePositions: [],
              noOfBathRooms: moduleObj.module.noOfBathrooms,
              noOfBedRooms: moduleObj.module.noOfBedrooms,
              size: moduleObj.module.size,
              price: moduleObj.module.pricePerSqft,
              appliedTextures: [],
            });
          });
        }
        designStore.setDesignName(portfolioName)
        designStore.setDesignId(designId);
        modelStore.isDesignSaved = true;
        modelStore.is3d = false;

        navigate("/design");
      }
    } catch (error) {
      console.error("Error loading design:", error);
    }
  };

  if (portfolioStore.loading) return <p>Loading portfolios...</p>;
  if (portfolioStore.error) return <p className="text-red-500">{portfolioStore.error}</p>;
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

      {selectedPortfolio.designs.length > 0 ? (
        selectedPortfolio.designs.map((design) => (
          <div
            key={design.id}
            className="flex justify-between gap-5 border border-gray-300 bg-white m-2 px-3 items-center rounded cursor-pointer"
            onClick={() => handleDesignClick(design.id)}
          >
            <div className="flex gap-3">
              {design.designImage && (
                <img src={design.designImage} alt={design.name} className="w-12 h-12" />
              )}
              <div>
                <div>{design.name}</div>
                <div>Created at: {design.createdAt ? formatDate(design.createdAt) : "N/A"}</div>
              </div>
            </div>
            <div className="flex gap-10">
              <div className="flex gap-15">
                <div>{design.moduleArr.length}</div>
                <div>{design.updatedAt ? formatDate(design.updatedAt) : "N/A"}</div>
              </div>
              <HiDotsHorizontal />
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
