import { makeAutoObservable, runInAction } from "mobx";
import { fetchData } from "../utils/fetchData"; 
import { BASE_URL } from "../Constants";

interface Module {
  id: number;
  name: string;
  image: string;
  model: string;
  price: number;
  noOfBedRooms: number;
  noOfBathRooms: number;
  size: number;
  moduleType: string;
}

class ModuleStore {
  modules: Module[] = [];
  selectedModule: Module | null = null;
  loading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setModules(apiData: any[]) {
    runInAction(() => {
      this.modules = apiData.map((module) => ({
        id: module.id,
        name: module.name,
        image: module.moduleImage || "placeholder.png",
        model: module.glbFile,
        price: module.pricePerSqft || 0,
        noOfBedRooms: module.noOfBedrooms || 0,
        noOfBathRooms: module.noOfBathrooms || 0,
        size: module.size || 0,
        moduleType: module.moduleType?.name || "Unknown",
      }));

      this.error = null;

      if (this.modules.length > 0) {
        this.setSelectedModule(this.modules[0]); // Default to first module
      }
    });
  }

  setSelectedModule(module: Module) {
    runInAction(() => {
      this.selectedModule = module;
    });
  }

  async fetchModules() {
    runInAction(() => {
      this.loading = true;
      this.error = null;
    });

    try {
      const data = await fetchData(`${BASE_URL}/modules`); // Replace with actual API endpoint
      console.log("📡 API Response:", data); // Debugging API response

      if (!data || !Array.isArray(data)) {
        throw new Error("Invalid API response format");
      }

      this.setModules(data);
    } catch (error) {
      console.error("❌ Fetch Error:", error);
      runInAction(() => {
        this.error = "Failed to fetch modules";
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}

const moduleStore = new ModuleStore();
export default moduleStore;
