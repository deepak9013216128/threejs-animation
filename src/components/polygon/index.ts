import * as THREE from "three";

import scene from "../Scene";
import machine from "../Machine";
import camera from "../Camera";
import { directionalLight, L1, L2 } from "../Light";

import wireframe from "./WireFrame";

// ============================ wireframe =======================================
export default function WireframeController(specular = false) {
	const lightPosition = {
		x: -100,
		y: 10,
		z: 300,
	};
	const w = wireframe.create(specular);
	scene.add(w.obj);

	L1.intensity = 0.2;
	L2.intensity = 0.2;

	// w.obj.position.set(-50, 0, 0);

	// w.obj.rotateY(1.2);
	// w.obj.rotateY(4);

	const rotation1 = () => {
		w.mesh.rotateY(0.01);
		w.innerWireframe.rotateY(0.01);
		lightPosition.x += 4;
		lightPosition.y -= 3;
		directionalLight.position.set(
			lightPosition.x,
			lightPosition.y,
			lightPosition.z
		);
		// console.log(lightPosition);
	};
	const rotation2 = () => {
		w.mesh.rotateY(0.01);
		w.innerWireframe.rotateY(0.01);
		w.mesh.rotateX(0.01);
		w.innerWireframe.rotateX(0.01);
		// lightPosition.x += 4;
		lightPosition.y += 5;
		directionalLight.position.set(
			lightPosition.x,
			lightPosition.y,
			lightPosition.z
		);
	};
	const rotation3 = () => {
		w.mesh.rotateY(-0.01);
		w.innerWireframe.rotateY(-0.01);
		w.mesh.rotateX(0.01);
		w.innerWireframe.rotateX(0.01);
		lightPosition.x -= 4;
		// lightPosition.y += 5;
		directionalLight.position.set(
			lightPosition.x,
			lightPosition.y,
			lightPosition.z
		);
	};
	const rotation4 = () => {
		w.mesh.rotateY(-0.01);
		w.innerWireframe.rotateY(-0.01);
		lightPosition.x -= 1;
		lightPosition.y -= 5;
		directionalLight.position.set(
			lightPosition.x,
			lightPosition.y,
			lightPosition.z
		);
	};
	const rotation5 = () => {
		w.mesh.rotateY(-0.01);
		w.innerWireframe.rotateY(-0.01);
		w.mesh.rotateX(-0.01);
		w.innerWireframe.rotateX(-0.01);
		lightPosition.x -= 1;
		lightPosition.y += 3;
		directionalLight.position.set(
			lightPosition.x,
			lightPosition.y,
			lightPosition.z
		);
	};
	const rotation6 = () => {
		w.mesh.rotateY(0.01);
		w.innerWireframe.rotateY(0.01);
		w.mesh.rotateX(-0.01);
		w.innerWireframe.rotateX(-0.01);
	};

	// let key = 1;

	setTimeout(() => {
		machine.addCallback(rotation1);
	}, 3000);
	setTimeout(() => {
		machine.removeCallback(rotation1);
	}, 6000);
	setTimeout(() => {
		machine.addCallback(rotation2);
	}, 9000);
	setTimeout(() => {
		machine.removeCallback(rotation2);
	}, 12000);
	setTimeout(() => {
		machine.addCallback(rotation3);
	}, 15000);
	setTimeout(() => {
		machine.removeCallback(rotation3);
	}, 18000);
	setTimeout(() => {
		machine.addCallback(rotation4);
	}, 21000);
	setTimeout(() => {
		machine.removeCallback(rotation4);
	}, 24000);
	setTimeout(() => {
		machine.addCallback(rotation5);
	}, 27000);
	setTimeout(() => {
		machine.removeCallback(rotation5);
	}, 30000);
	setTimeout(() => {
		machine.addCallback(rotation6);
	}, 33000);
	setTimeout(() => {
		machine.removeCallback(rotation6);
	}, 36000);
	// setTimeout(()=>{},3000)
	// setTimeout(()=>{},3000)
	// setTimeout(()=>{},3000)
	// setTimeout(()=>{},3000)
	// setTimeout(()=>{},3000)
	// setTimeout(()=>{},3000)
	// setTimeout(()=>{},3000)
	// setTimeout(()=>{},3000)
	// setTimeout(()=>{},3000)
	// setTimeout(()=>{},3000)
	// setTimeout(()=>{},3000)
	// setTimeout(()=>{},3000)

	// setTimeout(() => {
	// 	machine.removeCallback(rotation1);
	// 	machine.addCallback(rotation2);
	// }, 5000);
	// setTimeout(() => {
	// 	machine.removeCallback(rotation2);
	// 	machine.addCallback(rotation3);
	// }, 10000);
	// setTimeout(() => {
	// 	machine.removeCallback(rotation3);
	// 	machine.addCallback(rotation4);
	// }, 15000);
	// setTimeout(() => {
	// 	machine.removeCallback(rotation4);
	// 	machine.addCallback(rotation5);
	// }, 20000);
	// setTimeout(() => {
	// 	machine.removeCallback(rotation5);
	// 	machine.addCallback(rotation6);
	// }, 25000);
}
