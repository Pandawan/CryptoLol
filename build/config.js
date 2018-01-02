"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var configstore = require("configstore");
var pkg = require('../package.json');
var conf = new configstore(pkg.name, {});
function setBinance(key, secret) {
    conf.set('binance.key', key);
    conf.set('binance.secret', secret);
}
exports.setBinance = setBinance;
;
function getBinanceKey() {
    return conf.get('binance.key');
}
exports.getBinanceKey = getBinanceKey;
function getBinanceSecret() {
    return conf.get('binance.secret');
}
exports.getBinanceSecret = getBinanceSecret;
function reset() {
    conf.clear();
}
exports.reset = reset;
