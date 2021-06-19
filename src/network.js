import PeerNetwork from 'https://cdn.jsdelivr.net/gh/yousefamar/p2p-peer/dist/p2p-peer.es.js';

export default class NetworkManager extends PeerNetwork {

	constructor(sigServ) {
		super();

		this.connect(sigServ);

		this.on('uid', uid => {
			this.join('thingistan.global');
		});
	}
}
