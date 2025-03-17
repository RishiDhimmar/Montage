import React, { useState } from "react";
import Navbar from "../components/Navbar";
import LeftSidebar from "../components/Layout/LeftSidebar";
import Center from "../components/Layout/Center";
import RightSidebar from "../components/Layout/RightSideBar";

function ConfiguratorLayout() {
  const [isLeftOpen, setIsLeftOpen] = useState(true);
  const [isRightOpen, setIsRightOpen] = useState(true);

  const toggleLeftSidebar = () => setIsLeftOpen((prev) => !prev);
  const toggleRightSidebar = () => setIsRightOpen((prev) => !prev);

  return (
    <>
      <Navbar />
      <div className="relative w-full h-[calc(100vh-64px)]">
        <Center
          onToggleLeft={toggleLeftSidebar}
          onToggleRight={toggleRightSidebar}
          isLeftOpen={isLeftOpen}
          isRightOpen={isRightOpen}
        />

        <LeftSidebar isOpen={isLeftOpen} />
        <RightSidebar isOpen={isRightOpen} />
      </div>
    </>
  );
}

export default ConfiguratorLayout;

