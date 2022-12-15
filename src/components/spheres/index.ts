import SphereParticles from "./SphereParticles";
import machine from "../Machine";
import scene from "../Scene";
import camera from "../Camera";
import { directionalLight, L1 } from "../Light";

// =========================== Sphere particles =======================
export default function SphereController() {
	// directionalLight.position.set(-250, 200, 600);

	let sphereCount = 30;
	let maxDistance = 400;
	let minDistance = 100;

	const coordinate = [];

	// genrateCoordinate(coordinate, maxDistance, minDistance);
	for (let i = 0; i < sphereCount; i++) {
		const layer = i % 5;

		const s = SphereParticles.create();
		const { x, y } = getCoordinate(maxDistance, minDistance);
		const z = -800 + i * 30; //Math.random() * maxDistance - 2 * minDistance;

		s.mesh.position.x = i % 2 ? x : -x;
		s.mesh.position.y = y;
		s.mesh.position.z = z; //i % 2 ? z : -z;

		s.mesh.layers.set(layer);
		scene.add(s.obj);
	}
	machine.addCallback(() => {
		SphereParticles.animate();
	});
}

function getCoordinate(maxDistance: number, minDistance: number) {
	const x = Math.random() * maxDistance - minDistance;
	const y = Math.random() * maxDistance - minDistance;
	return { x, y };
}

function genrateCoordinate(
	coordinate: { x: number; y: number }[],
	maxDistance: number,
	minDistance: number
): any {
	if (coordinate.length >= 20) return;

	const { x, y } = getCoordinate(maxDistance, minDistance);
	// const z = -300 + i * 80;

	if (coordinate.length > 0) {
		let flag = 1;
		for (let i = 0; i < coordinate.length; i++) {
			console.log(coordinate[i]);
			let p = coordinate[i].x - x;
			let q = (coordinate[i].y = y);
			// let r = coordinate[i].z - z;
			if (Math.sqrt(p * p + q * q) < 50) {
				flag = 0;
				return genrateCoordinate(coordinate, maxDistance, minDistance);
			}
		}
		if (flag) coordinate.push({ x, y });
	} else {
		coordinate.push({ x, y });
	}
	return genrateCoordinate(coordinate, maxDistance, minDistance);
}
