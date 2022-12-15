import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

class FbxLoader {
	constructor(modelFileUrl, urlAnimationList, scale) {
		this.loader = new FBXLoader();
		this.animationPromises = [];
		let animations = [];

		const modelPromise = new Promise((res, rej) => {
			this.loader.load(modelFileUrl, function (object) {
				object.scale.set(scale, scale, scale);
				object.traverse(function (child) {
					if (child.isMesh) {
						child.castShadow = true;
						child.receiveShadow = true;
					}
				});
				object.castShadow = true;
				object.receiveShadow = true;
				res(object);
			});
		});

		urlAnimationList.forEach((element, index) => {
			this.animationPromises[index] = new Promise((res, rej) => {
				this.loader.load(urlAnimationList[index], function (object) {
					object.scale.set(scale, scale, scale);
					animations[index * 1] = object.animations[0];
					res(index);
				});
			});
		});

		const joinerPromise = Promise.all(this.animationPromises);

		this.model = new Promise((res, rej) => {
			Promise.all([modelPromise, joinerPromise]).then((data) => {
				const object = data[0];
				if (animations.length > 0) {
					object.animations = animations;
				}
				res(object);
			});
		});
	}

	getModel() {
		return this.model;
	}
}

export default FbxLoader;

// const model = new Promise((res, rej) => {
// 	const loader = new FBXLoader();
// 	loader.load(
// 		// "../models/fbx01.fbx",
// 		"../models/animations/X Bot.fbx",
// 		function (object) {
// 			// mixer = new THREE.AnimationMixer(object);

// 			// const action = mixer.clipAction(object.animations[0]);
// 			// action.play();

// 			object.traverse(function (child) {
// 				if (child.isMesh) {
// 					child.castShadow = true;
// 					child.receiveShadow = true;
// 				}
// 			});
// 			res(object);
// 		}
// 	);
// });

// const animation = new Promise((res, rej) => {
// 	const loader = new FBXLoader();
// 	loader.load("../models/animations/running.fbx", function (object) {
// 		// mixer = new THREE.AnimationMixer(object);

// 		// const action = mixer.clipAction(object.animations[0]);
// 		// action.play();

// 		object.traverse(function (child) {
// 			if (child.isMesh) {
// 				child.castShadow = true;
// 				child.receiveShadow = true;
// 			}
// 		});
// 		res(object);
// 	});
// });

// const combo = Promise.all([model, animation]);

// export default combo;
