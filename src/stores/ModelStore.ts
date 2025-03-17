import { makeAutoObservable } from "mobx";

class ModelStore {
  models = [];
  is3d = false;
  selectedModelId: number | null = null;
  hoveredModelId: number | null = null; // Track hovered model ID

  constructor() {
    makeAutoObservable(this);
  }

  addModel(
    modelPath: string,
    position: [number, number, number] = [0, 0, 0],
    rotation: [number, number, number] = [0, 0, 0]
  ) {
    const id = Date.now();
    this.models.push({ id, modelPath, position });
    console.log(this.models)
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

  // toggleModelView(id: number) {
  //   const model = this.models.find((m) => m.id === id);
  //   if (model) model.is3D = !model.is3D;
  // }

  updateModelPosition(id: number, newPosition: [number, number, number]) {
    const model = this.models.find((m) => m.id === id);
    if (model) model.position = newPosition;
  }

  updateModelRotation(id: number, newRotation: [number, number, number]) {
    const model = this.models.find((m) => m.id === id);
    if (model) model.rotation = newRotation;
  }

  toggle3D() {
    this.is3d = !this.is3d;
  }
  toggle2D() {
    this.is3d = false;
  }

  selectModel(id: number) {
    // Toggle selection: deselect if already selected; select otherwise.
    if (this.selectedModelId === id) {
      this.selectedModelId = null;
    } else {
      this.selectedModelId = id;
      console.log(this.selectedModelId)
    }
  }
  
  setHoveredModelId = (id: number) => {
    this.hoveredModelId = id;
  };

  getPosition = (id: number) => {
    const model = this.models.find((m) => m.id === id);
    return model ? model.position : null;
  };

  getRotation = (id: number) => {
    const model = this.models.find((m) => m.id === id);
    return model ? model.rotation : null;
  };

  isSelected = (id: number) => this.selectedModelId === id;
  isHovered = (id: number) => this.hoveredModelId === id;
}

const modelStore = new ModelStore();
export default modelStore;
