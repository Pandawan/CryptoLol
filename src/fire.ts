import * as admin from 'firebase-admin';
import {
	ServiceAccount
} from 'firebase-admin';
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

// Add a subscription to the given coin
export function addSub(id: string, coin: string) {
	init();
	return new Promise((resolve, reject) => {
		// Get a Database Object
		let db = admin.firestore();

		// Create a temporary object to store the future value
		let updateObj: any = {
			subs: {}
		};
		updateObj["subs"][coin] = true;

		// Tell database to update the object
		db.collection('users').doc(id).set(updateObj, { merge: true }).then(() => {
			resolve();
		}).catch((error) => {
			reject(error);
		});
	});
}