import { makeAutoObservable } from "mobx";

class DragStore {
  currentModule = null as null | any; // type it according to your module shape

  constructor() {
    makeAutoObservable(this);
  }

  setCurrentModule(module: any) {
    this.currentModule = module;
    console.log(this.currentModule,"currentModule");
  }

  clearCurrentModule() {
    this.currentModule = null;
  }
}

const dragStore = new DragStore();
export default dragStore;
