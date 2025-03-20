import { AUTH_TOKEN, BASE_URL } from "../Constants";

interface SaveDesignPayload {
  name: string;
  styleId: number;
  version: string;
  configuredStyle: { subStyleId: number; selectedMaterialId: number }[];
  moduleArr: { moduleId: number; lock: boolean; scale: number[]; rotate: number[] }[];
}

export async function saveDesign(
  designName: string,
  portfolioId: string,
  textureStore: any,
  modelStore: any,
) {
  const configuredStyle = Object.entries(textureStore.selectedTextures).map(([subStyleId, texture]) => ({
    subStyleId: Number(subStyleId),
    selectedMaterialId: texture ? texture.id : null,
  }));

  const moduleArr = modelStore.models.map((model) => ({
    moduleId: model.moduleId || 0,
    lock: true,
    scale: model.scale,
    rotate: model.rotation,
  }));

  const payload: SaveDesignPayload = {
    name: designName,
    styleId: 1,
    version: "0.0.1",
    configuredStyle,
    moduleArr,
  };

  try {
    const response = await fetch(`${BASE_URL}/design?portfolioId=${portfolioId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to save design");
    }

    const data = await response.json();
    console.log("Design saved successfully:", data);
    return data;
  } catch (error) {
    console.error("Error saving design:", error);
    return null;
  }
}