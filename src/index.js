import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import box from "./components/Box";
import camera from "./components/Camera";
import Light from "./components/Light";
import machine from "./components/Machine";
import renderer from "./components/Renderer";
import resize from "./components/Resize";
import scene from "./components/Scene";
import Animator from "./components/Animator";
import sphere from "./components/Sphere";
import wireframe from "./components/WireFrame";
import SphereController from "./components/spheres";
import WireframeController from "./components/polygon";

// camera and light
scene.add(camera);
scene.add(Light);

resize.start(renderer);

// ========================= controller ===============================
SphereController();
WireframeController();

// ==============================================================================

scene.add(new THREE.AxesHelper(100));

renderer.render(scene, camera);

machine.addCallback(() => {
	renderer.render(scene, camera);
	camera.lookAt(scene.position);
});

machine.start();

// controls
const controls = new OrbitControls(camera, renderer.domElement);
// controls.addEventListener("change", render);
controls.minDistance = 10;
controls.maxDistance = 1000;
controls.enablePan = false;

//  ========================== sphere =================================
// let step = 10;
// for (let i = 0; i < step; i++) {
// 	const layer = i % 5;
// 	const radiusX = 40;
// 	const radiusY = 20;
// 	const radiusZ = 20;
// 	const center = 70;

// 	const s = sphere.create();
// 	const posX = center + radiusX * Math.cos(2 * Math.PI * (i / step));
// 	const posY = center + radiusY * Math.sin(2 * Math.PI * (i / step));
// 	const posZ = center + radiusZ * Math.cos(2 * Math.PI * (i / step));
// 	s.mesh.position.x = Math.random() > 0.5 ? -posX : posY;
// 	s.mesh.position.y = Math.random() > 0.5 ? -posY : posY;
// 	s.mesh.position.z = Math.random() > 0.5 ? -posZ : posZ;

// 	s.mesh.layers.set(layer);
// 	scene.add(s.obj);
// }

// ==============================================================================
