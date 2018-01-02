import './polyfills';
import * as commander from 'commander';
import chalk from 'chalk';
import * as ora from 'ora';
import * as actions from './fetch';
import * as config from './config';
const pkg = require('../package.json');

let executed = false;

commander
	.version(pkg.version)
	.description(pkg.description)

commander
	.command('setup <key> <secret>')
	.alias('s')
	.description('Setup the API keys for Binance')
	.action(function (key: string, secret: string) {
		executed = true;
		config.setBinance(key, secret);
		console.log(chalk.green('Successfully set key and secret.'));
	});

commander
	.command('price <symbol>')
	.alias('p')
	.description('Fetch the price of the given coin')
	.action(function (symbol: string) {
		executed = true;
		const spinner = ora('Fetching price...').start();
		actions.getPrice(symbol).then(function (price) {
			spinner.stop();
			console.log(symbol + ": " + chalk.green(price as string));
		}).catch(function (error) {
			spinner.stop();
			console.log(chalk.red(error));
		});
	});

commander
	.command('update <symbol> <period>')
	.alias('u')
	.description('Get candlesticks updates on a specific coin with a time period')
	.action(function (symbol: string, period: string) {
		executed = true;
		actions.candlestickUpdates(symbol, period);
	});

commander
	.command('watch')
	.alias('w')
	.description('Watch the coins stored in the config and send messages on specific thresholds or requirements are met')
	.action(function (symbol: string, period: string) {
		executed = true;
		actions.candlestickUpdates(symbol, period);
	});

commander.parse(process.argv);


if (!executed) {
	commander.help();
}