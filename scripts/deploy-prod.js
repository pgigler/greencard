/* eslint-disable no-console */
require("dotenv").config();
const chalk = require("chalk");
const runCommand = require("./run-command.js");
const sync = require("./sync.js");
const { syncBackendFull } = require("./sync-backend.js");
const zipDir = require("./zip-dir.js");
const mkdirp = require("mkdirp");
const rimraf = require("rimraf");
const fs = require("fs");

const localSrcFolder = "./public/";
const localTempFolder = "temp/public";
const remoteStagingDir = process.env.SSH_REMOTE_STAGING_DIR;
const remoteProdFolder = process.env.SSH_REMOTE_PROD_DIR;
const remotePhpTempFolder = `${remoteStagingDir}/tempphpprod`;
const remoteTempFolder = `${remoteStagingDir}/temp`;
const remoteOldFolder = `${remoteStagingDir}/old`;

async function run() {
	try {
		fs.copyFile(".htaccess", "public/.htaccess", (err) => {
			if (err) throw err;
		});

		rimraf.sync(localTempFolder);
		mkdirp.sync(localTempFolder);
		await runCommand(`rm -rf ${remoteTempFolder} && mkdir -p ${remoteTempFolder}`);
		console.log("zip public...");
		await zipDir(localSrcFolder, `${localTempFolder}/public.zip`);
		console.log("sync...");
		await sync(localTempFolder, `${remoteTempFolder}`);
		console.log("unzip api.zip...");
		await runCommand(`unzip ${remoteTempFolder}/public.zip -d  ${remoteTempFolder}/public`, false);
		await syncBackendFull(remotePhpTempFolder, `${remoteTempFolder}/public`, "prod");
		await runCommand(
			`rm -rf ${remoteOldFolder} && mv ${remoteProdFolder} ${remoteOldFolder} && mv ${remoteTempFolder}/public ${remoteProdFolder}`
		);
		console.log("Successfully deployed");
	} catch (err) {
		console.log(chalk.red(err));
	}
}

run();
