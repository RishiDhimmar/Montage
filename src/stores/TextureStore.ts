import { makeAutoObservable, runInAction, observable } from "mobx";
import { fetchData } from "../utils/fetchData";
import { BASE_URL } from "../Constants";

interface Texture {
  id: number;
  label: string;
  imageUrl: string;
  materialUrl: string;
  compatibility: string[];
  price: number;
  manufacturer: string;
}

interface TextureCategory {
  id: string;
  title: string;
  textures: Texture[];
}

class TextureStore {
  textures: TextureCategory[] = [];
  selectedTextures = observable.object<Record<string, Texture | null>>({}); 
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setTextures(apiData: any[]) {
    runInAction(() => {
      this.textures = apiData.map((subStyle) => ({
        id: subStyle.id,
        title: subStyle.name,
        textures: subStyle.materialList.map((material) => ({
          id: material.id,
          label: material.name,
          imageUrl: material.samplePreviewUrl || "placeholder.png",
          materialUrl: material.imageURL || "placeholder.png",
          compatibility: subStyle.compatibility || [],
          price: material.price || 0,
          manufacturer: material.description || "Unknown",
        })),
      }));

      this.error = null;

      this.textures.forEach((category) => {
        if (category.textures.length > 0) {
          this.selectedTextures[category.id] = category.textures[0]; // ✅ Fixed `.set()`
        } else {
          this.selectedTextures[category.id] = null; // ✅ Explicitly handle empty categories
        }
      });
    });
  }

  setTexture(categoryId: string, texture: Texture) {
    runInAction(() => {
      this.selectedTextures[categoryId] = texture; // ✅ Fixed `.set()`
    });
  }

  async fetchTextures() {
    runInAction(() => {
      this.loading = true;
      this.error = null;
    });

    try {
      const data = await fetchData(`${BASE_URL}/styles`);
      console.log("📡 API Response:", data);

      if (!data || typeof data !== "object" || !Array.isArray(data.subStyleList)) {
        throw new Error("Invalid API response format");
      }

      this.setTextures(data.subStyleList);
    } catch (error) {
      console.error("❌ Fetch Error:", error);
      runInAction(() => {
        this.error = "Failed to fetch textures";
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}

const textureStore = new TextureStore();
export default textureStore;
