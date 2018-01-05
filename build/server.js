const bootbot = require('bootbot');
const fetch = require('./fetch');

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
			chat.say('I give you important information about popular Crypto Currencies.', {
				typing: true
			});
		});
	});
});

bot.hear([/price (.*)/i], (payload, chat, data) => {
	let query = data.match[1];
	let to = ['USD', 'BTC', 'ETH'];
	fetch.convertPrice(query, to).then((response) => {
		// Create an output with every value
		let output = '';
		to.forEach(element => {
			output += `${element}: ${chalk.green(data[element])}\n`;
		});
		chat.say(`Price of ${query}\n${output}`);
	}).catch((error) => {
		console.log(error);
		chat.say('Oops, something went wrong...').then(() => {
			chat.say(error.message);
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