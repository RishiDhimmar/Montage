// import { makeAutoObservable } from "mobx";

// class ModelStore {
//   models = [];
//   is3d = false;
//   selectedModelId: number | null = null; // Track the selected model's ID
//   hoveredModelId: number | null = null

//   constructor() {
//     makeAutoObservable(this);
//   }

//   addModel(modelPath, position = [0, 0, 0], is3D = true) {
//     const id = Date.now();
//     this.models.push({ id, modelPath, position, is3D });
//     return id;
//   }

//   removeModel(id: number) {
//     this.models = this.models.filter((model) => model.id !== id);
//     if (this.selectedModelId === id) {
//       this.selectedModelId = null;
//     }
//   }

//   toggleModelView(id: number) {
//     const model = this.models.find((m) => m.id === id);
//     if (model) model.is3D = !model.is3D;
//   }

//   updateModelPosition(id: number, newPosition: [number, number, number]) {
//     const model = this.models.find((m) => m.id === id);
//     if (model) model.position = newPosition;
//   }

//   toggle3D() {
//     this.is3d = !this.is3d;
//   }

//   selectModel(id: number) {
//     // Toggle selection: deselect if already selected; select otherwise.
//     if (this.selectedModelId === id) {
//       this.selectedModelId = null;
//     } else {
//       this.selectedModelId = id;
//     }
//   }
// }

// const modelStore = new ModelStore();
// export default modelStore;
// ModelStore.ts
import { makeAutoObservable } from "mobx";

class ModelStore {
  models = [];
  is3d = false;
  selectedModelId: number | null = null;
  hoveredModelId: number | null = null; // Track hovered model ID

  constructor() {
    makeAutoObservable(this);
  }

  addModel(modelPath, position = [0, 0, 0], is3D = true) {
    const id = Date.now();
    this.models.push({ id, modelPath, position, is3D });
    return id;
  }

  removeModel(id: number) {
    this.models = this.models.filter((model) => model.id !== id);
    if (this.selectedModelId === id) {
      this.selectedModelId = null;
    }
    if (this.hoveredModelId === id) {
      this.hoveredModelId = null;
    }
  }

  toggleModelView(id: number) {
    const model = this.models.find((m) => m.id === id);
    if (model) model.is3D = !model.is3D;
  }

  updateModelPosition(id: number, newPosition: [number, number, number]) {
    const model = this.models.find((m) => m.id === id);
    if (model) model.position = newPosition;
  }

  toggle3D() {
    this.is3d = !this.is3d;
  }

  selectModel(id: number) {
    // Toggle selection: deselect if already selected; select otherwise.
    if (this.selectedModelId === id) {
      this.selectedModelId = null;
    } else {
      this.selectedModelId = id;
    }
  }
}

const modelStore = new ModelStore();
export default modelStore;
