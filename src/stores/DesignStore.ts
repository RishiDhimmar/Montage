import { makeAutoObservable } from "mobx";

class DesignStore {
  selectedStyle: string = "Design"; // Default selected
  designName: string = "Untitled-1";

  constructor() {
    makeAutoObservable(this);
  }

  setSelectedStyle(style: string) {
    this.selectedStyle = style;
  }

  setDesignName(name: string) {
    this.designName = name;
  }
}

const designStore = new DesignStore();
export default designStore;
