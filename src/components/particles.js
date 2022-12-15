import * as THREE from "three";

class Particles {
	constructor() {
		this.obj = new THREE.Object3D();
		this.geo = new THREE.BufferGeometry();
		this.velocities = [];
		this.accelerations = [];
	}

	create = (count = 1, maxDistance = 600, minDistance = 300) => {
		const vertices = [];

		for (let i = 0; i < count; i++) {
			// let star = new THREE.Vector3(
			// 	Math.random() * maxDistance - minDistance,
			// 	Math.random() * maxDistance - minDistance,
			// 	Math.random() * maxDistance - minDistance
			// );
			// star.velocity = 0;
			// star.acceleration = 0.02;
			// vertices.push(star);
			const x = Math.random() * maxDistance - minDistance;
			const y = Math.random() * 2 * maxDistance - minDistance;
			const z = Math.random() * maxDistance - minDistance;

			vertices.push(x, y, z);
			this.velocities.push(0);
			this.accelerations.push(0.02);
		}
		this.geo.setAttribute(
			"position",
			new THREE.Float32BufferAttribute(vertices, 3)
		);

		let texture = new THREE.TextureLoader().load(
			"./../../../finarkein/assets/disk.png"
		);
		let starMaterial = new THREE.PointsMaterial({
			// color: 0xaaaaaa,
			size: 35,
			sizeAttenuation: true,
			map: texture,
			alphaTest: 0.5,
			transparent: true,
		});
		const stars = new THREE.Points(this.geo, starMaterial);
		this.obj.add(stars);
		return this.obj;
	};

	animate = () => {
		const positionAttribute = this.geo.getAttribute("position");
		for (let i = 0; i < positionAttribute.count; i++) {
			let y = positionAttribute.getY(i);

			let vel = this.velocities[i];
			let accel = this.accelerations[i];
			// vel *= accel;
			this.velocities[i] += accel;
			y -= vel;
			if (y < -200) {
				y = 1500;
				this.velocities[i] = 0;
			}

			positionAttribute.setY(i, y);
		}

		positionAttribute.needsUpdate = true;
		// this.geo.attributes.position.forEach((p) => {
		// 	p.velocity += p.acceleration;
		// 	p.y -= p.velocity;
		// 	if (p.y < -200) {
		// 		p.y = 200;
		// 		p.velocity = 0;
		// 	}
		// });
		// this.geo.verticesNeedUpdate = true;
		// this.stars.rotation.y += 0.002;
	};

	get = () => {
		console.log(this);
		return this.obj;
	};
}

export default Particles;
