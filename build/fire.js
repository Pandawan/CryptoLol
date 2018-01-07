"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var admin = require("firebase-admin");
var serviceAccount = process.env.FIRE_SERVICE_ACCOUNT;
function init() {
    // If not yet initialized
    if (admin.apps.length === 0) {
        admin.initializeApp({
            credential: admin.credential.cert(JSON.parse(serviceAccount)),
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
// Remove a subscription to the given coin
function removeSub(id, coin) {
    init();
    return new Promise(function (resolve, reject) {
        // Get a Database Object
        var db = admin.firestore();
        // Create a temporary object to store the future value
        var updateObj = {
            subs: {}
        };
        updateObj["subs"][coin] = false;
        // Tell database to update the object
        db.collection('users').doc(id).set(updateObj, { merge: true }).then(function () {
            resolve();
        }).catch(function (error) {
            reject(error);
        });
    });
}
exports.removeSub = removeSub;
// Get the list of subscriptions
function getSubs(id) {
    init();
    return new Promise(function (resolve, reject) {
        // Get a Database Object
        var db = admin.firestore();
        // Tell database to update the object
        db.collection('users').doc(id).get().then(function (doc) {
            if (doc.exists) {
                var subs = doc.data().subs;
                var subsArr = [];
                for (var _i = 0, _a = Object.entries(subs); _i < _a.length; _i++) {
                    var _b = _a[_i], key = _b[0], value = _b[1];
                    if (value) {
                        subsArr.push(key);
                    }
                }
                resolve(subsArr);
            }
            else {
                reject(new Error("User does not exist!"));
            }
        }).catch(function (error) {
            reject(error);
        });
    });
}
exports.getSubs = getSubs;
