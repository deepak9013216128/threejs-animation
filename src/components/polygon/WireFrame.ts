import * as THREE from "three";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { Wireframe } from "three/examples/jsm/lines/Wireframe.js";
import { WireframeGeometry2 } from "three/examples/jsm/lines/WireframeGeometry2.js";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";

const color = new THREE.Color(0xb8bdcc);

class WireFrame {
	wireframes: any[];
	localPlane: THREE.Plane;
	constructor() {
		this.wireframes = [];
		this.localPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
	}

	createWireframe = (
		radius: number,
		detail: number,
		color: any,
		scale = 1,
		clipping = false
	) => {
		let geo = new THREE.IcosahedronGeometry(radius, detail);
		const geometry = new WireframeGeometry2(geo);

		let material: { [k: string]: any } = {
			// color: 0x4080ff,
			color: color,
			linewidth: 0.4, // in pixels
			//resolution:  // to be set by renderer, eventually
			dashed: false,
			opacity: 1,
		};
		if (clipping) {
			material.opacity = 1;
			material.linewidth = 1;
			// ***** Clipping setup (material): *****
			material.clipShadows = false;
			material.clippingPlanes = [this.localPlane];
		}

		const matLine = new LineMaterial(material);
		matLine.resolution.set(window.innerWidth, window.innerHeight);
		const wireframe = new Wireframe(geometry, matLine);
		wireframe.computeLineDistances();
		wireframe.scale.set(scale, scale, scale);
		return { geo, wireframe };
	};

	createPointsOnVertics = (
		geo: THREE.IcosahedronGeometry | THREE.BufferGeometry,
		scale: number
	) => {
		// ============ POINTS ====================
		geo.deleteAttribute("normal");
		geo.deleteAttribute("uv");
		geo = BufferGeometryUtils.mergeVertices(geo);
		const vertices = [];
		const positionAttribute = geo.getAttribute("position");

		for (let i = 0; i < positionAttribute.count; i++) {
			const vertex = new THREE.Vector3();
			vertex.fromBufferAttribute(positionAttribute, i);
			vertices.push(vertex);
		}
		const loader = new THREE.TextureLoader();
		const texture = loader.load("/assets/disk.png");
		const pointsMaterial = new THREE.PointsMaterial({
			color: 0xfcfcfd,
			map: texture,
			size: 3,
			alphaTest: 0.5, // ***** Clipping setup (material): *****
			clippingPlanes: [this.localPlane],
			clipShadows: false,
		});

		const pointsGeometry = new THREE.BufferGeometry().setFromPoints(vertices);
		const points = new THREE.Points(pointsGeometry, pointsMaterial);
		points.scale.set(scale, scale, scale);

		return points;
	};

	getGeometery = (radius: number, detail: number, color: any, scale = 1) => {
		const innerWireframe = this.createWireframe(radius, detail, color, scale);
		let outerWireframe = this.createWireframe(
			radius,
			detail,
			color,
			scale * 1.2,
			true
		);
		const points = this.createPointsOnVertics(outerWireframe.geo, scale * 1.2);

		return {
			geometry: innerWireframe.geo,
			innerWireframe,
			outerWireframe,
			points: points,
		};
	};

	updateFaceColorOfGeo = (
		geo: THREE.IcosahedronGeometry | THREE.BufferGeometry
	) => {
		geo.deleteAttribute("normal");
		geo.deleteAttribute("uv");
		geo = BufferGeometryUtils.mergeVertices(geo);
		const positionAttribute = geo.getAttribute("position");

		const color = new THREE.Color();

		geo.setAttribute(
			"color",
			new THREE.BufferAttribute(
				new Float32Array(positionAttribute.count * 3),
				3
			)
		);
		const colors1 = geo.attributes.color;
		let c = new THREE.Vector3();
		const colorsHex = [
			"#9FA4FF",
			"#E3E5FF",
			"#C4C7FD",
			"#8A90F3",
			// "#9AA0F1",
			// "#CDD0FF",
			// "#ACAFFE",
			// "#8E94F4",
			// "#CCCCFD",
			// "#A4A8FB",
			// "#7B82F0",
			// "#8B90FB",
			// "#E3E5FF",
			// "#7C81F1",
			// "#7D82EA",
			// "#8589F1",
			// "#A2A6FF",
			// "#AEB2FF",
			// "#9FA4FF",
			// "#C4C7FD",
			// "#8A90FF",
			// "#444CE7",
			// "rgba(68,76,231,0.15)",
			// "#d2d4f9",
			// "#d2d4f9",
			// "#d2d4f9",
			// "#d2d4f9",
			// "#d2d4f9",
			// "#d2d4f9",
			// "#d2d4f9",
			// "#d2d4f9",
			// "#d2d4f9",
			"#d2d4f9",
			"#d2d4f9",
			"#d2d4f9",
		];

		for (let i = 0; i < positionAttribute.count / 3; i++) {
			color.setHex(Math.random() * 0xffffff);
			const c = new THREE.Color(colorsHex[i % colorsHex.length]);
			colors1.setXYZ(i * 3 + 0, c.r, c.g, c.b);
			colors1.setXYZ(i * 3 + 1, c.r, c.g, c.b);
			colors1.setXYZ(i * 3 + 2, c.r, c.g, c.b);
			// colors.push(c.r, c.g, c.b, c.r, c.g, c.b, c.r, c.g, c.b);
		}
		// geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

		return geo;
	};

	create(specular = false) {
		const obj = new THREE.Object3D();
		// INNER GEOMETRY
		const geo = this.getGeometery(20, 2, color.getHex(), 1);
		const updatedGeo = this.updateFaceColorOfGeo(geo.geometry);
		const material = new THREE.MeshPhongMaterial({
			color: 0x8b90fb,
			// color: 0xcdd0ff,
			// emissive: 0xc4c7fd,
			specular: specular ? 0xa7cfff : null,
			shininess: 30,
			flatShading: true,
			// shading: THREE.FlatShading,
			transparent: true,
			opacity: 1,
			// vertexColors: true,
		});
		let mesh = new THREE.Mesh(updatedGeo, material);
		// mesh.scale.set(2, 2, 2);
		// console.log(geo);

		// INNER POLYGON
		obj.add(mesh);

		// inner WIRE FRAME
		obj.add(geo.innerWireframe.wireframe);

		// outer WIRE FRAME
		obj.add(geo.outerWireframe.wireframe);

		// BALLS ON VERTICES
		obj.add(geo.points);

		return {
			mesh: mesh,
			obj,
			points: geo.points,
			outerWireframe: geo.outerWireframe.wireframe,
			innerWireframe: geo.innerWireframe.wireframe,
		};
	}

	get(i: number) {
		if (i >= 0 && i < this.wireframes.length) {
			return this.wireframes[i];
		}
		return null;
	}
}

const wireframe = new WireFrame();

export default wireframe;
