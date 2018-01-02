import * as binance from 'node-binance-api';
import * as config from './config';
import * as ora from 'ora'
import chalk from 'chalk'

let setup: boolean = false;

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
export function getPrice(symbol: string) {
	return new Promise((resolve, reject) => {
		checkSetup();
		try {
			binance.prices(function (ticker: object) {
				let price: string = (ticker as any)[symbol];
				if (!price) {
					reject('No price found for ' + symbol);
				}
				resolve(price as string);
			});
		} catch (e) {
			reject(e);
		}
	});
}

// Get the candlestick updates for the given symbol every period
export function candlestickUpdates(symbol: string, period: string) {
	checkSetup();
	try {
		// Periods: 1m,3m,5m,15m,30m,1h,2h,4h,6h,8h,12h,1d,3d,1w,1M
		binance.websockets.candlesticks([symbol], period, function (candlesticks: any) {
			let {
				e: eventType,
				E: eventTime,
				s: symbol,
				k: ticks
			} = candlesticks;
			let {
				o: open,
				h: high,
				l: low,
				c: close,
				v: volume,
				n: trades,
				i: interval,
				x: isFinal,
				q: quoteVolume,
				V: buyVolume,
				Q: quoteBuyVolume
			} = ticks;
			var d = new Date();
			console.log("\n" + chalk.green(symbol + " " + interval + " candlestick update on " + d.toLocaleDateString() + " at " + d.toLocaleTimeString()));
			console.log("open: " + open);
			console.log("high: " + high);
			console.log("low: " + low);
			console.log("close: " + close);
			console.log("volume: " + volume);
			console.log("isFinal: " + isFinal);
		});
	} catch (e) {
		console.log(chalk.red(e));
	}
}