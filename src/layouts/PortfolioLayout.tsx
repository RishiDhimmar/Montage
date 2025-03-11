import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import { HiDotsHorizontal } from "react-icons/hi";
import Sidebar from "../components/PortfolioSidebar";
import Card from "../components/UiComponent/Card";

const PortfolioLayout = () => {
  return (
    <>
      <Navbar />
      <div className="flex h-[calc(100vh-97px)]">
        <Sidebar />
        <div className="w-full ">
          <Header />
          <div className="flex justify-start items-center gap-15 p-4 w-[300px]">
            <div>All Designs </div>
            <div>
              <HiDotsHorizontal />
            </div>
          </div>
          <div className=" flex gap-5">
            <Card
              imageSrc="/logo.png"
              title="Annex"
              description="description"
            />
            <Card
              imageSrc="/logo.png"
              title="Annex"
              description="description"
            />
            <Card
              imageSrc="/logo.png"
              title="Annex"
              description="description"
            />
            <Card
              imageSrc="/logo.png"
              title="Annex"
              description="description"
            />
            <Card
              imageSrc="/logo.png"
              title="Annex"
              description="description"
            />
          </div>
          <div className="flex justify-between items-center px-4">
            <div>Design</div>
            <div className="flex gap-15 mr-20">
              <div>Modules</div>
              <div>Updated</div>
            </div>
          </div>
          <div className="flex justify-between gap-5 border border-gray-300 bg-white shadow-md m-2 px-3 items-center rounded">
            <div>
              <div>Model-1</div>
              <div>created at:10/03/25</div>
            </div>
            <div className="flex gap-15">
              <div>3</div>
              <div>11 mar 2025</div>
              <div><HiDotsHorizontal /></div>
              </div>  
          </div>
        
        </div>
      </div>
    </>
  );
};

export default PortfolioLayout;
