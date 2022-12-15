class Machine {
	flag: boolean;
	callbacks: any[];
	constructor() {
		this.flag = false;
		this.callbacks = [];
	}
	addCallback(callback: { (): void }) {
		this.callbacks.push(callback);
	}
	removeCallback(callback: { (): void }) {
		this.callbacks = this.callbacks.filter((cb) => cb != callback);
	}
	clearCallback() {
		this.callbacks = this.callbacks.filter((cb) => false);
	}
	run() {
		if (!this.flag) return;
		this.callbacks.forEach((cb) => cb());
		//refersh whole page
		requestAnimationFrame(this.run.bind(this));
	}
	start() {
		if (this.flag) return;
		this.flag = true;
		this.run();
	}
	stop() {
		this.flag = false;
	}
}

const machine = new Machine();

export default machine;
