import { makeAutoObservable, runInAction } from "mobx";
import { fetchData } from "../utils/fetchData";
import { BASE_URL } from "../Constants";

interface Texture {
  id: number;
  label: string;
  url: string;
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
  selectedTextures: Record<string, Texture | null> = {}; // ✅ Store selection per section
  loading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setTextures(apiData: any[]) {
    runInAction(() => {
      this.textures = apiData.map((subStyle) => ({
        id: subStyle.id,
        title: subStyle.name, // Extract `name` from subStyle
        textures: subStyle.materialList.map((material) => ({
          id: material.id, // Change from `material.materialId`
          label: material.name, // Change from `material.materialTable.name`
          url: material.imageURL || "placeholder.png", // Adjust for image source
          compatibility: subStyle.compatibility || [], // Use subStyle's compatibility
          price: material.price || 0, // Adjust price reference
          manufacturer: material.description || "Unknown", // Use description as manufacturer
        })),
      }));
  
      this.error = null;
  
      // ✅ Initialize `selectedTextures` with the first texture in each category
      this.textures.forEach((category) => {
        if (category.textures.length > 0) {
          this.selectedTextures[category.id] = category.textures[0];
        }
      });
    });
  }  

  setTexture(categoryId: string, texture: Texture) {
    runInAction(() => {
      this.selectedTextures[categoryId] = texture;
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
  
      // Extract sub-styles correctly
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
