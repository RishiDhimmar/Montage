// import { makeAutoObservable } from "mobx";

// class DragStore {
//   currentModule = null as null | any; // type it according to your module shape

//   constructor() {
//     makeAutoObservable(this);
//   }

//   setCurrentModule(module: any) {
//     this.currentModule = module;
//     console.log(this.currentModule,"currentModule");
//   }

//   clearCurrentModule() {
//     this.currentModule = null;
//   }
// }

// const dragStore = new DragStore();
// export default dragStore;


import { makeAutoObservable } from "mobx";

interface DraggedModule {
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

class DragStore {
  currentModule: DraggedModule | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setCurrentModule(module: DraggedModule) {
    this.currentModule = module;
    console.log(this.currentModule, "currentModule");
  }

  clearCurrentModule() {
    this.currentModule = null;
  }
}

const dragStore = new DragStore();
export default dragStore;
