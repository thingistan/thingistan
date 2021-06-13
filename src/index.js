const app = new PIXI.Application({
	resizeTo: window,
});

import InputManager from './input.js';
import NetworkManager from './network.js';

const inputManager = new InputManager(app.view);
const networkManager = new NetworkManager('https://sig.amar.io');

inputManager.addEventListener('keypress', e => {
	console.log(e.detail);
});

document.body.appendChild(app.view);

const moveSpeed = 4;

app.loader.add('bunny', 'mars.png').load((loader, resources) => {
	// This creates a texture from a 'bunny.png' image
	const bunny = new PIXI.Sprite(resources.bunny.texture);

	// Setup the position of the bunny
	bunny.x = app.renderer.width / 2;
	bunny.y = app.renderer.height / 2;

	// Rotate around the center
	bunny.anchor.x = 0.5;
	bunny.anchor.y = 0.5;

	// Add the bunny to the scene we are building
	app.stage.addChild(bunny);

	// Listen for frame updates
	app.ticker.add(() => {
		bunny.prevX = bunny.x;
		bunny.prevY = bunny.y;
		if (inputManager.keyStates[InputManager.keyEnum.UP])
			bunny.y -= moveSpeed;
		if (inputManager.keyStates[InputManager.keyEnum.DOWN])
			bunny.y += moveSpeed;
		if (inputManager.keyStates[InputManager.keyEnum.LEFT])
			bunny.x -= moveSpeed;
		if (inputManager.keyStates[InputManager.keyEnum.RIGHT])
			bunny.x += moveSpeed;

		if (bunny.x !== bunny.prevX || bunny.y !== bunny.prevY) {
			networkManager.broadcast('state', {
				x: bunny.x,
				y: bunny.y,
			})
		}
	});
});
