"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./polyfills");
var commander = require("commander");
var chalk_1 = require("chalk");
var ora = require("ora");
var actions = require("./fetch");
var config = require("./config");
var pkg = require('../package.json');
var executed = false;
commander
    .version(pkg.version)
    .description(pkg.description);
commander
    .command('setup <key> <secret>')
    .alias('s')
    .description('Setup the API keys for Binance')
    .action(function (key, secret) {
    executed = true;
    config.setBinance(key, secret);
    console.log(chalk_1.default.green('Successfully set key and secret.'));
});
commander
    .command('price <type>')
    .alias('p')
    .description('Fetch the price of the given coin')
    .action(function (symbol) {
    executed = true;
    var spinner = ora('Fetching price...').start();
    actions.getPrice(symbol).then(function (price) {
        spinner.stop();
        console.log(symbol + ": " + chalk_1.default.green(price));
    }).catch(function (error) {
        spinner.stop();
        console.log(chalk_1.default.red(error));
    });
});
commander
    .command('update <type> <period>')
    .alias('u')
    .description('Fetch the price of the given coin')
    .action(function (symbol, period) {
    executed = true;
    actions.candlestickUpdates(symbol, period);
});
commander.parse(process.argv);
if (!executed) {
    commander.help();
}
