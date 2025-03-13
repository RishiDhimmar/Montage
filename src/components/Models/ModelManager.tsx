import { observer } from "mobx-react-lite";
import modelStore from "../../stores/ModelStore";
import ModelViewer from "./ModelViewer";

const ModelManager = observer(({ground}) => {
  return (
    <>
      {modelStore.models.map((model) => (
        <ModelViewer
          key={model.id}
          id={model.id}
          modelPath={model.modelPath}
          position={model.position}
          is3D={model.is3D}
        />
      ))}
    </>
  );
});

export default ModelManager;
