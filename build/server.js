const bootbot = require('bootbot');

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


bot.on('error', (err) => {
	console.log(err.message);
});

bot.on('message', (payload, chat) => {
	const text = payload.message.text;
	console.log(chat);
	chat.say(`Echo: ${text}`);
	console.log(`Sent message: "Echo: ${text}"`)
});

bot.start(process.env.PORT || 3000);
console.log('Bot started!');