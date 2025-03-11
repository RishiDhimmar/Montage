import * as THREE from 'three';

export function performRaycastFromMouse(
    event: MouseEvent,
    camera: THREE.Camera,
    objects: THREE.Object3D[]
): THREE.Intersection<THREE.Object3D>[] {
    // Get normalized device coordinates (-1 to +1) from mouse event
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Create a raycaster
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    // Perform raycasting

    const intersects = raycaster.intersectObjects(objects);

    console.log(intersects)

    return intersects; // Returns an array of intersected objects
}
