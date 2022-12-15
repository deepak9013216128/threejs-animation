import * as THREE from "three";
import { LightProbeGenerator } from "three/examples/jsm/lights/LightProbeGenerator.js";

const light = new THREE.AmbientLight(0xf0f0f0); // soft white light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.14);

var L1 = new THREE.PointLight(0xffffff, 0);
L1.position.x = 500;
L1.position.y = 200;
L1.position.z = -600;

var L2 = new THREE.PointLight(0xffffff, 0.2);
L2.position.x = -100;
L2.position.y = 10;
L2.position.z = 300;

light.add(L1);
light.add(L2);

light.add(directionalLight);

directionalLight.position.set(-100, 10, 300);

export default light;
export { directionalLight, L1, L2 };
