import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import box from "./components/Box";
import camera from "./components/Camera";
import Light from "./components/Light";
import machine from "./components/Machine";
import renderer from "./components/Renderer";
import resize from "./components/Resize";
import scene from "./components/Scene";
import SphereController from "./components/spheres";
import WireframeController from "./components/polygon";

// camera and light
scene.add(camera);
scene.add(Light);

resize.start(renderer);

// ========================= controller ===============================
// SphereController();
WireframeController(true);

// ==============================================================================

scene.add(new THREE.AxesHelper(100));

renderer.render(scene, camera);

machine.addCallback(() => {
	renderer.render(scene, camera);
	camera.lookAt(scene.position);
});

machine.start();

// mouse controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 10;
controls.maxDistance = 1000;
controls.enablePan = false;
