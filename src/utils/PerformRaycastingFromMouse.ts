import * as THREE from 'three';

export function performRaycastFromMouse(
    event: MouseEvent,
    camera: THREE.Camera,
    gl: THREE.WebGLRenderer
): THREE.Vector3 | null {
    // Get the size of the WebGL canvas
    const canvasBounds = gl.domElement.getBoundingClientRect();

    // Convert mouse coordinates to normalized device coordinates (-1 to +1)
    const mouse = new THREE.Vector2();
    mouse.x = ((event.clientX - canvasBounds.left) / canvasBounds.width) * 2 - 1;
    mouse.y = -((event.clientY - canvasBounds.top) / canvasBounds.height) * 2 + 1;

    // Create a raycaster
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    // Define the XZ plane at y = 0
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const intersectionPoint = new THREE.Vector3();

    if (raycaster.ray.intersectPlane(plane, intersectionPoint)) {
        return intersectionPoint; // Returns the intersection point on the XZ plane
    }
    
    return null; // No intersection found
}
