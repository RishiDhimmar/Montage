import { makeAutoObservable } from "mobx";

class ModelStore {
  models: string[] = []; // ✅ Initialize as empty array

  constructor() {
    makeAutoObservable(this);
  }

  addModel(modelPath: string) {
    this.models.push(modelPath); // ✅ Add model
  }

  clearModels() {
    this.models = []; // ✅ Reset
  }
}

const modelStore = new ModelStore();
export default modelStore;

