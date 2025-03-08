import React from "react";
import Navbar from "../components/Navbar";
import RightSidebar from "../components/Layout/RightSideBar";
import Center from "../components/Layout/Center";
import LeftSidebar from "../components/Layout/LeftSidebar";
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
