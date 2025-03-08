import { makeAutoObservable } from "mobx";

interface Texture {
  id: number;
  label: string;
  url: string;
}

class TextureStore {
  selectedTexture: Texture | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setTexture(texture: Texture) {
    this.selectedTexture = texture;
  }
}

const textureStore = new TextureStore();
export default textureStore;
