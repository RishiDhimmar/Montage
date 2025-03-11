import { makeAutoObservable, runInAction, observable } from "mobx";
import { fetchData } from "../utils/fetchData";
import { BASE_URL } from "../Constants";

interface Portfolio {
  id: string;
  title: string;
  gridUrl: string;
  listUrl: string;
  noOfModules: number;
}

class PortFolioStore {
  portfolios: Portfolio[] = [];
  selectedView: string | null = "grid";
  selectedPortfolio = observable.box<Portfolio | null>(null);
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setSelectedView(view: string) {
    runInAction(() => {
      this.selectedView = view;
      console.log(this.selectedView);   
    });
  }
  setPortfolios(apiData: any[]) {
    runInAction(() => {
      this.portfolios = apiData.map((portfolio) => {
        const firstDesign = (portfolio.designs && portfolio.designs.length > 0)
          ? portfolio.designs[0]
          : null;
          
        return {
          id: portfolio.id,
          title: firstDesign?.name,
          gridUrl: firstDesign?.designImage || "placeholder.png",
          listUrl: firstDesign?.monogramImage || "placeholder.png",
          noOfModules: firstDesign?.moduleArr ? firstDesign.moduleArr.length : 0,
        };
      });

      this.error = null;

      if (this.portfolios.length > 0) {
        this.selectedPortfolio.set(this.portfolios[0]);
      } else {
        this.selectedPortfolio.set(null);
      }
    });
  }

  setSelectedPortfolio(portfolio: Portfolio) {
    runInAction(() => {
      this.selectedPortfolio.set(portfolio);
    });
  }

  async fetchDesigns() {
    runInAction(() => {
      this.loading = true;
      this.error = null;
    });

    try {
      const data = await fetchData(`${BASE_URL}/portfolios`);
      console.log("📡 API Response:", data);

      if (!data || typeof data !== "object" || !Array.isArray(data.portFolios)) {
        throw new Error("Invalid API response format");
      }

      this.setPortfolios(data.portFolios);
    } catch (error) {
      console.error("❌ Fetch Error:", error);
      runInAction(() => {
        this.error = "Failed to fetch portfolio designs";
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}

const portfolioStore = new PortFolioStore();
export default portfolioStore;
