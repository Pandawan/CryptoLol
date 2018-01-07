import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
const serviceAccount = process.env.FIRE_SERVICE_ACCOUNT as string | ServiceAccount;

export function init() {
	// If not yet initialized
	if (admin.apps.length === 0) {
		admin.initializeApp({
			credential: admin.credential.cert(serviceAccount),
			databaseURL: 'https://crypto-lol-bot.firebaseio.com/'
		});
	}
}