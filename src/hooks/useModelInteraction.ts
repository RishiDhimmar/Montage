import { useRef } from "react";
import * as THREE from "three";
import modelStore from "../stores/ModelStore";
import { performRaycastFromMouse } from "../utils/PerformRaycastingFromMouse";

function getClosestSnapCandidate(projectedNodes, snapshotNodes) {
  let bestCandidate = null, bestDist = Infinity;
  projectedNodes.forEach((proj, i) => {
    snapshotNodes.forEach((snap) => {
      if (proj.axis !== snap.alignment) return;
      const dist = proj.position.distanceTo(snap.position);
      if (dist >= 0.1 && dist <= 1 && dist < bestDist) {
        bestDist = dist;
        bestCandidate = { nodeIndex: i, snapPosition: snap.position, axis: proj.axis };
      }
    });
  });
  return bestCandidate;
}

export function useModelInteraction({ id, camera, gl }) {
  const dragState = useRef({
    offset: null,
    initialPosition: null,
    initialNodePositions: null,
    isDragging: false,
    snapNodes: [],
  });

  const handlePointerDown = (e) => {
    e.stopPropagation();
    e.target.setPointerCapture(e.pointerId);
    dragState.current.isDragging = true;
    modelStore.selectModel(id);
    const hit = performRaycastFromMouse(e.nativeEvent, camera, gl);
    if (!hit) return;
    const model = modelStore.getModel(id);
    if (!model?.nodePositions) return;
    dragState.current.initialPosition = new THREE.Vector3(...model.position);
    dragState.current.initialNodePositions = model.nodePositions.map((node) =>
      node.farthestNormalPoint.clone()
    );
    dragState.current.offset = dragState.current.initialPosition.clone().sub(hit);
    dragState.current.snapNodes = modelStore.models
      .filter((m) => m?.id !== id)
      .flatMap((m) =>
        m.nodePositions.map((node) => ({
          position: node.farthestNormalPoint,
          alignment: node.axis,
        }))
      );
  };

  const handlePointerMove = (e) => {
    if (!dragState.current.isDragging || !dragState.current.offset) return;
    const hit = performRaycastFromMouse(e.nativeEvent, camera, gl);
    if (!hit) return;
    const newPos = hit.clone().add(dragState.current.offset);
    const model = modelStore.getModel(id);
    if (!model) return;
    const delta = newPos.clone().sub(dragState.current.initialPosition);
    const updatedNodes = model.nodePositions.map((node, i) =>
      node.id === id
        ? { ...node, farthestNormalPoint: dragState.current.initialNodePositions[i].clone().add(delta) }
        : node
    );
    modelStore.setNodePositions(model.id, updatedNodes);
    const projectedNodes = updatedNodes.map((node) => ({
      position: node.farthestNormalPoint.clone(),
      axis: node.axis,
    }));
    const candidate = getClosestSnapCandidate(projectedNodes, dragState.current.snapNodes);
    if (candidate) {
      const targetPos = candidate.snapPosition
        .clone()
        .sub(dragState.current.initialNodePositions[candidate.nodeIndex])
        .add(dragState.current.initialPosition);
      const snappedDelta = targetPos.clone().sub(dragState.current.initialPosition);
      const snappedNodes = model.nodePositions.map((node, i) =>
        node.id === id
          ? { ...node, farthestNormalPoint: dragState.current.initialNodePositions[i].clone().add(snappedDelta) }
          : node
      );
      modelStore.setNodePositions(model.id, snappedNodes);
      modelStore.setPosition(id, targetPos.toArray());
      return;
    }
    modelStore.setPosition(id, newPos.toArray());
  };

  const handlePointerUp = () => {
    dragState.current = { offset: null, initialPosition: null, initialNodePositions: null, isDragging: false, snapNodes: [] };
  };

  return { handlePointerDown, handlePointerMove, handlePointerUp };
}
