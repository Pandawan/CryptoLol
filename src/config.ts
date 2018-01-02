import * as configstore from 'configstore';
const pkg = require('../package.json');

const conf = new configstore(pkg.name, {});


export function setBinance(key: string, secret: string) {
	conf.set('binance.key', key);
	conf.set('binance.secret', secret);
};

export function getBinanceKey() {
	return conf.get('binance.key');
}

export function getBinanceSecret() {
	return conf.get('binance.secret');
}

export function reset() {
	conf.clear();
}