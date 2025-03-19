import { makeAutoObservable } from "mobx";
import textureStore from "./TextureStore";

interface Texture {
  id: number;
  label: string;
  price: number;
}

interface Model {
  id: number;
  moduleId?: number;
  modelPath: string;
  image: string;
  name: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  noOfBathRooms: number;
  noOfBedRooms: number;
  size: number;
  price: number;
  appliedTextures: Texture[];
}

interface SavedDesign {
  id: string;
  name: string;
  models: Model[];
}

class ModelStore {
  models: Model[] = [];
  savedDesigns: SavedDesign[] = [];
  is3d = false;
  selectedModelId: number | null = null;
  hoveredModelId: number | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  addModel(
    modelPath: string,
    image: string,
    name: string,
    position: [number, number, number] = [0, 0, 0],
    rotation: [number, number, number] = [0, 0, 0],
    noOfBathRooms: number = 5,
    noOfBedRooms: number = 0,
    size: number = 1000,
    price: number = 0,
    moduleId?: number
  ) {
    const id = Date.now();
    this.models.push({
      id,
      moduleId,
      modelPath,
      image,
      name,
      position,
      rotation,
      scale: [1, 1, 1],
      noOfBathRooms,
      noOfBedRooms,
      size,
      price,
      appliedTextures: [],
    });
    return id;
  }

  removeModel(id: number) {
    this.models = this.models.filter((model) => model.id !== id);
    if (this.selectedModelId === id) this.selectedModelId = null;
    if (this.hoveredModelId === id) this.hoveredModelId = null;
  }

  duplicateModel() {
    const selectedModel = this.models.find((m) => m.id === this.selectedModelId);
    if (!selectedModel) return;

    const newModel = {
      ...selectedModel,
      id: Date.now(),
      position: [
        selectedModel.position[0] + 0.5,
        selectedModel.position[1],
        selectedModel.position[2] + 0.5,
      ],
      appliedTextures: [...selectedModel.appliedTextures],
    };

    this.models.push(newModel);
  }

  saveDesign(name: string) {
    const newDesign: SavedDesign = {
      id: Date.now().toString(),
      name,
      models: JSON.parse(JSON.stringify(this.models)),
    };
    this.savedDesigns.push(newDesign);
  }

  loadDesign(designId: string) {
    const design = this.savedDesigns.find((d) => d.id === designId);
    if (design) {
      this.models = JSON.parse(JSON.stringify(design.models));
    }
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
    this.selectedModelId = this.selectedModelId === id ? null : id;
  }

  setHoveredModelId(id: number) {
    this.hoveredModelId = id;
  }

  getPosition(id: number) {
    const model = this.models.find((m) => m.id === id);
    return model ? model.position : null;
  }

  getRotation(id: number) {
    const model = this.models.find((m) => m.id === id);
    return model ? model.rotation : null;
  }

  flipModelHorizontally(id: number) {
    const model = this.models.find((m) => m.id === id);
    if (model) {
      model.scale = [-model.scale[0], model.scale[1], model.scale[2]];
    }
  }

  flipModelVertically(id: number) {
    const model = this.models.find((m) => m.id === id);
    if (model) {
      model.scale = [model.scale[0], model.scale[1], -model.scale[2]];
    }
  }

  getScale(id: number) {
    const model = this.models.find((m) => m.id === id);
    return model ? model.scale : null;
  }

  isSelected(id: number) {
    return this.selectedModelId === id;
  }

  isHovered(id: number) {
    return this.hoveredModelId === id;
  }

  get totalBathRooms() {
    return this.models.reduce((acc, model) => acc + model.noOfBathRooms, 0);
  }

  get totalBedRooms() {
    return this.models.reduce((acc, model) => acc + model.noOfBedRooms, 0);
  }

  get totalSize() {
    return this.models.reduce((acc, model) => acc + model.size, 0);
  }

  get totalPrice() {
    if (this.models.length === 0) return 0;

    const modelTotal = this.models.reduce((acc, model) => acc + model.price, 0);

    const textureTotal =
      this.models.length > 0
        ? Object.values(textureStore.selectedTextures)
            .filter((_, index) => [0, 2, 3].includes(index))
            .reduce((sum, texture) => sum + (texture?.price || 0), 0)
        : 0;

    return modelTotal + textureTotal;
  }
}

const modelStore = new ModelStore();
export default modelStore;
