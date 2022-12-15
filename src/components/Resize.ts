import Camera from "./Camera";

class Resize {
	renderer: any;
	constructor() {
		this.renderer = null;
	}

	start(renderer: any) {
		this.renderer = renderer;
		window.addEventListener("resize", this.resize.bind(this));
	}
	stop() {
		window.removeEventListener("resize", this.resize.bind(this));
	}

	resize() {
		Camera.aspect = window.innerWidth / window.innerHeight;
		Camera.updateProjectionMatrix();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}
}

const resize = new Resize();

export default resize;
