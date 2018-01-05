import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';

export interface tickerData {
	id: string,
	name: string,
	symbol: string,
	rank: string,
	price_usd: string,
	price_btc: string,
	"24h_volume_usd": string,
	market_cap_usd: string,
	available_supply: string,
	total_supply: string,
	max_supply: string,
	percent_change_1h: string,
	percent_change_24h: string,
	percent_change_7d: string,
	last_updated: string,
}

// deprecated Get the price of the given symbol (CoinMarketCap)
export function getSingleTicker(symbol: string) {
	return new Promise((resolve, reject) => {
		axios.get(`https://api.coinmarketcap.com/v1/ticker/${symbol}/`)
		.then(function (response) {

			resolve((response.data as tickerData[])[0]);
		})
		.catch(function(error) {
			reject(error);
		});
	});
}

// Get the price of a coin in other currencies
export function convertPrice(from: string, to: string[]) {
	return new Promise((resolve, reject) => {
		axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${from}&tsyms=${to.join(',')}`)
		.then(function (response) {
			resolve(response.data as any);
		})
		.catch(function(error) {
			reject(error);
		});
	});
}
