import InputManager from './input.js';
import NetworkManager from './network.js';
import PlayerManager from './player.js';

const game = {};

game.pixi = new PIXI.Application({
	resizeTo: window,
	antialias: true,
});

// create viewport
const viewport = game.viewport = new pixi_viewport.Viewport({
	screenWidth: window.innerWidth,
	screenHeight: window.innerHeight,
	worldWidth: 1000,
	worldHeight: 1000,
	interaction: game.pixi.renderer.plugins.interaction,
});

game.pixi.stage.addChild(viewport);

viewport
	.drag()
	.pinch()
	.wheel()
	.decelerate();

game.inputManager = new InputManager(game);
game.networkManager = new NetworkManager('https://sig.amar.io');
game.playerManager = new PlayerManager(game);

game.inputManager.addEventListener('keypress', e => {
	console.log(e.detail);
});

document.body.appendChild(game.pixi.view);

game.pixi.ticker.add(() => game.playerManager.tick());
