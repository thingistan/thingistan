import InputManager from './input.js';
import NetworkManager from './network.js';
import PlayerManager from './player.js';

const game = {};

game.pixi = new PIXI.Application({
	resizeTo: window,
	antialias: true,
});

game.inputManager = new InputManager(game);
game.networkManager = new NetworkManager('https://sig.amar.io');
game.playerManager = new PlayerManager(game);

game.inputManager.addEventListener('keypress', e => {
	console.log(e.detail);
});

document.body.appendChild(game.pixi.view);

game.pixi.ticker.add(() => game.playerManager.tick());
