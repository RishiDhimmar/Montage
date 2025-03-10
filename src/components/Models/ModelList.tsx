import React from "react";
import { ModelRenderer } from "./ModelRenderer";
import { ModelProps } from "../../hooks/useModels";

interface ModelListProps {
  models: ModelProps[];
}

export const ModelList: React.FC<ModelListProps> = ({ models }) => {
  return (
    <>
      {models.map((model, index) => (
        <ModelRenderer key={index} {...model} />
      ))}
    </>
  );
};
