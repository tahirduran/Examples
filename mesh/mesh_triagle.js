function meshTriagle(v,t,m,text,tx,sade) {
    var w = 350;
    var h = 200;

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(10, w / h, 0.1, 1000);
    camera.position.z = 100;
    if(!sade)
        camera.position.y = 60;

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(w, h);
    renderer.setClearColor(0xffffff, 1);

    document.getElementById("CanvasVertex").appendChild(renderer.domElement);

    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    if(!sade)
        controls.autoRotate = true;

    var LINEB = gridGeometry();
    material = new THREE.LineBasicMaterial({color: "rgb(200,200,200)"});
    var lineb = new THREE.Line(LINEB, material);
    scene.add(lineb);


    if(m) {
        //var GEOM = new THREE.BoxGeometry( 1, 1, 1 );
        var GEOM = new THREE.Geometry();
        GEOM.vertices.push(
            new THREE.Vector3(-5, 0, 0),
            new THREE.Vector3(5, -5, 0),
            new THREE.Vector3(5, 5, 0)
        );
        GEOM.faces.push(new THREE.Face3(0, 1, 2));
        GEOM.computeFaceNormals();

        GEOM.faceVertexUvs[0].push([
            new THREE.Vector2(0 ,0.5),
            new THREE.Vector2(1 ,0),
            new THREE.Vector2(1 ,1)
        ]);

        //var material = new THREE.MeshNormalMaterial();
        var material = new THREE.MeshBasicMaterial({color: 0x2ba4d5});
        if(tx) {
            var texture = new THREE.TextureLoader().load("texture.jpg");
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(1, 1);
            material = new THREE.MeshBasicMaterial({map: texture, overdraw: 0.5});
        }
        var mesh = new THREE.Mesh(GEOM, material);
        scene.add(mesh);
    }

    if(t) {
        var LINE = new THREE.Geometry();
        LINE.vertices.push(
            new THREE.Vector3(-5, 0, 0),
            new THREE.Vector3(5, -5, 0),
            new THREE.Vector3(5, 5, 0),
            new THREE.Vector3(-5, 0, 0)
        );
        material = new THREE.LineBasicMaterial({color: 0x585858});
        var line = new THREE.Line(LINE, material);
        scene.add(line);
    }

    var DOT = new THREE.Geometry();
    DOT.vertices.push(
        new THREE.Vector3(-5, 0, 0),
        new THREE.Vector3(5, -5, 0),
        new THREE.Vector3(5, 5, 0)
    );
    if(v) {
        var dotMaterial = new THREE.PointsMaterial({size: 10, sizeAttenuation: false, color: 0x585858});
        var dot = new THREE.Points(DOT, dotMaterial);
        scene.add(dot);
    }

    function createVector(pg, camera, width, height) {
        var p = new THREE.Vector3(pg.x, pg.y, pg.z);
        var vector = p.project(camera);

        vector.x = (vector.x + 1) / 2 * width;
        vector.y = -(vector.y - 1) / 2 * height;

        return vector;
    }

    var render = function () {
        requestAnimationFrame(render);

        if(text) {
            var v = createVector(DOT.vertices[0], camera, 350, 200);
            document.getElementById("VertexV1").style.left = v.x;
            document.getElementById("VertexV1").style.top = v.y;
            v = createVector(DOT.vertices[1], camera, 350, 200);
            document.getElementById("VertexV2").style.left = v.x;
            document.getElementById("VertexV2").style.top = v.y;
            v = createVector(DOT.vertices[2], camera, 350, 200);
            document.getElementById("VertexV3").style.left = v.x;
            document.getElementById("VertexV3").style.top = v.y;
        }
        renderer.render(scene, camera);
        controls.update();
    };

    if(text) {
        document.getElementById("VertexV1").style.display = "inherit";
        document.getElementById("VertexV2").style.display = "inherit";
        document.getElementById("VertexV3").style.display = "inherit";
    }else{
        document.getElementById("VertexV1").style.display = "none";
        document.getElementById("VertexV2").style.display = "none";
        document.getElementById("VertexV3").style.display = "none";
    }

    if(sade) {
        document.getElementById("VertexV1").innerHTML = "(0,0.5)";
        document.getElementById("VertexV2").innerHTML = "(1,0)";
        document.getElementById("VertexV3").innerHTML = "(1,1)";
    }

    render();
}
if(urlGet('vertex') !== "true" &&
    urlGet('triagle') !== "true" &&
    urlGet('mesh') !== "true" &&
    urlGet('text') !== "true" &&
    urlGet('tx') !== "true")
{
    meshTriagle(true, true, true, true, true);
}else{
    meshTriagle(
        urlGet('vertex') === "true",
        urlGet('triagle') === "true",
        urlGet('mesh') === "true",
        urlGet('text') === "true",
        urlGet('tx') === "true",
        urlGet('sade') === "true");
}