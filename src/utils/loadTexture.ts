import * as THREE from "three";

const loadTexture = async (url: string | undefined): Promise<THREE.Texture | null> => {
  if (!url) return null;

  const localProxyUrl = `/s3proxy${new URL(url).pathname}`;
  
  return new Promise<THREE.Texture>((resolve) => {
    new THREE.TextureLoader().load(
      localProxyUrl,
      (texture) => {

        texture.wrapS = THREE.MirroredRepeatWrapping
        texture.wrapT = THREE.MirroredRepeatWrapping

        
        resolve(texture);
      },
      undefined,
      (error) => {
        console.error(` Texture Load Failed: ${url}`, error);
        // resolve(null);
      }
    );
  });
};

export default loadTexture;

