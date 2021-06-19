import InputManager from './input.js';
import NetworkManager from './network.js';
import EntityManager from './entity.js';
import { Player } from './player.js';

const game = {};

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

game.pixi = new PIXI.Application({
	resizeTo: window,
	antialias: true,
	backgroundColor: 0x222222,
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
	.decelerate()
	.moveCenter(0, 0);

game.inputManager   = new InputManager(game);
game.networkManager = new NetworkManager('https://sig.amar.io');
game.entityManager  = new EntityManager(game);

const bg = new PIXI.TilingSprite(
	PIXI.Texture.from('assets/img/bg.png'),
	window.innerWidth * 10,
	window.innerHeight * 10,
);

bg.position.x = - window.innerWidth  * 5;
bg.position.y = - window.innerHeight * 5;

game.viewport.addChild(bg);

game.entityManager.add(new Player(game));

game.inputManager.addEventListener('keypress', e => {
	console.log(e.detail);
});

document.body.appendChild(game.pixi.view);

game.pixi.ticker.add(() => game.entityManager.tick());
