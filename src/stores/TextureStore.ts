import { makeAutoObservable, runInAction, observable, toJS } from "mobx";
import { fetchData } from "../utils/fetchData";
import { BASE_URL } from "../Constants";

interface Texture {
  id: number;
  label: string;
  previewUrl: string;
  materialUrl: string;
  compatibility: string[];
  price: number;
  manufacturer: string;
  currentSelectionCategory: string;
}

interface TextureCategory {
  id: string;
  title: string;
  textures: Texture[];
  location: string;
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
    // runInAction(() => {
    //   console.log(" Fetching new textures...");

    this.textures = apiData.map((subStyle) => ({
      id: subStyle.id,
      title: subStyle.name,
      textures: subStyle.materialList.map((material) => ({
        id: material.id,
        label: material.name,
        previewUrl: material.samplePreviewUrl || "placeholder.png",
        materialUrl: material.imageURL || "placeholder.png",
        compatibility: subStyle.compatibility || [],
        price: material.price || 0,
        manufacturer: material.description || "Unknown",
        location: subStyle.name,
      })),
    }));

    this.error = null;

    this.textures.forEach((category) => {
      console.log(category);
      if (
        !this.selectedTextures[category.title] ||
        !category.textures.some(
          (t) => t.id === this.selectedTextures[category.title]?.id
        )
      ) {
        this.selectedTextures[category.title] = {
          previewUrl: category.textures[0].previewUrl,
          materialUrl: category.textures[0].materialUrl,
        };
      }
    });

    console.log("Updated textures:", toJS(this.textures));
    console.log("Selected textures after update:", toJS(this.selectedTextures));
    // });
  }

  setTexture(categoryId: string, texture: Texture, sectionName: string) {
    const currentTexture = this.selectedTextures[categoryId];
    
    if (currentTexture?.id === texture.id) {
      console.log(`Skipping update for ${categoryId} (same texture already selected)`);
      return;
    }
  
    console.log(`Updating selectedTextures[${categoryId}] →`, texture);
    
    // Create a new texture object using the updated properties.
    this.selectedTextures[sectionName] = {
      ...this.selectedTextures[sectionName],
      ...texture, // Replace with all properties from the new texture
    };
  
    console.log(sectionName);
    console.log(this.selectedTextures);
  }
  

  resetSelectedTextures() {
    runInAction(() => {
      console.log(" Resetting selected textures to initial values...");
  
      this.textures.forEach((category) => {
        this.selectedTextures[category.id] = category.textures[0] || null;
      });
  
      console.log(" Selected textures after reset:", toJS(this.selectedTextures));
    });
  }
  
  async fetchTextures() {
    runInAction(() => {
      this.loading = true;
      this.error = null;
    });

    try {
      const data = await fetchData(`${BASE_URL}/styles`);
      console.log(" API Response:", data);

      if (
        !data ||
        typeof data !== "object" ||
        !Array.isArray(data.subStyleList)
      ) {
        throw new Error("Invalid API response format");
      }

      this.setTextures(data.subStyleList);
    } catch (error) {
      console.error(" Fetch Error:", error);
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
