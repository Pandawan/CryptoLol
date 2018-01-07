"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var admin = require("firebase-admin");
var serviceAccount = process.env.FIRE_SERVICE_ACCOUNT;
function init() {
    // If not yet initialized
    if (admin.apps.length === 0) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: 'https://crypto-lol-bot.firebaseio.com/'
        });
    }
}
exports.init = init;
// Add a subscription to the given coin
function addSub(id, coin) {
    init();
    return new Promise(function (resolve, reject) {
        // Get a Database Object
        var db = admin.firestore();
        // Create a temporary object to store the future value
        var updateObj = {
            subs: {}
        };
        updateObj["subs"][coin] = true;
        // Tell database to update the object
        db.collection('users').doc(id).set(updateObj, { merge: true }).then(function () {
            resolve();
        }).catch(function (error) {
            reject(error);
        });
    });
}
exports.addSub = addSub;
