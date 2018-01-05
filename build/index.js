"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./polyfills");
var commander = require("commander");
var chalk_1 = require("chalk");
var ora = require("ora");
var actions = require("./fetch");
var pkg = require('../package.json');
var executed = false;
commander
    .version(pkg.version)
    .description(pkg.description);
commander
    .command('price <coin>')
    .alias('p')
    .description('A quick conversion of the price of the coin into (USD and BTC)')
    .action(function (coin) {
    executed = true;
    var to = ['USD', 'BTC', 'ETH'];
    var spinner = ora('Loading prices').start();
    actions.convertPrice(coin, to).then(function (data) {
        spinner.stop();
        // Create an output with every value
        var output = '';
        to.forEach(function (element) {
            output += element + ": " + chalk_1.default.green(data[element]) + "\n";
        });
        console.log("\nPrice of " + coin + "\n" + output);
    }).catch(function (error) {
        console.log(chalk_1.default.red(error));
        spinner.stop();
    });
});
commander
    .command('convert <from> <to...>')
    .alias('c')
    .description('Convert the price of a coin to other coins/currencies')
    .action(function (from, to) {
    executed = true;
    var spinner = ora('Loading prices').start();
    actions.convertPrice(from, to).then(function (data) {
        spinner.stop();
        // Create an output with every value
        var output = '';
        to.forEach(function (element) {
            output += element + ": " + chalk_1.default.green(data[element]) + "\n";
        });
        console.log("\nPrice of " + from + "\n" + output);
    }).catch(function (error) {
        console.log(chalk_1.default.red(error));
        spinner.stop();
    });
});
commander.parse(process.argv);
if (!executed) {
    commander.help();
}
