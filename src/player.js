import InputManager from './input.js';

class Player {
	static moveSpeed = 4;

	x = 0;
	y = 0;
	sprite = null;

	game = null;

	constructor(game) {
		const { pixi } = this.game = game;
		this.x = pixi.renderer.width  / 2;
		this.y = pixi.renderer.height / 2;

		pixi.loader.add('bunny', 'mars.png').load((loader, resources) => {
			this.sprite = new PIXI.Sprite(resources.bunny.texture);
			this.sprite.x = this.x;
			this.sprite.y = this.y;
			this.sprite.anchor.x = 0.5;
			this.sprite.anchor.y = 0.5;
			pixi.stage.addChild(this.sprite);
		});
	}

	tick() {
		this.prevX = this.x;
		this.prevY = this.y;
		if (this.game.inputManager.keyStates[InputManager.keyEnum.UP])
			this.y -= Player.moveSpeed;
		if (this.game.inputManager.keyStates[InputManager.keyEnum.DOWN])
			this.y += Player.moveSpeed;
		if (this.game.inputManager.keyStates[InputManager.keyEnum.LEFT])
			this.x -= Player.moveSpeed;
		if (this.game.inputManager.keyStates[InputManager.keyEnum.RIGHT])
			this.x += Player.moveSpeed;

		if (this.sprite) {
			this.sprite.x = this.x;
			this.sprite.y = this.y;
		}

		if (this.x !== this.prevX || this.y !== this.prevY) {
			this.game.networkManager.broadcast('state', {
				x: this.x,
				y: this.y,
			})
		}
	}
}

class PlayerOwn extends Player {
	

}


export default class PlayerManager extends EventTarget {

	players = [];

	constructor(game) {
		super();

		this.players.push(new Player(game));
	}

	tick(...args) {
		for (const p of this.players) {
			p.tick(...args);
		}
	}
}
