export default class InputManager extends EventTarget {
	static keyEnum = {
		UP: 38,
		DOWN: 40,
		LEFT: 37,
		RIGHT: 39,
	};

	keyStates = [];

	constructor(canvas) {
		super();

		canvas.tabIndex = 1;
		canvas.addEventListener('keydown', event => {
			this.keyStates[event.keyCode] = true;
		});
		canvas.addEventListener('keyup', event => {
			this.keyStates[event.keyCode] = false;
		});
		canvas.addEventListener('keypress', event => {
			this.dispatchEvent(new CustomEvent('keypress', { detail: event.keyCode }));
		});
	}
}
