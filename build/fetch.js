"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
// deprecated Get the price of the given symbol (CoinMarketCap)
function getSingleTicker(symbol) {
    return new Promise(function (resolve, reject) {
        axios_1.default.get("https://api.coinmarketcap.com/v1/ticker/" + symbol + "/")
            .then(function (response) {
            resolve(response.data[0]);
        })
            .catch(function (error) {
            reject(error);
        });
    });
}
exports.getSingleTicker = getSingleTicker;
// Get the price of a coin in other currencies
function convertPrice(from, to) {
    return new Promise(function (resolve, reject) {
        axios_1.default.get("https://min-api.cryptocompare.com/data/price?fsym=" + from + "&tsyms=" + to.join(','))
            .then(function (response) {
            resolve(response.data);
        })
            .catch(function (error) {
            reject(error);
        });
    });
}
exports.convertPrice = convertPrice;
