import * as THREE from "three";

const loadTexture = async (url: string): Promise<THREE.Texture | null> => {
  if (!url) return null;

  const localProxyUrl = `/s3proxy${new URL(url).pathname}`;
  
  return new Promise<THREE.Texture>((resolve, reject) => {
    new THREE.TextureLoader().load(
      localProxyUrl,
      (texture) => {
        console.log(`✅ Texture Loaded: ${url}`);
        
        // Set to ClampToEdgeWrapping to prevent repetition
        texture.wrapS = THREE.MirroredRepeatWrapping;
        texture.wrapT = THREE.MirroredRepeatWrapping;
                
        // Set texture offset to 0,0 to ensure it starts from the edge
        texture.offset.set(0, 0);
        
        // Set appropriate filtering for good quality
        texture.minFilter = THREE.LinearMipMapNearestFilter;
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

