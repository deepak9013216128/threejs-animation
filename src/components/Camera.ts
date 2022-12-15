import * as THREE from "three";

const camera = new THREE.PerspectiveCamera(
	30,
	window.innerWidth / window.innerHeight,
	0.1,
	2000
);
camera.layers.enable(0); // enabled by default
camera.layers.enable(1);
camera.layers.enable(2);
camera.layers.enable(3);
camera.layers.enable(4);
camera.layers.enable(5);
camera.layers.enable(6);

camera.position.set(0, 0, 160);
camera.lookAt(0, 0, 0);

export default camera;
