import React from "react";
import { IoIosMenu } from "react-icons/io";

function Navbar() {
  return (
    <div className="h-[64px] border border-gray-300 bg-[#FAFAFF] flex items-center p-4">
      <div className="flex gap-4 items-center w-full px-4">
        <div>
      <h1 className="text-xl font-bold items-center">Montage</h1>
          {/* <img src="/Montage-Logo.svg" alt="Montage" /> */}
        </div>
        <div className="px-4">
          <div className="flex items-center">
            <div className="hover:bg-gray-200 rounded p-2">
            <IoIosMenu size={20}/>
            </div>
            <div className="flex gap-4">
              <div className="px-3 font-semibold"> Hexaa</div>
              <div className="border border-black"></div>
              <div className="px-3 font-semibold"> Untitled-1</div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-400 p-5 rounded-full w-10 h-10 items-center flex justify-center">
        H
      </div>
    </div>
  );
}

export default Navbar;
