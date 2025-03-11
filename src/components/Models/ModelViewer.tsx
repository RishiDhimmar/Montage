import { useGLTF } from '@react-three/drei';
import React from 'react'
import EdgeModel from './EdgeModel';

interface ModelRendererProps {
    modelPath: string;
    position: [number, number, number];
    onLoad?: () => void;
    is3D : boolean
  }
export const ModelViewer: React.FC<ModelRendererProps> = ({  is3D ,modelPath, position, onLoad }) => {
  const { nodes, scene } = useGLTF(modelPath);

  React.useEffect(() => {
    if (onLoad) onLoad();
  }, [onLoad]);

  return is3D ? <primitive object={scene} position={position} /> : <EdgeModel nodes={nodes} position={position} />;
};


export default ModelViewer