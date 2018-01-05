import './polyfills';
import * as commander from 'commander';
import chalk from 'chalk';
import * as ora from 'ora';
import * as actions from './fetch';
const pkg = require('../package.json');

let executed = false;

commander
	.version(pkg.version)
	.description(pkg.description)

commander
	.command('price <coin>')
	.alias('p')
	.description('A quick conversion of the price of the coin into (USD and BTC)')
	.action(function (coin: string) {
		executed = true;
		let to: string[] = ['USD', 'BTC', 'ETH'];
		let spinner = ora('Loading prices').start();
		actions.convertPrice(coin, to).then((data: any) => {
			spinner.stop();
			// Create an output with every value
			let output: string = '';
			to.forEach(element => {
				output += `${element}: ${chalk.green(data[element])}\n`;
			});
			console.log(`\nPrice of ${coin}\n${output}`);
		}).catch((error) => {
			console.log(chalk.red(error));
			spinner.stop();
		});
	});

commander
	.command('convert <from> <to...>')
	.alias('c')
	.description('Convert the price of a coin to other coins/currencies')
	.action(function (from: string, to: string[]) {
		executed = true;
		let spinner = ora('Loading prices').start();
		actions.convertPrice(from, to).then((data: any) => {
			spinner.stop();
			// Create an output with every value
			let output: string = '';
			to.forEach(element => {
				output += `${element}: ${chalk.green(data[element])}\n`;
			});
			console.log(`\nPrice of ${from}\n${output}`);
		}).catch((error) => {
			console.log(chalk.red(error));
			spinner.stop();
		});
	});

commander.parse(process.argv);


if (!executed) {
	commander.help();
}