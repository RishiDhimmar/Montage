// import { useRef } from "react";
// import * as THREE from "three";
// import modelStore from "../stores/ModelStore";
// import { performRaycastFromMouse } from "../utils/PerformRaycastingFromMouse";

// function getClosestSnapCandidate(projectedNodes, snapshotNodes) {
//   let bestCandidate = null, bestDist = Infinity;
//   projectedNodes.forEach((proj, i) => {
//     snapshotNodes.forEach((snap) => {
//       if (proj.axis !== snap.alignment) return;
//       const dist = proj.position.distanceTo(snap.position);
//       if (dist >= 0.1 && dist <= 1 && dist < bestDist) {
//         bestDist = dist;
//         bestCandidate = { nodeIndex: i, snapPosition: snap.position, axis: proj.axis };
//       }
//     });
//   });
//   return bestCandidate;
// }

// export function useModelInteraction({ id, camera, gl }) {
//   const dragState = useRef({
//     offset: null,
//     initialPosition: null,
//     initialNodePositions: null,
//     isDragging: false,
//     snapNodes: [],
//   });

//   const handlePointerDown = (e) => {
//     e.stopPropagation();
//     e.target.setPointerCapture(e.pointerId);
//     dragState.current.isDragging = true;
//     modelStore.selectModel(id);
//     const hit = performRaycastFromMouse(e.nativeEvent, camera, gl);
//     if (!hit) return;
//     const model = modelStore.getModel(id);
//     if (!model?.nodePositions) return;
//     dragState.current.initialPosition = new THREE.Vector3(...model.position);
//     dragState.current.initialNodePositions = model.nodePositions.map((node) =>
//       node.farthestNormalPoint.clone()
//     );
//     dragState.current.offset = dragState.current.initialPosition.clone().sub(hit);
//     dragState.current.snapNodes = modelStore.models
//       .filter((m) => m?.id !== id)
//       .flatMap((m) =>
//         m.nodePositions.map((node) => ({
//           position: node.farthestNormalPoint,
//           alignment: node.axis,
//         }))
//       );
//   };

//   const handlePointerMove = (e) => {
//     if (!dragState.current.isDragging || !dragState.current.offset) return;
//     const hit = performRaycastFromMouse(e.nativeEvent, camera, gl);
//     if (!hit) return;
//     const newPos = hit.clone().add(dragState.current.offset);
//     const model = modelStore.getModel(id);
//     if (!model) return;
//     const delta = newPos.clone().sub(dragState.current.initialPosition);
//     const updatedNodes = model.nodePositions.map((node, i) =>
//       node.id === id
//         ? { ...node, farthestNormalPoint: dragState.current.initialNodePositions[i].clone().add(delta) }
//         : node
//     );
//     modelStore.setNodePositions(model.id, updatedNodes);
//     const projectedNodes = updatedNodes.map((node) => ({
//       position: node.farthestNormalPoint.clone(),
//       axis: node.axis,
//     }));
//     const candidate = getClosestSnapCandidate(projectedNodes, dragState.current.snapNodes);
//     if (candidate) {
//       const targetPos = candidate.snapPosition
//         .clone()
//         .sub(dragState.current.initialNodePositions[candidate.nodeIndex])
//         .add(dragState.current.initialPosition);
//       const snappedDelta = targetPos.clone().sub(dragState.current.initialPosition);
//       const snappedNodes = model.nodePositions.map((node, i) =>
//         node.id === id
//           ? { ...node, farthestNormalPoint: dragState.current.initialNodePositions[i].clone().add(snappedDelta) }
//           : node
//       );
//       modelStore.setNodePositions(model.id, snappedNodes);
//       modelStore.setPosition(id, targetPos.toArray());
//       return;
//     }
//     modelStore.setPosition(id, newPos.toArray());
//   };

//   const handlePointerUp = () => {
//     dragState.current = { offset: null, initialPosition: null, initialNodePositions: null, isDragging: false, snapNodes: [] };
//   };

//   return { handlePointerDown, handlePointerMove, handlePointerUp };
// }
import { useRef } from "react";
import * as THREE from "three";
import modelStore from "../stores/ModelStore";
import { performRaycastFromMouse } from "../utils/PerformRaycastingFromMouse";

// Define types for node-related data:
export interface NodeData {
  id: number;
  startPoint: THREE.Vector3;
  endPoint: THREE.Vector3;
  axis: string;
  farthestNormalPoint: THREE.Vector3;
  normal: THREE.Vector3;
}

interface SnapNode {
  position: THREE.Vector3;
  alignment: string;
}

