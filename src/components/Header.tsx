import Button from "./UiComponent/Button";
import { PiSquaresFourLight } from "react-icons/pi"; // Importing icons
import { FaPlus, FaThList } from "react-icons/fa";
import { FiFolderPlus } from "react-icons/fi";
import Dropdown from "./UiComponent/Dropdown";
import { useNavigate } from "react-router-dom";
import portfolioStore from "../stores/PortfolioStore";
import { observer } from "mobx-react-lite";

const Header = observer(() => {
  const navigate = useNavigate();
  // const [viewMode, setViewMode] = useState("grid");

  const selectedPortfolio = portfolioStore.selectedPortfolio.get();
  const portfolioName = selectedPortfolio ? selectedPortfolio.name : "No Portfolio Selected";
  return (
    <>
      <header className=" text-white h-[60px] flex justify-between items-center px-4 ">
        <div className="flex gap-4 w-[300px] text-black w-1/3">
          <div className="font-bold text-2xl">{portfolioName}</div>
        </div>

        <div className="flex gap-3 items-center">
          <div className="flex">
            <div
              className={`${
                portfolioStore.selectedView === "grid" ? "bg-gray-200" : "bg-gray-100"
              }`}
            >
              <Button
                label="Grid"
                icon={<PiSquaresFourLight />}
                variant="tertiary"
                onClick={() => {
                  portfolioStore.setSelectedView("grid");
                }}
              />
            </div>

            <div
              className={`${
                portfolioStore.selectedView === "list" ? "bg-gray-200" : "bg-gray-100"
              }`}
            >
              <Button
                label="List"
                icon={<FaThList />}
                onClick={() => {
                  portfolioStore.setSelectedView("list");
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
});

export default Header;
