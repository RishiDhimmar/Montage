// import { Edges } from "@react-three/drei";
// import React, { useMemo, useState, useEffect, useRef } from "react";
// import * as THREE from "three";
// import { observer } from "mobx-react-lite";
// import modelStore from "../../stores/ModelStore";
// import { processNodes } from "../../helpers/ProcessNodes";
// import { computeGlobalCorners } from "../../helpers/ComputeGlobalCorners";
// import BoundingBoxLine from "../../helpers/BoundingBoxLine";
// import BoundingBoxSpheres from "../../helpers/BoundingBoxSpheres";

// // Define materials globally to avoid recreation
// const materials = {
//   white: new THREE.MeshBasicMaterial({ color: "white" }),
//   gray: new THREE.MeshBasicMaterial({ color: "#f3f3f0" }),
//   cyan: new THREE.MeshBasicMaterial({ color: "cyan" }),
//   none: new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }),
// };

// const EdgeModel = observer(({ id, nodes, position }) => {
//   // Process nodes using helper
//   const processedNodes = useMemo(() => processNodes(nodes, materials), [nodes]);

//   const handleClick = (e: Event) => {
//     e.stopPropagation();
//     console.log(id);
//     modelStore.selectModel(id);
//   };

//   // Simple hover state management without timeout
//   const [hovered, setHovered] = useState(false);

//   const handlePointerOver = () => setHovered(true);
//   const handlePointerOut = () => setHovered(false);

//   // Compute corners using helper
//   const corners = useMemo(() => computeGlobalCorners(processedNodes), [processedNodes]);

//   // Resource cleanup
//   const processedNodesRef = React.useRef(processedNodes);
//   useEffect(() => {
//     // Clean up previous processedNodes
//     if (processedNodesRef.current) {
//       Object.values(processedNodesRef.current).forEach(({ geometry }) => {
//         geometry.dispose();
//       });
//     }
//     processedNodesRef.current = processedNodes;
//     return () => {
//       // Clean up current processedNodes on unmount
//       Object.values(processedNodes).forEach(({ geometry }) => {
//         geometry.dispose();
//       });
//     };
//   }, [processedNodes]);

//   return (
//     <group
//       position={position}
//       onClick={handleClick}
//       onPointerOver={handlePointerOver}
//       onPointerOut={handlePointerOut}
//     >
//       {Object.keys(processedNodes).map((key) => {
//         const { geometry, material, name } = processedNodes[key];
//         return (
//           <>
//             {material != null ? (
//               <mesh key={key + "-" + id} geometry={geometry} material={material}>
//                 <Edges
//                   color={name.includes("Wall") ? "black" : "gray"}
//                   lineWidth={2}
//                   threshold={1}
//                 />
//               </mesh>
//             ) : (
//               <mesh key={key + "-" + id} geometry={geometry}>
//                 <Edges
//                   color={name.includes("Wall") ? "black" : "gray"}
//                   lineWidth={2}
//                   threshold={1}
//                 />
//               </mesh>
//             )}
//           </>
//         );
//       })}
//       {(modelStore.selectedModelId == id || hovered) && <BoundingBoxLine corners={corners} />}
//       {modelStore.selectedModelId == id && <BoundingBoxSpheres corners={corners} />}
//     </group>
//   );
// });

// export default EdgeModel;

import { Edges } from "@react-three/drei";
import React, { useMemo, useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { observer } from "mobx-react-lite";
import { useThree } from "@react-three/fiber";
import modelStore from "../../stores/ModelStore";
import { processNodes } from "../../helpers/ProcessNodes";
import { computeGlobalCorners } from "../../helpers/ComputeGlobalCorners";
import BoundingBoxLine from "../../helpers/BoundingBoxLine";
import BoundingBoxSpheres from "../../helpers/BoundingBoxSpheres";

// Define materials globally to avoid recreation
const materials = {
  white: new THREE.MeshBasicMaterial({ color: "white" }),
  gray: new THREE.MeshBasicMaterial({ color: "#f3f3f0" }),
  cyan: new THREE.MeshBasicMaterial({ color: "cyan" }),
  none: new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }),
};

const EdgeModel = observer(({ id, nodes, position }) => {
  const { camera, gl } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  // Process nodes using helper
  const processedNodes = useMemo(() => processNodes(nodes, materials), [nodes]);

  const handleClick = (e: Event) => {
    e.stopPropagation();
    console.log(id);
    modelStore.selectModel(id);
  };

  // Simple hover state management
  const [hovered, setHovered] = useState(false);
  const handlePointerOver = () => setHovered(true);
  const handlePointerOut = () => setHovered(false);

  // Compute corners using helper
  const corners = useMemo(() => computeGlobalCorners(processedNodes), [processedNodes]);

  // Cleanup processedNodes on unmount/update
  const processedNodesRef = useRef(processedNodes);
  useEffect(() => {
    if (processedNodesRef.current) {
      Object.values(processedNodesRef.current).forEach(({ geometry }) => {
        geometry.dispose();
      });
    }
    processedNodesRef.current = processedNodes;
    return () => {
      Object.values(processedNodes).forEach(({ geometry }) => {
        geometry.dispose();
      });
    };
  }, [processedNodes]);

  // ----- DRAG AND DROP HANDLING -----
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef(new THREE.Vector3());
  
  // A horizontal plane (y constant) used to compute intersections
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), []);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    if (groupRef.current) {
      // Set the plane constant to the model's current height.
      plane.constant = -groupRef.current.position.y;
      const mouse = new THREE.Vector2();
      const canvasBounds = gl.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - canvasBounds.left) / canvasBounds.width) * 2 - 1;
      mouse.y = -((e.clientY - canvasBounds.top) / canvasBounds.height) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersection = new THREE.Vector3();
      if (raycaster.ray.intersectPlane(plane, intersection)) {
        // Save offset between intersection point and current model position.
        dragOffset.current.copy(intersection).sub(groupRef.current.position);
      }
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !groupRef.current) return;

    const mouse = new THREE.Vector2();
    const canvasBounds = gl.domElement.getBoundingClientRect();
    mouse.x = ((e.clientX - canvasBounds.left) / canvasBounds.width) * 2 - 1;
    mouse.y = -((e.clientY - canvasBounds.top) / canvasBounds.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    const intersection = new THREE.Vector3();
    if (raycaster.ray.intersectPlane(plane, intersection)) {
      // Update position taking into account the offset.
      groupRef.current.position.copy(intersection.sub(dragOffset.current));
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    // Once the model has been moved and stabilized, update its position in the store.
    if (groupRef.current) {
      const newPosition: [number, number, number] = [
        groupRef.current.position.x,
        groupRef.current.position.y,
        groupRef.current.position.z,
      ];
      modelStore.updateModelPosition(id, newPosition);
    }
  };

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {Object.keys(processedNodes).map((key) => {
        const { geometry, material, name } = processedNodes[key];
        return (
          <mesh
            key={key + "-" + id}
            geometry={geometry}
            material={material || undefined}
          >
            <Edges
              color={name.includes("Wall") ? "black" : "gray"}
              lineWidth={2}
              threshold={1}
            />
          </mesh>
        );
      })}
      {(modelStore.selectedModelId === id || hovered) && <BoundingBoxLine corners={corners} />}
      {modelStore.selectedModelId === id && <BoundingBoxSpheres corners={corners} />}
    </group>
  );
});

export default EdgeModel;


