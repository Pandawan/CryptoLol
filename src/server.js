const bootbot = require('bootbot');

const bot = new bootbot({
	accessToken: process.env.ACCESS_TOKEN,
	verifyToken: process.env.VERIFY_TOKEN,
	appSecret: process.env.APP_SECRET
});

bot.on('error', (err) => {
	console.log(err.message);
});

bot.on('message', (payload, chat) => {
	const text = payload.message.text;
	chat.say(`Echo: ${text}`);
	console.log(`Sent message: "Echo: ${text}"`)
});

bot.start(process.env.PORT || 3000);
console.log('Bot started!');