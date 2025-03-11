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
            <IoIosMenu />
            <div className="flex gap-4">
              <div className="border-r px-5"> Hexaa</div>
              <div> Untitle-1</div>
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
