import { Entity } from './entity.js';
import InputManager from './input.js';

export class Player extends Entity {
	static moveSpeed = 4;

	constructor(game) {
		super(game);

		this.sprite = PIXI.Sprite.from('assets/img/player.png');
		this.sprite.x = this.x;
		this.sprite.y = this.y;
		this.roundPixels = true;
		//this.sprite.tint = Math.random() * 0xFFFFFF;
		this.sprite.anchor.x = 0.5;
		this.sprite.anchor.y = 0.5;
		game.viewport.addChild(this.sprite);
	}
}

export class PlayerOther extends Player {
	peer = null;

	constructor(game, id, x, y, peer) {
		super(game, id, x, y);

		this.peer = peer;

		peer.on('state', ({ x, y }) => {
			this.x = x;
			this.y = y;
			this.sprite.x = x;
			this.sprite.y = y;
		});
	}
}

export class PlayerOwn extends Player {
	constructor(game) {
		super(game);

		game.viewport.follow(this.sprite, {
			speed: 5,
			acceleration: null,
			radius: 250,
		});
	}

	tick() {
		super.tick();

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

		this.sprite.x = this.x;
		this.sprite.y = this.y;

		if (this.x !== this.prevX || this.y !== this.prevY) {
			this.game.networkManager.broadcast('state', {
				x: this.x,
				y: this.y,
			})
		}
	}
}
