/* eslint-disable no-console */
require("dotenv").config();
const chalk = require("chalk");
const runCommand = require("./run-command.js");
const sync = require("./sync.js");
const { justZipBackendFull, deployBackendFull } = require("./sync-backend.js");
const zipDir = require("./zip-dir.js");
const mkdirp = require("mkdirp");
const rimraf = require("rimraf");
const fs = require("fs");
const SSH2Promise = require("ssh2-promise");

const localSrcFolder = "./public/";
const localTempFolder = "temp/public";
const remoteStagingDir = process.env.SSH_REMOTE_STAGING_DIR;
const remoteProdFolder = process.env.SSH_REMOTE_PROD_DIR;
const remotePhpTempFolder = `${remoteStagingDir}/tempphpprod`;
const remoteTempFolder = `${remoteStagingDir}/temp`;
const remoteOldFolder = `${remoteStagingDir}/old`;

const args = process.argv.slice(2);

// TODO: automatize copy files
// - deploy:prod:justzip
// - see copyFiles()
// - deploy:prod:remotedeploy

async function run(ssh) {
	if (args.includes("--just-zip")) {
		console.log("Just zip...");
		await justZip(ssh);
	} else if (args.includes("--remote-deploy")) {
		console.log("Remote deploy...");
		await deploy(ssh);
	} else {
		console.log("Unknown command");
	}
}

async function justZip(ssh) {
	try {
		fs.copyFile(".htaccess", "public/.htaccess", (err) => {
			if (err) throw err;
		});

		rimraf.sync(localTempFolder);
		mkdirp.sync(localTempFolder);
		console.log("zip public...");
		await zipDir(localSrcFolder, `${localTempFolder}/public.zip`);
		await runCommand(ssh, `rm -rf ${remoteTempFolder} && mkdir -p ${remoteTempFolder}`);

		justZipBackendFull(ssh, remotePhpTempFolder, `${remoteTempFolder}/public`, "prod");
	} catch (err) {
		console.log(err);
		console.log(chalk.red(err));
	}
}

async function copyFiles(ssh) {
	// Copy manually from C:\Projects\my\greencard\temp\public\public.zip to /web/staging/greencardhu/temp (overwrite)
	// Copy manually from C:\Projects\my\greencard\temp\php\*.* to /web/staging/greencardhu/tempphpprod (overwrite)
}

async function deploy(ssh) {
	try {
		// console.log("sync...");
		// await sync(localTempFolder, `${remoteTempFolder}`);
		await runCommand(ssh, `unzip ${remoteTempFolder}/public.zip -d  ${remoteTempFolder}/public`, false);
		await deployBackendFull(ssh, remotePhpTempFolder, `${remoteTempFolder}/public`, "prod");
		await runCommand(
			ssh,
			`rm -rf ${remoteOldFolder} && mv ${remoteProdFolder} ${remoteOldFolder} && mv ${remoteTempFolder}/public ${remoteProdFolder}`
		);
	} catch (err) {
		console.log(err);
		console.log(chalk.red(err));
	}
}

const privateKey = fs.readFileSync(process.env.SSH_PRIVATE_KEY);
ssh = new SSH2Promise({
	host: process.env.SSH_HOST,
	username: process.env.SSH_USERNAME,
	privateKey,
});

run(ssh)
	.then(() => {
		ssh.close();
		console.log("Successfully deployed");
	})
	.catch((err) => {
		ssh.close();
		console.log(err);
	});
