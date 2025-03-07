import React from "react";
// import { Search } from "lucide-react"; // Import search icon
import { FaRegFolder } from "react-icons/fa";
import Navbar from "./Navbar";
import Card from "./UiComponent/Card";


interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  return (
    <>
    {/* <Navbar/> */}
    <div className="w-[330px] min-h-[calc(100vh-60px)] bg-[#FCFCFC] p-4 shadow-lg flex flex-col">
      <nav className="flex justify-between gap-3">
        <a href="#">My Portfolios</a>
        <FaRegFolder className="text-2xl hover:text-blue-500"/>
      </nav>
      <div className="border-t border-gray-300 my-4"></div>

      {/* Search Box */}
      <div className="border border-gray-300 rounded-md flex items-center px-3 py-2">
        {/* <Search className="text-gray-500" size={18} /> */}
        <input
          type="text"
          placeholder="Search..."
          className="ml-2 w-full outline-none bg-transparent"
        />
      </div>

      <div className="border-t border-gray-300 my-4"></div>
      <div className="w-[300px] h-[300px] ">
      <Card imageSrc="/logo.png" title="Logo" description="The logo 1" />
      </div>
      <div className="w-[300px] h-[300px] ">
      <Card imageSrc="/logo.png" title="Logo" description="The logo 1" />
      </div>
    </div>
    </>
  );
};

export default Sidebar;


