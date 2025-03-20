import { MainMenuDropdown } from "./Dropdowns/MainMenuDropdown";
import { useNavigate, useLocation } from "react-router-dom";
import portfolioStore from "../stores/PortfolioStore";
import designStore from "../stores/DesignStore";
import { observer } from "mobx-react-lite";

const Navbar = observer(() => {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedPortfolio = portfolioStore.selectedPortfolio.get();
  const portfolioName = selectedPortfolio
    ? selectedPortfolio.name
    : "No Portfolio Selected";

  return (
    <div className="h-[64px] border border-gray-300 bg-[#FAFAFF] flex items-center p-4">
      <div className="flex gap-4 items-center w-full px-2">
        <div
          className="text-xl font-bold cursor-pointer"
          onClick={() => navigate("/portfolio")}
        >
          <img src="/Montage-Logo.svg" alt="Montage" />
        </div>

        {location.pathname !== "/portfolio" && (
          <div className="flex items-center">
            <div className="hover:bg-gray-200 rounded flex items-center">
              <MainMenuDropdown designName={designStore.designName} />
            </div>
            <div className="flex gap-4">
              <div className="px-3 font-semibold">{portfolioName}</div>
              <div className="border border-black"></div>

              <input
                type="text"
                className="px-3 font-semibold bg-transparent border-b border-gray-400 w-[100px]"
                value={designStore.designName}
                onChange={(e) => designStore.setDesignName(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-400 p-5 rounded-full w-10 h-10 items-center flex justify-center">
        H
      </div>
    </div>
  );
});

export default Navbar;
