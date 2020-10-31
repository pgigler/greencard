/* eslint-disable no-console */
require("dotenv").config();
const chalk = require("chalk");
const runCommand = require("./run-command.js");
const sync = require("./sync.js");

const stagingDir = process.env.SSH_REMOTE_STAGING_DIR;
const prodFolder = process.env.SSH_REMOTE_PROD_DIR;
const srcFolder = "./public_sorry/";
const sorryFolder = `${stagingDir}/sorry`;
const oldFolder = `${stagingDir}/old`;

async function run() {
	try {
		await runCommand(`rm -rf ${sorryFolder} && mkdir -p ${sorryFolder}`);
		await sync(srcFolder, sorryFolder, { forceUpload: true });
		await runCommand(`rm -rf ${oldFolder} && mv ${prodFolder} ${oldFolder} && mv ${sorryFolder} ${prodFolder}`);
		console.log("Successfully deployed");
	} catch (err) {
		console.log(chalk.red(err));
	}
}

run();
