import { uuidv4 } from './utils.js';

export class Entity {
	game = null;
	id = null;
	x = 0;
	y = 0;
	sprite = null;

	constructor(game, id, x = 0, y = 0) {
		const { pixi } = this.game = game;

		this.game = game;
		this.id = id || uuidv4();
		this.x = x;
		this.y = y;
	}

	tick() {
	}
}

export default class EntityManager {
	game = null;
	entities = [];

	constructor(game) {
		this.game = game;
	}

	add(entity) {
		this.entities.push(entity);
	}

	remove(entity) {
		console.log(entity);
		const index = this.entities.indexOf(entity);
		if (index < 0)
			return;
		this.entities.splice(index, 1);
		if (entity.sprite)
			this.game.viewport.removeChild(entity.sprite);
	}

	tick(...args) {
		for (const e of this.entities) {
			e.tick(...args);
		}
	}
}
