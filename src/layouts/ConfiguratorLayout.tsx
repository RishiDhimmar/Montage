import React from "react";
import Navbar from "../components/Navbar";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import Center from "../components/Center";
function ConfiguratorLayout() {
  return (
    <>
      <Navbar />
      <div className="flex flex-row h-full">
        <LeftSidebar />
        <Center />
        <RightSidebar />
      </div>
    </>
  );
}

export default ConfiguratorLayout;
