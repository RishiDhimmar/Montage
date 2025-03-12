// import React from "react";
// import Navbar from "../components/Navbar";
// import Header from "../components/Header";
// import { HiDotsHorizontal } from "react-icons/hi";
// import Sidebar from "../components/PortfolioSidebar";
// import Card from "../components/UiComponent/Card";

// const PortfolioLayout = () => {
//   return (
//     <>
//       <Navbar />
//       <div className="flex h-[calc(100vh-97px)]">
//         <Sidebar />
//         <div className="w-full ">
//           <Header />
//           <div className="flex justify-start items-center gap-15 p-4 w-[300px]">
//             <div>All Designs </div>
//             <div>
//               <HiDotsHorizontal />
//             </div>
//           </div>
//           <div className=" flex gap-5">
//             <Card
//               imageSrc="/logo.png"
//               title="Annex"
//               description="description"
//             />
//             <Card
//               imageSrc="/logo.png"
//               title="Annex"
//               description="description"
//             />
//             <Card
//               imageSrc="/logo.png"
//               title="Annex"
//               description="description"
//             />
//             <Card
//               imageSrc="/logo.png"
//               title="Annex"
//               description="description"
//             />
//             <Card
//               imageSrc="/logo.png"
//               title="Annex"
//               description="description"
//             />
//           </div>
//           <div className="flex justify-between items-center px-4">
//             <div>Design</div>
//             <div className="flex gap-15 mr-20">
//               <div>Modules</div>
//               <div>Updated</div>
//             </div>
//           </div>
//           <div className="flex justify-between gap-5 border border-gray-300 bg-white shadow-md m-2 px-3 items-center rounded">
//             <div>
//               <div>Model-1</div>
//               <div>created at:10/03/25</div>
//             </div>
//             <div className="flex gap-15">
//               <div>3</div>
//               <div>11 mar 2025</div>
//               <div><HiDotsHorizontal /></div>
//               </div>  
//           </div>
        
//         </div>
//       </div>
//     </>
//   );
// };

// export default PortfolioLayout;


// import React, { useEffect } from "react";
// import { observer } from "mobx-react-lite";
// import { HiDotsHorizontal } from "react-icons/hi";
// import Navbar from "../components/Navbar";
// import Header from "../components/Header";
// import Sidebar from "../components/PortfolioSidebar";
// import Card from "../components/UiComponent/Card";
// import portfolioStore from "../stores/PortfolioStore"; 

// const PortfolioLayout: React.FC = observer(() => {
//   useEffect(() => {
//     portfolioStore.fetchDesigns(); // ✅ Fetch portfolio data on mount
//   }, []);

//   return (
//     <>
//       <Navbar />
//       <div className="flex h-[calc(100vh-97px)]">
//         <Sidebar />
//         <div className="w-full">
//           <Header />
//           <div className="flex justify-start items-center gap-15 p-4 w-[300px]">
//             <div>All Designs</div>
//             <div>
//               <HiDotsHorizontal />
//             </div>
//           </div>

//           <div className="flex gap-5 p-4">
//             {portfolioStore.loading && <p>Loading portfolios...</p>}
//             {portfolioStore.error && <p className="text-red-500">{portfolioStore.error}</p>}
//             {portfolioStore.portfolios.length > 0 ? (
//               portfolioStore.portfolios.map((portfolio) => (
//                 <div className="">
//                 <Card
//                   key={portfolio.id}
//                   imageSrc={portfolio.gridUrl} 
//                   title={portfolio.title} 
//                   description={`Modules: ${portfolio.noOfModules}`} 
//                 />
//                 </div>
//               ))
//             ) : (
//               !portfolioStore.loading && <p>No portfolios available</p>
//             )}
//           </div>

//           <div className="flex justify-between items-center px-4">
//             <div>Design</div>
//             <div className="flex gap-15 mr-20">
//               <div>Modules</div>
//               <div>Updated</div>
//             </div>
//           </div>

//           <div className="flex justify-between gap-5 border border-gray-300 bg-white shadow-md m-2 px-3 items-center rounded">
//             <div>
//               <div>Model-1</div>
//               <div>Created at: 10/03/25</div>
//             </div>
//             <div className="flex gap-15">
//               <div>3</div>
//               <div>11 Mar 2025</div>
//               <div>
//                 <HiDotsHorizontal />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// });

// export default PortfolioLayout;

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

