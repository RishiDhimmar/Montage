import { makeAutoObservable } from "mobx";
import textureStore from "./TextureStore";
import * as THREE from "three";

interface Texture {
  id: number;
  label: string;
  price: number;
}

interface NodeData {
  startPoint: THREE.Vector3;
  endPoint: THREE.Vector3;
  axis: string;
  farthestNormalPoint: THREE.Vector3;
  normal: THREE.Vector3;
  id: number;
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
  nodePositions: NodeData[];

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
  isDesignSaved = false;

  constructor() {
    makeAutoObservable(this);
  }

  addModel(
    modelPath: string,
    image: string,
    name: string,
    position: [number, number, number] = [0, 0, 0],
    rotation: [number, number, number] = [0, 0, 0],
    nodePositions: [],
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
      // Use the passed nodePositions instead of always an empty array
      nodePositions: nodePositions,
      noOfBathRooms,
      noOfBedRooms,
      size,
      price,
      appliedTextures: [],
    });
    console.log("Model added with node positions:", this.models);

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

    // Type assertion added here to ensure position is of type [number, number, number]
    const newPosition = [
      selectedModel.position[0] + 0.5,
      selectedModel.position[1],
      selectedModel.position[2] + 0.5,
    ] as [number, number, number];

    const newModel = {
      ...selectedModel,
      id: Date.now(),
      position: newPosition,
      appliedTextures: [...selectedModel.appliedTextures],
    };

    this.models.push(newModel);
  }

  clearModels() {
    this.models = [];
  }
  
  setNodePositions(id: number, nodePositions: NodeData[]) {
    console.log(id)
    const model = this.models.find((m) => m.id === id);
    if (model) {
      model.nodePositions = nodePositions; 
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

  selectModel(id: number | null) {
    this.selectedModelId = this.selectedModelId === id ? null : id;
  }

  getModel(id: number) {
    return this.models.find((m) => m.id === id);
  }

  setHoveredModelId = (id: number) => {
    this.hoveredModelId = id;
  }

  getPosition(id: number) {
    const model = this.models.find((m) => m.id === id);
    return model ? model.position : null;
  }

  setPosition = (id: number, position: [number, number, number]) => {
    const model = this.models.find((m) => m.id === id);
    if (model) model.position = position;
  };

  setPositionYTo0 = (id: number) => {
    const model = this.models.find((m) => m.id === id);
    if (model) model.position[1] = 0;
  };

  getRotation = (id: number) => {
    const model = this.models.find((m) => m.id === id);
    return model ? model.rotation : null;
  }

  flipModelHorizontally(id: number | null) {
    if (!id) return;
    const model = this.models.find((m) => m.id === id);
    if (model) {
      model.scale = [-model.scale[0], model.scale[1], model.scale[2]];
      this.selectedModelId = id;
    }
  }

  flipModelVertically(id: number | null) {
    if (!id) return;
    const model = this.models.find((m) => m.id === id);
    if (model) {
      model.scale = [model.scale[0], model.scale[1], -model.scale[2]];
      this.selectedModelId = id;
    }
  }

  setDesignSaved(saved: boolean) {
    this.isDesignSaved = saved;
  }

  getScale = (id: number) => {
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

  getAllNodesFlat() {
    return this.models.flatMap((model) => ({
      modelid: model.id,
      nodes: model.nodePositions.map((pos) => [pos.farthestNormalPoint.x, pos.farthestNormalPoint.y, pos.farthestNormalPoint.z]),
    }));
  }

  getNodesFlatArray() {
    return this.models.flatMap((model) =>
      model.nodePositions.map((pos) => ({
        modelid: model.id,
        position: [pos.farthestNormalPoint.x, pos.farthestNormalPoint.y, pos.farthestNormalPoint.z],
      }))
    );
  }
}

const modelStore = new ModelStore();
export default modelStore;
