import { makeAutoObservable } from "mobx";

class DesignStore {
  selectedStyle: string = "Design"; // Default selected
  designName: string = "Untitled-1";
  designId: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  setSelectedStyle(style: string) {
    this.selectedStyle = style;
  }

  setDesignName(name: string) {
    this.designName = name;
  }
  setDesignId(id: string) {
    this.designId = id;
  }
}

const designStore = new DesignStore();
export default designStore;
