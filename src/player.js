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
		//this.alien.tint = Math.random() * 0xFFFFFF;
		this.sprite.anchor.x = 0.5;
		this.sprite.anchor.y = 0.5;
		game.viewport.addChild(this.sprite);
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

export class PlayerOwn extends Player {
	

}
