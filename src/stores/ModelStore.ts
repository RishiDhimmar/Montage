import { makeAutoObservable } from "mobx";

interface Model {
  id: number;
  modelPath: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}

class ModelStore {
  models: Model[] = [];
  is3d = false;
  selectedModelId: number | null = null;
  hoveredModelId: number | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  addModel(
    modelPath: string,
    image: string,
    position: [number, number, number] = [0, 0, 0],
    rotation: [number, number, number] = [0, 0, 0],
  ) {
    const id = Date.now();

    // Initialize each model with a default scale of [1, 1, 1]
    this.models.push({
      id,
      modelPath,
      image,
      position,
      rotation,
      scale: [1, 1, 1],
    });

    console.log(this.models);
    return id;
  }

  removeModel(id: number) {
    this.models = this.models.filter((model) => model.id !== id);
    if (this.selectedModelId === id) this.selectedModelId = null;
    if (this.hoveredModelId === id) this.hoveredModelId = null;
  }


  duplicateModel() {
    const selectedModel = this.models.find(
      (m) => m.id === this.selectedModelId
    );
    if (!selectedModel) return;

    const newModel = {
      id: Date.now(),
      modelPath: selectedModel.modelPath,
      image: selectedModel.image, // Copy the image
      position: [
        selectedModel.position[0] + 0.5,
        selectedModel.position[1],
        selectedModel.position[2] + 0.5,
      ],
      rotation: [...selectedModel.rotation],
    };

    this.models.push(newModel);
  }


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
      console.log(this.selectedModelId);
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

  flipModelHorizontally(id: number) {
    const model = this.models.find(m => m.id === id);
    if (model) {
      model.scale = [-model.scale[0], model.scale[1], model.scale[2]];
    }
  }
  
  flipModelVertically(id: number) {
    const model = this.models.find(m => m.id === id);
    if (model) {
      model.scale = [model.scale[0], model.scale[1], -model.scale[2]];
    }
  }
  

  getScale = (id: number) => {
    const model = this.models.find((m) => m.id === id);
    // console.log(model?.scale)
    return model ? model.scale : null;
  };

  isSelected = (id: number) => this.selectedModelId === id;
  isHovered = (id: number) => this.hoveredModelId === id;
}

const modelStore = new ModelStore();
export default modelStore;
