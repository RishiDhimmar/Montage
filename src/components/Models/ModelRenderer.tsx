import { Edges, useGLTF } from "@react-three/drei";

export const ModelRenderer: React.FC<ModelProps> = ({ modelPath, position }) => {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} position={position} />
};