import { makeAutoObservable } from "mobx";

class DesignStore {
  selectedStyle: string = "Design"; // Default selected

  constructor() {
    makeAutoObservable(this);
  }

  setSelectedStyle(style: string) {
    this.selectedStyle = style;
  }
}

const designStore = new DesignStore();
export default designStore;
