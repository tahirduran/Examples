function meshTriagle() {
    var w = 350;
    var h = 200;

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(10, w / h, 0.1, 1000);
    camera.position.z = 100;
    camera.position.y = 60;

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(w, h);
    renderer.setClearColor(0xffffff, 1);

    document.getElementById("CanvasVertex").appendChild(renderer.domElement);

    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = true;

    var LINEB = gridGeometry();
    material = new THREE.LineBasicMaterial({color: "rgb(200,200,200)"});
    var lineb = new THREE.Line(LINEB, material);
    scene.add(lineb);


    var GEOM = new THREE.BoxGeometry( 10, 10, 10 );

    var texture = new THREE.TextureLoader().load("texture.jpg");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);
    material = new THREE.MeshBasicMaterial({map: texture, overdraw: 0.5});

    var mesh = new THREE.Mesh(GEOM, material);
    scene.add(mesh);

    var render = function () {
        requestAnimationFrame(render);

        renderer.render(scene, camera);
        controls.update();
    };

    render();
}
meshTriagle();
