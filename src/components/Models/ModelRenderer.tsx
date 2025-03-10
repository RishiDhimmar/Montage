import { useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";

interface ModelProps {
  modelPath: string;
  position: [number, number, number];
  onLoad?: () => void; // Callback function when model loads
}

export const ModelRenderer: React.FC<ModelProps> = ({ modelPath, position, onLoad }) => {
  const { scene } = useGLTF(modelPath);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (scene && !loaded) {
      setLoaded(true);
      if (onLoad) onLoad(); // Call the callback function
    }
  }, [scene, loaded, onLoad]);

  return <primitive object={scene} position={position} />;
};
