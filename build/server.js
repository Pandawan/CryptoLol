"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bootbot_1 = require("bootbot");
var bot = new bootbot_1.default({
    accessToken: process.env.ACCESS_TOKEN,
    verifyToken: process.env.VERIFY_TOKEN,
    appSecret: process.env.APP_SECRET
});
bot.on('error', function (err) {
    console.log(err.message);
});
bot.on('message', function (payload, chat) {
    var text = payload.message.text;
    chat.say("Echo: " + text);
});
bot.start();
