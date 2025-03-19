import { useRef } from "react";
import * as THREE from "three";
import modelStore from "../stores/ModelStore";
import { performRaycastFromMouse } from "../utils/PerformRaycastingFromMouse";

export function useModelInteraction({ id, camera, gl }) {
  const dragState = useRef({
    offset: null,
    initialModelPos: null,
    localNodePositions: null,
    isDragging: false,
    allNodesSnapshot: [] as Array<{ 
      modelid: number; 
      position: THREE.Vector3;
      alignment?: "x" | "y" | "z";
    }>,
    currentDragNode: null as THREE.Vector3 | null,
  });

  const handlePointerDown = (e) => {
    e.stopPropagation();
    const target = e.target;
    target.setPointerCapture(e.pointerId);
    dragState.current.isDragging = true;
    modelStore.selectModel(id);
    const hit = performRaycastFromMouse(e.nativeEvent, camera, gl);
    if (!hit) return;
    const model = modelStore.getModel(id);
    if (!model) return;
    dragState.current.initialModelPos = new THREE.Vector3(...model.position);
    dragState.current.localNodePositions = (model.nodePositions || []).map(v => v.clone());
    dragState.current.offset = new THREE.Vector3().subVectors(
      new THREE.Vector3(...model.position),
      hit
    );
    dragState.current.allNodesSnapshot = modelStore.models
      .filter(m => m && m.id !== id)
      .flatMap(m => {
        const otherModelCenter = new THREE.Vector3(...m.position);
        return (m.nodePositions || []).map(pos => ({
          modelid: m.id,
          position: pos.clone(),
        }));
      });
  };

  const handlePointerMove = (e) => {
    if (!dragState.current.isDragging) return;
    const hit = performRaycastFromMouse(e.nativeEvent, camera, gl);
    if (!hit || !dragState.current.offset) return;
    const newModelPos = hit.clone().add(dragState.current.offset);
    const currentModel = modelStore.getModel(id);
    if (!currentModel || !currentModel.nodePositions) return;
    const otherNodes = dragState.current.allNodesSnapshot;
    const delta = new THREE.Vector3().subVectors(newModelPos, dragState.current.initialModelPos);
    const projectedNodePositions = dragState.current.localNodePositions.map(localPos =>
      localPos.clone().add(delta)
    );
    const projectedNodesWithAlignment = projectedNodePositions.map((pos, index) => {
      const localPos = pos.clone().sub(newModelPos);
      return { position: pos, index };
    });
    const nodeDistances = projectedNodesWithAlignment.flatMap(projectedNode =>
      otherNodes.map(otherNode => ({
        fromModel: id,
        toModel: otherNode.modelid,
        distance: projectedNode.position.distanceTo(otherNode.position),
        currentNodeIndex: projectedNode.index,
        projectedPosition: projectedNode.position.clone(),
        otherPosition: otherNode.position.clone(),
        projectedAlignment: projectedNode.alignment,
        otherAlignment: otherNode.alignment
      }))
    );
    nodeDistances.sort((a, b) => a.distance - b.distance);
    const closestMatch = nodeDistances.find(d => {
      if (d.distance > 1 || d.distance < 0.1) return false;
      const sameAlignment = d.projectedAlignment === d.otherAlignment;
      const bothVertical = d.projectedAlignment === "y" && d.otherAlignment === "y";
      const bothHorizontal = d.projectedAlignment !== "y" && d.otherAlignment !== "y";
      return sameAlignment || bothVertical || bothHorizontal;
    });
    if (closestMatch) {
      const currentLocal = dragState.current.localNodePositions[closestMatch.currentNodeIndex];
      const otherModel = modelStore.getModel(closestMatch.toModel);
      if (!otherModel) return;
      const isVertical = closestMatch.projectedAlignment === "y";
      const offsetDirection = new THREE.Vector3();
      if (isVertical) {
        if (closestMatch.otherAlignment === "x") {
          offsetDirection.set(0, 0, 1);
        } else {
          offsetDirection.set(1, 0, 0);
        }
      } else {
        offsetDirection.set(0, 1, 0);
      }
      const NODE_SIZE = 0.5;
      const offsetAmount = NODE_SIZE * 1.2;
      const nodeVector = currentLocal.clone().sub(dragState.current.initialModelPos);
      let desiredModelPosition = closestMatch.otherPosition.clone().sub(nodeVector);
      desiredModelPosition.y = 0
      desiredModelPosition = desiredModelPosition.add(offsetDirection.multiplyScalar(offsetAmount));
      modelStore.setPosition(id, desiredModelPosition.toArray());
      const newNodePositions = dragState.current.localNodePositions.map(localPos => {
        const relativePos = localPos.clone().sub(dragState.current.initialModelPos);
        return relativePos.add(desiredModelPosition);
      });
      modelStore.setNodePositions(id, newNodePositions);
      return;
    }
    modelStore.updateModelPosition(id, newModelPos.toArray());
    modelStore.setNodePositions(id, projectedNodePositions);
  };

  const handlePointerUp = (e) => {
    e.target.releasePointerCapture(e.pointerId);
    dragState.current = {
      offset: null,
      initialModelPos: null,
      localNodePositions: null,
      isDragging: false,
      allNodesSnapshot: [],
      currentDragNode: null,
    };
  };

  return { handlePointerDown, handlePointerMove, handlePointerUp };
}
