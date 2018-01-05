import { bootbot } from 'bootbot';

const bot = new bootbot({
	accessToken: process.env.ACCESS_TOKEN,
	verifyToken: process.env.VERIFY_TOKEN,
	appSecret: process.env.APP_SECRET
});

bot.on('error', (err: Error) => {
	console.log(err.message);
});

bot.on('message', (payload: any, chat: any) => {
	const text = payload.message.text;
	chat.say(`Echo: ${text}`);
	console.log(`Sent message: "Echo: ${text}"`)
});

bot.start();
console.log('Bot started!');