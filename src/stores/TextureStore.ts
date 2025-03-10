// import { makeAutoObservable, runInAction } from "mobx";
// import { fetchData } from "../utils/fetchData";
// import { BASE_URL } from "../Constants";

// interface Texture {
//   id: number;
//   label: string;
//   url: string;
//   compatibility: string[]; // ✅ Include compatibility
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
//   selectedTexture: Texture | null = null;
//   loading: boolean = false;
//   error: string | null = null;

//   constructor() {
//     makeAutoObservable(this, {}, { autoBind: true });
//   }

//   setTextures(apiData: any[]) {
//     runInAction(() => {
//       this.textures = apiData.map((category) => ({
//         id: category.id,
//         title: category.name,
//         textures: category.materialList.map((material) => ({
//           id: material.materialId,
//           label: material.materialTable.name,
//           url: material.materialTable.imageURL || "placeholder.png",
//           compatibility: material.materialTable.compatibility || [],
//           price: material.materialTable.price || 0, 
//           manufacturer: material.materialTable.manufacturer || "Unknown", 
//         })),
//       }));

//       this.error = null;

//       if (this.textures.length > 0 && this.textures[0].textures.length > 0) {
//         this.setTexture(this.textures[0].textures[0]);
//       }
//     });
//   }

//   setTexture(texture: Texture) {
//     runInAction(() => {
//       this.selectedTexture = texture;
//     });
//   }

//   async fetchTextures() {
//     runInAction(() => {
//       this.loading = true;
//       this.error = null;
//     });

//     try {
//       const data = await fetchData(`${BASE_URL}/sub-styles`);
//       console.log("📡 API Response:", data); // Debugging API response

//       if (!data || !Array.isArray(data)) {
//         throw new Error("Invalid API response format");
//       }

//       this.setTextures(data);
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
      this.textures = apiData.map((category) => ({
        id: category.id,
        title: category.name,
        textures: category.materialList.map((material) => ({
          id: material.materialId,
          label: material.materialTable.name,
          url: material.materialTable.imageURL || "placeholder.png",
          compatibility: material.materialTable.compatibility || [],
          price: material.materialTable.price || 0,
          manufacturer: material.materialTable.manufacturer || "Unknown",
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
      const data = await fetchData(`${BASE_URL}/sub-styles`);
      console.log("📡 API Response:", data);

      if (!data || !Array.isArray(data)) {
        throw new Error("Invalid API response format");
      }

      this.setTextures(data);
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
