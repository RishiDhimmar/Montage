// import * as THREE from 'three';

// export function performRaycastFromMouse(
//     event: MouseEvent,
//     camera: THREE.Camera,
//     objects: THREE.Object3D[]
// ): THREE.Intersection<THREE.Object3D>[] {
//     // Get normalized device coordinates (-1 to +1) from mouse event
//     const mouse = new THREE.Vector2();
//     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

//     // Create a raycaster
//     const raycaster = new THREE.Raycaster();
//     raycaster.setFromCamera(mouse, camera);

//     // Perform raycasting

//     const intersects = raycaster.intersectObjects(objects);

//     console.log(intersects)

//     return intersects; // Returns an array of intersected objects
// }
import * as THREE from 'three';

export function performRaycastFromMouse(
    event: MouseEvent,
    camera: THREE.Camera,
    objects: THREE.Object3D[],
    gl: THREE.WebGLRenderer
): THREE.Intersection<THREE.Object3D>[] {
    // Get the size of the WebGL canvas
    const canvasBounds = gl.domElement.getBoundingClientRect();

    // Convert mouse coordinates to normalized device coordinates (-1 to +1)
    const mouse = new THREE.Vector2();
    mouse.x = ((event.clientX - canvasBounds.left) / canvasBounds.width) * 2 - 1;
    mouse.y = -((event.clientY - canvasBounds.top) / canvasBounds.height) * 2 + 1;

    // Create a raycaster
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    // Perform raycasting
    const intersects = raycaster.intersectObjects(objects, true);

    console.log(intersects);

    return intersects; // Returns an array of intersected objects
}