interface ProjectedNode {
  position: THREE.Vector3;
  axis: string;
}

// Type the candidate returned by getClosestSnapCandidate:
interface SnapCandidate {
  nodeIndex: number;
  snapPosition: THREE.Vector3;
  axis: string;
}

// Add explicit types for the two arrays:
function getClosestSnapCandidate(
  projectedNodes: ProjectedNode[],
  snapshotNodes: SnapNode[]
): SnapCandidate | null {
  let bestCandidate: SnapCandidate | null = null;
  let bestDist = Infinity;
  projectedNodes.forEach((proj: ProjectedNode, i: number) => {
    snapshotNodes.forEach((snap: SnapNode) => {
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

// Define the type for the hook's argument.
interface UseModelInteractionArgs {
  id: number;
  camera: THREE.Camera;
  gl: THREE.WebGLRenderer;
}

// Define the type for our drag state.
interface DragState {
  offset: THREE.Vector3 | null;
  initialPosition: THREE.Vector3 | null;
  initialNodePositions: NodeData[] | null;
  isDragging: boolean;
  snapNodes: SnapNode[];
}

export function useModelInteraction({ id, camera, gl }: UseModelInteractionArgs) {
  const dragState = useRef<DragState>({
    offset: null,
    initialPosition: null,
    initialNodePositions: null,
    isDragging: false,
    snapNodes: [],
  });

  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragState.current.isDragging = true;
    modelStore.selectModel(id);
    const hit: THREE.Vector3 | null = performRaycastFromMouse(e.nativeEvent, camera, gl);
    if (!hit) return;
    const model = modelStore.getModel(id);
    if (!model?.nodePositions) return;
    // Initialize state using the model's current position and nodePositions.
    dragState.current.initialPosition = new THREE.Vector3(...model.position);
    dragState.current.initialNodePositions = model.nodePositions.map((node: NodeData) => ({
      ...node,
      farthestNormalPoint: node.farthestNormalPoint.clone(),
    }));
    dragState.current.offset = dragState.current.initialPosition.clone().sub(hit);
    dragState.current.snapNodes = modelStore.models
      .filter((m) => m.id !== id)
      .flatMap((m) =>
        m.nodePositions.map((node: NodeData) => ({
          position: node.farthestNormalPoint.clone(),
          alignment: node.axis,
        }))
      );
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragState.current.isDragging || !dragState.current.offset || !dragState.current.initialPosition) return;
    const hit: THREE.Vector3 | null = performRaycastFromMouse(e.nativeEvent, camera, gl);
    if (!hit) return;
    const newPos = hit.clone().add(dragState.current.offset);
    const model = modelStore.getModel(id);
    if (!model) return;
    const delta = newPos.clone().sub(dragState.current.initialPosition);
    // Update node positions by adding the delta to the initial farthestNormalPoint.
    const updatedNodes: NodeData[] = model.nodePositions.map((node, i) =>
      node.id === id
        ? {
            ...node,
            farthestNormalPoint: dragState.current.initialNodePositions![i].farthestNormalPoint
              .clone()
              .add(delta),
          }
        : node
    );
    modelStore.setNodePositions(model.id, updatedNodes);
    const projectedNodes: ProjectedNode[] = updatedNodes.map((node) => ({
      position: node.farthestNormalPoint.clone(),
      axis: node.axis,
    }));
    const candidate = getClosestSnapCandidate(projectedNodes, dragState.current.snapNodes);
    if (candidate) {
      const targetPos = candidate.snapPosition
        .clone()
        .sub(dragState.current.initialNodePositions![candidate.nodeIndex].farthestNormalPoint)
        .add(dragState.current.initialPosition);
      const snappedDelta = targetPos.clone().sub(dragState.current.initialPosition);
      const snappedNodes: NodeData[] = model.nodePositions.map((node, i) =>
        node.id === id
          ? {
              ...node,
              farthestNormalPoint: dragState.current.initialNodePositions![i].farthestNormalPoint
                .clone()
                .add(snappedDelta),
            }
          : node
      );
      modelStore.setNodePositions(model.id, snappedNodes);
      modelStore.setPosition(id, targetPos.toArray() as [number, number, number]);
      return;
    }
    modelStore.setPosition(id, newPos.toArray() as [number, number, number]);
  };

  const handlePointerUp = () => {
    dragState.current = {
      offset: null,
      initialPosition: null,
      initialNodePositions: null,
      isDragging: false,
      snapNodes: [],
    };
  };

  return { handlePointerDown, handlePointerMove, handlePointerUp };
}
