
function gridGeometry() {
    var GEO = new THREE.Geometry();
    GEO.vertices.push(
        new THREE.Vector3(-10, 0, -10),
        new THREE.Vector3(10, 0, -10),
        new THREE.Vector3(10, 0, 10),
        new THREE.Vector3(-10, 0, 10),
        new THREE.Vector3(-10, 0, -10),
        new THREE.Vector3(-8, 0, -10),
        new THREE.Vector3(-8, 0, 10),
        new THREE.Vector3(-6, 0, 10),
        new THREE.Vector3(-6, 0, -10),
        new THREE.Vector3(-4, 0, -10),
        new THREE.Vector3(-4, 0, 10),
        new THREE.Vector3(-2, 0, 10),
        new THREE.Vector3(-2, 0, -10),
        new THREE.Vector3(-0, 0, -10),
        new THREE.Vector3(-0, 0, 10),
        new THREE.Vector3(2, 0, 10),
        new THREE.Vector3(2, 0, -10),
        new THREE.Vector3(4, 0, -10),
        new THREE.Vector3(4, 0, 10),
        new THREE.Vector3(6, 0, 10),
        new THREE.Vector3(6, 0, -10),
        new THREE.Vector3(8, 0, -10),
        new THREE.Vector3(8, 0, 10),
        new THREE.Vector3(10, 0, 10),
        new THREE.Vector3(10, 0, 8),
        new THREE.Vector3(-10, 0, 8),
        new THREE.Vector3(-10, 0, 6),
        new THREE.Vector3(10, 0, 6),
        new THREE.Vector3(10, 0, 4),
        new THREE.Vector3(-10, 0, 4),
        new THREE.Vector3(-10, 0, 2),
        new THREE.Vector3(10, 0, 2),
        new THREE.Vector3(10, 0, 0),
        new THREE.Vector3(-10, 0, 0),
        new THREE.Vector3(-10, 0, -2),
        new THREE.Vector3(10, 0, -2),
        new THREE.Vector3(10, 0, -4),
        new THREE.Vector3(-10, 0, -4),
        new THREE.Vector3(-10, 0, -6),
        new THREE.Vector3(10, 0, -6),
        new THREE.Vector3(10, 0, -8),
        new THREE.Vector3(-10, 0, -8)
    );
    return GEO;
}