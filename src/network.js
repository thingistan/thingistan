import PeerNetwork from 'https://cdn.jsdelivr.net/gh/yousefamar/p2p-peer/dist/p2p-peer.es.js';

export default class NetworkManager extends PeerNetwork {

	constructor(sigServ) {
		super();

		this.connect(sigServ);

		this.on('connection', peer => {
			console.log('Peer', peer.uid, 'connected');

			peer.on('state', msg => console.log('Peer', peer.uid + ':', msg));

			peer.on('disconnect', () => console.log('Peer', peer.uid, 'disconnected'));
		});

		this.on('uid', uid => {
			this.join('thingistan.global');
		});
	}
}
