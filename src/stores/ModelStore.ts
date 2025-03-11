import { makeAutoObservable } from "mobx";

class ModelStore {
  models = [];
  is3d = false;

  constructor() {
    makeAutoObservable(this);
  }

  addModel(modelPath, position = [0, 0, 0], is3D = true) {
    this.models.push({ id: Date.now(), modelPath, position, is3D });
  }

  removeModel(id) {
    this.models = this.models.filter((model) => model.id !== id);
  }

  toggleModelView(id) {
    const model = this.models.find((m) => m.id === id);
    if (model) model.is3D = !model.is3D;
  }

  updateModelPosition(id, newPosition) {
    const model = this.models.find((m) => m.id === id);
    if (model) model.position = newPosition;
  }

  toggle3D() {
    this.is3d = !this.is3d;
  }
}

const modelStore = new ModelStore();
export default modelStore;
