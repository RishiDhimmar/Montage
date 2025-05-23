import { AUTH_TOKEN, BASE_URL } from "../Constants";

interface ConfiguredStyle {
  subStyleId: number;
  selectedMaterialId: number | null;
}

interface Module {
  moduleId: number;
  lock: boolean;
  scale: number[];
  rotation: number[];
  position: [number, number, number];
}

interface SaveDesignPayload {
  name: string;
  styleId: number;
  version: string;
  configuredStyle: ConfiguredStyle[];
  moduleArr: Module[];
}

//  Fixed: Ensure the interface matches the actual API response
export interface SaveDesignResponse {
  success: boolean;
  id?: string; // UUID of saved design
  message?: string;
  designImage?: string;
  monogramImage?: string;
  error?: string;
}

interface TextureStore {
  selectedTextures: Record<string, { id: number } | null>;
}

interface Model {
  moduleId?: number;
  scale: number[];
  rotation: number[];
  position: [number, number, number];
}

interface ModelStore {
  models: Model[];
}

export async function saveDesign(
  designName: string,
  portfolioId: string,
  textureStore: TextureStore,
  modelStore: ModelStore
): Promise<SaveDesignResponse | null> {
  console.log(textureStore.selectedTextures, "selectedTextures");

  const categoryToSubStyleId: Record<string, number> = {};
  let currentId = 1;

  Object.keys(textureStore.selectedTextures)
    .slice(0, 9)
    .forEach((categoryTitle) => {
      if (!categoryToSubStyleId[categoryTitle] && currentId <= 9) {
        categoryToSubStyleId[categoryTitle] = currentId++;
      }
    });

  const configuredStyle: ConfiguredStyle[] = Object.entries(
    textureStore.selectedTextures
  )
    .slice(0, 9)
    .map(([categoryTitle, texture]) => ({
      subStyleId: categoryToSubStyleId[categoryTitle],
      selectedMaterialId: texture ? texture.id : null,
    }));

  const moduleArr: Module[] = modelStore.models.map((model) => ({
    moduleId: model.moduleId || 0,
    lock: true,
    scale: model.scale,
    rotation: model.rotation,
    position: model.position,
  }));

  const payload: SaveDesignPayload = {
    name: designName,
    styleId: 1,
    version: "0.0.1",
    configuredStyle, // Now guaranteed to have ≤9 items
    moduleArr,
  };

  try {
    const response = await fetch(
      `${BASE_URL}/design?portfolioId=${portfolioId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to save design");
    }

    return await response.json();
  } catch (error) {
    console.error("Error saving design:", error);
    return null;
  }
}
