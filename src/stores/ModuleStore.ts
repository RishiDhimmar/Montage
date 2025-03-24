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
  moduleTypeId: number;
}

class ModuleStore {
  modules: Module[] = [];
  selectedModule: Module | null = null;
  selectedCategory: string | null = "Annex"; 
  loading: boolean = false;
  error: string | null = null;
  isDataLoaded: boolean = false; //  Flag to check if data is loaded

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get filteredModules() {
    if (!this.selectedCategory) return this.modules;
    return this.modules.filter(module => module.moduleType === this.selectedCategory);
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
        moduleTypeId: module.moduleType?.id || 1
      }));

      this.error = null;
      this.selectedModule = null;
      this.isDataLoaded = true; //  Mark data as loaded

      if (this.filteredModules.length > 0) {
        this.setSelectedModule(this.filteredModules[0]);
      }
    });
  }

  setSelectedModule(module: Module) {
    runInAction(() => {
      this.selectedModule = module;
      console.log(this.selectedModule, "selectedModule");
    });
  }

  setSelectedCategory(category: string | null) {
    runInAction(() => {
      this.selectedCategory = category;
      this.selectedModule = null;
    });
  }

  async fetchModules() {
    if (this.isDataLoaded) return; //  Prevent unnecessary API calls

    runInAction(() => {
      this.loading = true;
      this.error = null;
    });

    try {
      const data = await fetchData(`${BASE_URL}/modules`);

      if (!data || !Array.isArray(data)) {
        throw new Error("Invalid API response format");
      }

      this.setModules(data);
    } catch (error) {
      console.error("Fetch Error:", error);
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
