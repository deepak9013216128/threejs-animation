import * as THREE from "three";

import Sphere from "./Sphere";

class SphereParticles {
	spheres: any[];
	velocities: any[];
	accelerations: any[];
	constructor() {
		this.spheres = [];
		this.velocities = [];
		this.accelerations = [];
	}

	create() {
		const s = new Sphere(12);

		this.spheres.push({
			mesh: s.sphere,
			obj: s.obj,
			changeOpacity: s.changeOpacity,
		});
		this.velocities.push(0);
		this.accelerations.push(0.0005);

		return { mesh: s.sphere, obj: s.obj };
	}
	get(i: number) {
		if (i >= 0 && i < this.spheres.length) {
			return this.spheres[i];
		}
		return null;
	}

	changeOpacity = (s: {
		mesh: { position: { z: any } };
		changeOpacity: (arg0: number) => void;
	}) => {
		let zPos = s.mesh.position.z;
		if (zPos > 0) {
			zPos += 800;
		} else {
			zPos = 800 + zPos;
		}
		let opacity = Number(zPos) / 700;
		if (opacity > 1) opacity = 1;
		s.changeOpacity(opacity);
	};

	animate = () => {
		for (let i = 0; i < this.spheres.length; i++) {
			const s = this.spheres[i];
			let z = s.mesh.position.z;

			let vel = this.velocities[i];
			let accel = this.accelerations[i];
			// vel *= accel;
			this.velocities[i] += accel;
			z += vel;
			if (z > 200) {
				z = -800;
				this.velocities[i] = 0;
			}
			s.mesh.position.z = z;

			this.changeOpacity(s);
		}
	};
}

const sphereParticles = new SphereParticles();

export default sphereParticles;
