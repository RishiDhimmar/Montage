import Button from "./UiComponent/Button";
import { PiSquaresFourLight } from "react-icons/pi"; // Importing icons
import { FaPlus, FaThList } from "react-icons/fa";
import { FiFolderPlus } from "react-icons/fi";
import Dropdown from "./UiComponent/Dropdown";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { set } from "mobx";

const Header = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("grid");
  return (
    <>
      <header className=" text-white h-[60px] flex justify-between items-center px-4 ">
        <div className="flex gap-4 w-[300px] text-black w-1/3">
          <div>Hexacoder</div>
        </div>

        <div className="flex gap-3 items-center">
          <div className="flex">
            <div
              className={`${
                viewMode === "grid" ? "bg-gray-200" : "bg-gray-100"
              }`}
            >
              <Button
                label="Grid"
                icon={<PiSquaresFourLight />}
                variant="tertiary"
                onClick={() => {
                  setViewMode("grid");
                }}
              />
            </div>

            <div
              className={`${
                viewMode === "list" ? "bg-gray-200" : "bg-gray-100"
              }`}
            >
              <Button
                label="List"
                icon={<FaThList />}
                onClick={() => {
                  setViewMode("list");
                }}
              />
            </div>
          </div>
          <div>
            <Dropdown />
          </div>
          <div className="bg-gray-200 rounded">
            <Button icon={<FiFolderPlus size={20} />} />
          </div>
          <div>
            <Button
              label="New Design"
              variant="primary"
              icon={<FaPlus size={12} />}
              onClick={() => {
                console.log(" clicked");
                navigate("/design");
              }}
            />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
