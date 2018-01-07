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