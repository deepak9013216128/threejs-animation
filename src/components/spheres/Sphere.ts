import * as THREE from "three";

class Sphere {
	geometry: THREE.SphereGeometry;
	material: THREE.MeshPhongMaterial;
	sphere: THREE.Mesh<THREE.SphereGeometry, THREE.MeshPhongMaterial>;
	obj: THREE.Object3D<THREE.Event>;
	constructor(radius = 5, width = 64, height = 32) {
		this.geometry = new THREE.SphereGeometry(radius, width, height);

		// const texture = new THREE.TextureLoader().load("/assets/disk3.png");
		// texture.wrapS = THREE.RepeatWrapping;
		// texture.wrapT = THREE.RepeatWrapping;

		this.material = new THREE.MeshPhongMaterial({
			color: 0xd6d6d6, //0xfafafa,
			// specular: 0x333333,
			// map: texture,
			emissive: 0x000000,
			// envMapIntensity: 1,
			opacity: 0.4,
			shininess: 40,
			transparent: true,
			// wireframe: true,
		});

		this.sphere = new THREE.Mesh(this.geometry, this.material);

		this.obj = new THREE.Object3D();

		this.obj.add(this.sphere);
	}

	changeOpacity = (opacity: number) => {
		this.material.opacity = opacity;
	};
}

export default Sphere;
