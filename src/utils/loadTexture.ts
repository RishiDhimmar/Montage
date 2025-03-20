import * as THREE from "three";

const loadTexture = async (url: string): Promise<THREE.Texture | null> => {
    if (!url) return null;
  
    const localProxyUrl = `/s3proxy${new URL(url).pathname}`;
  
    return new Promise<THREE.Texture>((resolve, reject) => {
      new THREE.TextureLoader().load(
        localProxyUrl,
        (texture) => {
          console.log(`Texture Loaded: ${url}`);
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
          resolve(texture);
        },
        undefined,
        (error) => {
          console.error(` Texture Load Failed: ${url}`, error);
          resolve(null);
        }
      );
    });
  };
  


  const localProxyUrl = `/s3proxy${new URL(url).pathname}`;

  return new Promise<THREE.Texture>((resolve, reject) => {
    new THREE.TextureLoader().load(
      localProxyUrl,
      (texture) => {
        console.log(`✅ Texture Loaded: ${url}`);
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);
        texture.minFilter = THREE.LinearMipMapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
        resolve(texture);
      },
      undefined,
      (error) => {
        console.error(`❌ Texture Load Failed: ${url}`, error);
        resolve(null);
      }
    );
  });
};

export default loadTexture;
