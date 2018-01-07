const bootbot = require('bootbot');
const fetch = require('./fetch');
const fire = require('./fire');

const bot = new bootbot({
	accessToken: process.env.ACCESS_TOKEN,
	verifyToken: process.env.VERIFY_TOKEN,
	appSecret: process.env.APP_SECRET
});

bot.hear([/hello( there)?/i, /hi( there)?/i, /hey( there)?/i], (payload, chat) => {
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

bot.hear([/\s*\bp(?:rice)?\s+(.*)\s*/i], (payload, chat, data) => {
	let query = data.match[1].toUpperCase();
	let to = ['USD', 'BTC', 'ETH'];
	fetch.convertPrice(query, to).then((response) => {
		// Create an output with every value
		let output = '';
		to.forEach(element => {
			// If element is undefined or has a problem
			if (element) {
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

bot.hear([/\s*\bp(?:rice)\s*/i], (payload, chat, data) => {
	if (data.captured) return;

	chat.say('Please specify for which currency you want the prices (BTC, ETH...)', {
		typing: true
	});
});

// c(onvert) ### XXX (to) YYY
bot.hear([/\s*\bc(?:onvert)?\s+([0-9]+(?:[,.][0-9]*)?)\s+(\S*)\s+(?:to\s+)?\s*(\S*)\s*/i], (payload, chat, data) => {

	let amount = data.match[1];
	let from = data.match[2].toUpperCase();
	let to = data.match[3].toUpperCase();

	fetch.convertPrice(from, [to]).then((response) => {
		// Create an output with every value
		let output = '';
		if (to && response[to]) {
			output += `${amount} ${from} is ${response[to] * amount} ${to}`;
			chat.say(`${output}`, {
				typing: true
			});
		} else {
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

bot.hear([/\s*\bc(?:onvert)?\s*(?:.*)?\s*/i], (payload, chat, data) => {
	if (data.captured) return;

	chat.say('Please specify your request like so: convert amount original (to) final', {
		typing: true
	}).then(() => {
		chat.say('Here is an example: convert 1 BTC to USD', {
			typing: true
		});
	});
});

// s(ub(scribe)) (to) XXX
bot.hear([/\s*\bs(?:ub(?:scribe)?)?\s+(?:to\s+)?\s*(\S*)\s*/i], (payload, chat, data) => {
	let userId = payload.sender.id;
	let coin = data.match[1].toUpperCase();

	// Add Subcription for given coin
	fire.addSub(userId, coin).then((response) => {
		chat.say({
			text: 'Subscribed to ' + coin,
			buttons: [
				//{ type: 'postback', title: 'Cancel Subscription', payload: 'UNSUB_' + coin }, NOT YET AVAILABLE
				{
					type: 'postback',
					title: 'View Subs',
					payload: 'VIEW_SUBS'
				}
			]
		}, {
			typing: true
		});
	}).catch((error) => {
		console.log(error);
		chat.say('Oops, something went wrong...', {
			typing: true
		}).then(() => {
			chat.say(error.message);
		});
	});
});

// (view) s(ub(s)(scription(s)))
bot.hear([/\s*\b(?:view\s+)?s(?:ubs?(?:criptions?)?)?\s*/i], (payload, chat, data) => {
	if (data.captured) return;

	let userId = payload.sender.id;

	// Get subscriptions
	fire.getSubs(userId).then((response) => {
		chat.say('Here are your subscriptions: ' + response.join(', ') + '.\nYou can unsubscribe from any of them like so "Unsubscribe BTC"', {
			typing: true
		});
	}).catch((error) => {
		console.log(error);
		chat.say('Oops, something went wrong...', {
			typing: true
		}).then(() => {
			chat.say(error.message);
		});
	});
});

// View Subs Postback (button)
bot.on('postback:VIEW_SUBS', (payload, chat, data) => {
	let userId = payload.sender.id;

	// Get subscriptions
	fire.getSubs(userId).then((response) => {
		chat.say('Here are your subscriptions: ' + response.join(', ') + '.\nYou can unsubscribe from any of them like so "Unsubscribe BTC"', {
			typing: true
		});
	}).catch((error) => {
		console.log(error);
		chat.say('Oops, something went wrong...', {
			typing: true
		}).then(() => {
			chat.say(error.message);
		});
	});
});

// UnSub Postback (button)
bot.on(/postback:UNSUB_(\S*)/i, (payload, chat, data) => {
	let userId = payload.sender.id;
	let sub = data.match[1].toUpperCase();

	// Remove subscriptions
	fire.removeSub(userId, coin).then((response) => {
		chat.say({
			text: 'Unsubscribed from ' + coin,
			buttons: [{
				type: 'postback',
				title: 'View Subs',
				payload: 'VIEW_SUBS'
			}]
		}, {
			typing: true
		});
	}).catch((error) => {
		console.log(error);
		chat.say('Oops, something went wrong...', {
			typing: true
		}).then(() => {
			chat.say(error.message);
		});
	});
});

// u(nsub(scribe)) (from) XXX
bot.hear([/\s*\bu(?:nsub?(?:scribe)?)?\s+(?:from\s+)?\s*(\S*)\s*/i], (payload, chat, data) => {
	let userId = payload.sender.id;
	let coin = data.match[1].toUpperCase();

	// Remove subscriptions
	fire.removeSub(userId, coin).then((response) => {
		chat.say({
			text: 'Unsubscribed from ' + coin,
			buttons: [{
				type: 'postback',
				title: 'View Subs',
				payload: 'VIEW_SUBS'
			}]
		}, {
			typing: true
		});
	}).catch((error) => {
		console.log(error);
		chat.say('Oops, something went wrong...', {
			typing: true
		}).then(() => {
			chat.say(error.message);
		});
	});
});

// u(nsub(scribe)) (from) XXX
bot.hear([/\s*\bu(?:nsub?(?:scribe)?)?\s*/i], (payload, chat, data) => {
	if (data.captured) return;

	chat.say('Please specify your request like so: "Unsubscribe (from) coin"', {
		typing: true
	}).then(() => {
		chat.say('Here is an example: "Unsubscribe from BTC"', {
			typing: true
		});
	});
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