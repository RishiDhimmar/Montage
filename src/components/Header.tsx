import Button from "./UiComponent/Button";
import { PiSquaresFourLight } from "react-icons/pi"; // Importing icons
import { FaPlus, FaThList } from "react-icons/fa";
import { FiFolderPlus } from "react-icons/fi";
import Dropdown from "./UiComponent/Dropdown";

const Header = () => {
  return (
    <>
      <header className=" text-white h-[60px] flex justify-between items-center w-3/4 ">
        <div className="flex gap-4 w-[300px] text-black w-1/3">
          <div>Hexacoder</div>
        </div>

        <div className="flex gap-3 items-center">
          <div>
            <Button label="Grid" icon={<PiSquaresFourLight />} />
          </div>

          <div>
            <Button label="List" icon={<FaThList />} />
          </div>
          <div>
            <Dropdown />
          </div>
          <div className="">
            <Button icon={<FiFolderPlus size={20} />} />
          </div>
          <div>
            <Button
              label="New Design"
              variant="primary"
              icon={<FaPlus size={14} />}
            />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
