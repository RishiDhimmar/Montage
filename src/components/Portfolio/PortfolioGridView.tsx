// import React from "react";
// import { observer } from "mobx-react-lite";
// import { useNavigate } from "react-router-dom";
// import { BASE_URL } from "../../Constants";
// import portfolioStore from "../../stores/PortfolioStore";
// import modelStore from "../../stores/ModelStore";
// import PortfolioCard from "./PortfolioCard";
// import { fetchData } from "../../utils/fetchData";

// const PortfolioGridView: React.FC = observer(() => {
//   const selectedPortfolio = portfolioStore.selectedPortfolio.get();
//   const navigate = useNavigate();

//   const handleDesignClick = async (designId: string) => {
//     try {
//       const url = `${BASE_URL}/design/${designId}`;
      
//       const data = await fetchData(url);
//       if (data && data.designData) {
//         const design = data.designData;
        
//         modelStore.models = [];
        
//         if (Array.isArray(design.moduleArr)) {
//           design.moduleArr.forEach((moduleObj: any) => {
//             console.log(moduleObj);

//             const newModel = {
//               id: Date.now() + Math.random(),
//               moduleId: moduleObj.moduleId || moduleObj.module?.id || null,
//               modelPath: moduleObj.module?.glbFile || "",
//               image: moduleObj.module?.moduleImage || "",
//               name: moduleObj.module?.name || "",
//               position: Array.isArray(moduleObj.position)
//                 ? moduleObj.position
//                 : [0, 0, 0],
//               rotation: Array.isArray(moduleObj.rotate)
//                 ? moduleObj.rotate
//                 : [0, 0, 0],
//               scale: Array.isArray(moduleObj.scale)
//                 ? moduleObj.scale
//                 : [1, 1, 1],
//               nodePositions: [], 
//               noOfBathRooms: moduleObj.module?.noOfBathrooms ?? 0,
//               noOfBedRooms: moduleObj.module?.noOfBedrooms ?? 0,
//               size: moduleObj.module?.size ?? 1000,
//               price: moduleObj.module?.pricePerSqft ?? 0,
//               appliedTextures: [],
//             };

//             modelStore.models.push(newModel);
//           });
//         }
        
//         navigate("/design");
//       }
//     } catch (error) {
//       console.error("Error loading design:", error);
//     }
//   };

//   if (portfolioStore.loading) return <p>Loading portfolios...</p>;
//   if (portfolioStore.error)
//     return <p className="text-red-500">{portfolioStore.error}</p>;
//   if (!selectedPortfolio) return <p>No portfolio selected</p>;

//   return (
//     <div className="flex flex-wrap gap-4 p-4">
//       {selectedPortfolio.designs && selectedPortfolio.designs.length > 0 ? (
//         selectedPortfolio.designs.map((design) => (
//           <div key={design.id} onClick={() => handleDesignClick(design.id)}>
//             <PortfolioCard
//               id={design.id}
//               imageSrc={design.designImage}
//               hoverImageSrc={design.monogramImage}
//               title={design.name}
//               noOfModules={design.moduleArr ? design.moduleArr.length : 0}
//             />
//           </div>
//         ))
//       ) : (
//         <p>No designs available for this portfolio</p>
//       )}
//     </div>
//   );
// });

// export default PortfolioGridView;

import React from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../Constants";
import portfolioStore from "../../stores/PortfolioStore";
import modelStore from "../../stores/ModelStore";
import PortfolioCard from "./PortfolioCard";
import { fetchData } from "../../utils/fetchData";
import designStore from "../../stores/DesignStore";

const PortfolioGridView: React.FC = observer(() => {
  const selectedPortfolio = portfolioStore.selectedPortfolio.get();
  const navigate = useNavigate();

  const handleDesignClick = async (designId: string) => {
    try {
      const url = `${BASE_URL}/design/${designId}`;
      const data = await fetchData(url);
  
      if (data && data.designData) {
        const design = data.designData;
  
        
        const portfolioName = design.name || "Unknown Portfolio";
        
        modelStore.models = [];
  
        if (Array.isArray(design.moduleArr)) {
          design.moduleArr.forEach((moduleObj: any) => {
            const newModel = {
              id: Date.now() + Math.random(),
              moduleId: moduleObj.moduleId || moduleObj.module?.id || null,
              modelPath: moduleObj.module?.glbFile || "",
              image: moduleObj.module?.moduleImage || "",
              name: moduleObj.module?.name || "",
              portfolioName, // Store portfolio name
              position: Array.isArray(moduleObj.position) ? moduleObj.position : [0, 0, 0],
              rotation: Array.isArray(moduleObj.rotate) ? moduleObj.rotate : [0, 0, 0],
              scale: Array.isArray(moduleObj.scale) ? moduleObj.scale : [1, 1, 1],
              nodePositions: [], 
              noOfBathRooms: moduleObj.module?.noOfBathrooms ?? 0,
              noOfBedRooms: moduleObj.module?.noOfBedrooms ?? 0,
              size: moduleObj.module?.size ?? 1000,
              price: moduleObj.module?.pricePerSqft ?? 0,
              appliedTextures: [],
            };
  
            modelStore.models.push(newModel);
          });
        }
        designStore.setDesignName(portfolioName)
        designStore.setDesignId(designId);
        modelStore.isDesignSaved = true;
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
    <div className="flex flex-wrap gap-4 p-4">
      {selectedPortfolio.designs && selectedPortfolio.designs.length > 0 ? (
        selectedPortfolio.designs.map((design) => (
          <div key={design.id} onClick={() => handleDesignClick(design.id)}>
            <PortfolioCard
              id={design.id}
              imageSrc={design.designImage}
              hoverImageSrc={design.monogramImage}
              title={design.name}
              noOfModules={design.moduleArr ? design.moduleArr.length : 0}
            />
          </div>
        ))
      ) : (
        <p>No designs available for this portfolio</p>
      )}
    </div>
  );
});

export default PortfolioGridView;
