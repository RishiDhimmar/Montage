import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import SignupSidebar from "../components/SignupSidebar";

const PortfolioLayout = () => {
  return (
    <>
      <Navbar />
      <div className="flex h-[calc(100vh-97px)]">
          <SignupSidebar />
        
          <Header />
        
      </div>
    </>
  );
};

export default PortfolioLayout;
