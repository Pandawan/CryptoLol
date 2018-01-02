"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var binance = require("node-binance-api");
var config = require("./config");
var chalk_1 = require("chalk");
var setup = false;
function checkSetup() {
    if (!setup) {
        binance.options({
            'APIKEY': config.getBinanceKey(),
            'APISECRET': config.getBinanceSecret()
        });
        setup = true;
    }
}
// Get the price of the given symbol
function getPrice(symbol) {
    return new Promise(function (resolve, reject) {
        checkSetup();
        try {
            binance.prices(function (ticker) {
                var price = ticker[symbol];
                if (!price) {
                    reject('No price found for ' + symbol);
                }
                resolve(price);
            });
        }
        catch (e) {
            reject(e);
        }
    });
}
exports.getPrice = getPrice;
// Get the candlestick updates for the given symbol every period
function candlestickUpdates(symbol, period) {
    checkSetup();
    try {
        // Periods: 1m,3m,5m,15m,30m,1h,2h,4h,6h,8h,12h,1d,3d,1w,1M
        binance.websockets.candlesticks([symbol], period, function (candlesticks) {
            var eventType = candlesticks.e, eventTime = candlesticks.E, symbol = candlesticks.s, ticks = candlesticks.k;
            var open = ticks.o, high = ticks.h, low = ticks.l, close = ticks.c, volume = ticks.v, trades = ticks.n, interval = ticks.i, isFinal = ticks.x, quoteVolume = ticks.q, buyVolume = ticks.V, quoteBuyVolume = ticks.Q;
            var d = new Date();
            console.log("\n" + chalk_1.default.green(symbol + " " + interval + " candlestick update on " + d.toLocaleDateString() + " at " + d.toLocaleTimeString()));
            console.log("open: " + open);
            console.log("high: " + high);
            console.log("low: " + low);
            console.log("close: " + close);
            console.log("volume: " + volume);
            console.log("isFinal: " + isFinal);
        });
    }
    catch (e) {
        console.log(chalk_1.default.red(e));
    }
}
exports.candlestickUpdates = candlestickUpdates;
