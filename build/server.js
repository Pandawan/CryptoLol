const bootbot = require('bootbot');
const fetch = require('./fetch');

const bot = new bootbot({
	accessToken: process.env.ACCESS_TOKEN,
	verifyToken: process.env.VERIFY_TOKEN,
	appSecret: process.env.APP_SECRET
});

bot.hear([/^hello( there)?/i, /^hi( there)?/i, /^hey( there)?/i, /^start/i, /^get\s*started/i], (payload, chat) => {
	if (data.captured) return;

	// Send a text message followed by another text message that contains a typing indicator
	chat.say('Hello, human friend!').then(() => {
		chat.say('I\'m CryptoLol!', {
			typing: true
		}).then(() => {
			chat.say('I can help you check out information about Crypto Currencies.', {
				typing: true
			});
		});
	});
});

// p(rice) (of) XXX
bot.hear([/^\s*p(?:rice)?\s*(?:of)?\s+(\S*)\s*$/i], (payload, chat, data) => {
	if (data.captured) return;

	let query = data.match[1].toUpperCase();
	let to = ['USD', 'BTC', 'ETH'];
	fetch.convertPrice(query, to).then((response) => {
		// Create an output with every value
		let output = '';
		to.forEach(element => {
			// If element is undefined or has a problem
			if (element && response[element]) {
				output += `${element}: ${response[element]}\n`;
			}
		});
		// If output is empty, then something went wrong...
		if (!output) {
			chat.say(`Nothing found for ${query}.`, {
				typing: true
			});
		} else {
			chat.say(`Price of ${query}\n${output}`, {
				typing: true
			});
		}
	}).catch((error) => {
		console.log(error);
		chat.say('Oops, something went wrong...', {
			typing: true
		}).then(() => {
			chat.say(error.message);
		});
	});
});

// p(rice) (of)
bot.hear([/^\s*p(?:rice)?\s*(?:of)?\s*$/i], (payload, chat, data) => {
	if (data.captured) return;

	chat.say('Please specify for which currency you want the prices (BTC, ETH...)', {
		typing: true
	}).then(() => {
		chat.say('Here is an example: price of BTC', {
			typing: true
		});
	});
});

// c(onvert) ### XXX (to) YYY
bot.hear([/^\s*c(?:onvert)?\s+([0-9]+(?:[,.][0-9]*)?)\s+(\S*)\s+(?:to\s+)?\s*(\S*)\s*$/i], (payload, chat, data) => {
	if (data.captured) return;

	let amount = data.match[1].toUpperCase();
	let from = data.match[2].toUpperCase();
	let to = data.match[3].toUpperCase();

	fetch.convertPrice(from, [to]).then((response) => {
		// Create an output with every value
		let output = '';
		if (to && response[to]) {
			ouput += `${amount} ${from} is ${response[to] * amount} ${to}`;
			chat.say(`${output}`, {
				typing: true
			});
		}
		else {
			chat.say(`Nothing found.`, {
				typing: true
			});
		}
	}).catch((error) => {
		console.log(error);
		chat.say('Oops, something went wrong...', {
			typing: true
		}).then(() => {
			chat.say(error.message);
		});
	});
});

bot.hear([/^\s*c(?:onvert)?\s*(?:.*)?\s*$/i], (payload, chat, data) => {
	if (data.captured) return;

	chat.say('Please specify your request like so: convert amount original (to) final', {
		typing: true
	}).then(() => {
		chat.say('Here is an example: convert 1 BTC to USD', {
			typing: true
		});
	})
});

bot.on('error', (err) => {
	console.log(err.message);
});

// TODO: Make a system for basic menu/message
bot.on('message', (payload, chat, data) => {
	const text = payload.message.text;

	// If this message was not used by any previous system (not recognized)
	if (!data.captured) {
		chat.say('Sorry, I don\'t understand...');
	}
});

bot.start(process.env.PORT || 3000);
console.log('Bot started!');