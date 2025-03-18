// import { makeAutoObservable, runInAction, observable } from "mobx";
// import { fetchData } from "../utils/fetchData";
// import { BASE_URL } from "../Constants";
// import { preview } from "vite";

// interface Texture {
//   id: number;
//   label: string;
//   previewUrl: string;
//   materialUrl: string;
//   // imageUrl: string;
//   compatibility: string[];
//   price: number;
//   manufacturer: string;
// }

// interface TextureCategory {
//   id: string;
//   title: string;
//   textures: Texture[];
// }

// class TextureStore {
//   textures: TextureCategory[] = [];
//   selectedTextures = observable.object<Record<string, Texture | null>>({}); 
//   loading = false;
//   error: string | null = null;

//   constructor() {
//     makeAutoObservable(this, {}, { autoBind: true });
//   }

//   setTextures(apiData: any[]) {
//     runInAction(() => {
//       this.textures = apiData.map((subStyle) => ({
//         id: subStyle.id,
//         title: subStyle.name,
//         textures: subStyle.materialList.map((material) => ({
//           id: material.id,
//           label: material.name,
//           previewUrl: material.samplePreviewUrl || "placeholder.png",
//           materialUrl: material.imageURL || "placeholder.png",
//           // previewUrl:material.material || "placeholder.png",
//           compatibility: subStyle.compatibility || [],
//           price: material.price || 0,
//           manufacturer: material.description || "Unknown",
//         })),
//       }));

//       this.error = null;

//       this.textures.forEach((category) => {
//         if (category.textures.length > 0) {
//           this.selectedTextures[category.id] = category.textures[0];
//         } else {
//           this.selectedTextures[category.id] = null;
//         }
//       });
//     });
//   }

//   setTexture(categoryId: string, texture: Texture) {
//     runInAction(() => {
//       this.selectedTextures[categoryId] = texture;
//     });
//   }

//   async fetchTextures() {
//     runInAction(() => {
//       this.loading = true;
//       this.error = null;
//     });

//     try {
//       const data = await fetchData(`${BASE_URL}/styles`);
//       console.log("📡 API Response:", data);

//       if (!data || typeof data !== "object" || !Array.isArray(data.subStyleList)) {
//         throw new Error("Invalid API response format");
//       }

//       this.setTextures(data.subStyleList);
//     } catch (error) {
//       console.error("❌ Fetch Error:", error);
//       runInAction(() => {
//         this.error = "Failed to fetch textures";
//       });
//     } finally {
//       runInAction(() => {
//         this.loading = false;
//       });
//     }
//   }
// }

// const textureStore = new TextureStore();
// export default textureStore;


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
      console.log("🔄 Fetching new textures...");

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
        })),
      }));

      this.error = null;

      // Preserve previously selected textures
      this.textures.forEach((category) => {
        if (
          !this.selectedTextures[category.id] || 
          !category.textures.some((t) => t.id === this.selectedTextures[category.id]?.id)
        ) {
          this.selectedTextures[category.id] = category.textures[0] || null;
        }
      });

      console.log("✅ Updated textures:", toJS(this.textures));
      console.log("✅ Selected textures after update:", toJS(this.selectedTextures));
    });
  }

  setTexture(categoryId: string, texture: Texture) {
    runInAction(() => {
      const currentTexture = this.selectedTextures[categoryId];

      if (currentTexture?.id === texture.id) {
        console.log(`🛑 Skipping update for ${categoryId} (same texture already selected)`);
        return;
      }

      console.log(`🔄 Updating selectedTextures[${categoryId}] →`, texture);
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
