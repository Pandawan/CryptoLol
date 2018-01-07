import * as admin from 'firebase-admin';
const serviceAccount = require('../config/serviceAccountKey.json');

export function init() {
	// If not yet initialized
	if (admin.apps.length === 0) {
		admin.initializeApp({
			credential: admin.credential.cert(serviceAccount),
			databaseURL: 'https://crypto-lol-bot.firebaseio.com/'
		});
	}
}