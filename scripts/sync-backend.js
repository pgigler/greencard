/* eslint-disable no-console */
require("dotenv").config();
const chalk = require("chalk");
const runCommand = require("./run-command.js");
const sync = require("./sync.js");
const zipDir = require("./zip-dir.js");
const mkdirp = require("mkdirp");
const rimraf = require("rimraf");

const localTempFolder = "temp/php";

async function justZipBackend(ssh, onlyApi, remoteTempFolder, pRemoteDestFolder, env) {
	const envPath = env === "uat" ? "/uat" : "";
	const envPostfix = env === "prod" ? "_prod" : "_uat";
	const remoteDestFolder = `${pRemoteDestFolder}${envPath}`;
	try {
		rimraf.sync(localTempFolder);
		mkdirp.sync(localTempFolder);

		// await runCommand(ssh, `rm -rf ${remoteTempFolder} && mkdir -p ${remoteTempFolder}`);

		console.log("zip api...");
		await zipDir("php/api", `${localTempFolder}/api.zip`);
		if (!onlyApi) {
			console.log("zip vendor...");
			await zipDir("php/vendor", `${localTempFolder}/vendor.zip`, (path, stat) => {
				return stat.isDirectory() || /\.php$/.test(path);
			});
		}

		console.log("Backend successfully zipped");
	} catch (err) {
		console.log(chalk.red(err));
	}
}

async function deployBackend(ssh, onlyApi, remoteTempFolder, pRemoteDestFolder, env) {
	const envPath = env === "uat" ? "/uat" : "";
	const envPostfix = env === "prod" ? "_prod" : "_uat";
	const remoteDestFolder = `${pRemoteDestFolder}${envPath}`;
	try {
		if (!onlyApi) {
			console.log("unzip vendor.zip...");
			await runCommand(ssh, `unzip ${remoteTempFolder}/vendor.zip -d  ${remoteTempFolder}/vendor`, false);
		}
		console.log("unzip api.zip...");
		await runCommand(ssh, `unzip ${remoteTempFolder}/api.zip -d  ${remoteTempFolder}/api`, false);

		await runCommand(
			ssh,
			`mkdir -p ${remoteDestFolder} && rm -rf ${remoteDestFolder}/api && mv ${remoteTempFolder}/api ${remoteDestFolder} && cp /web/greencard_config${envPostfix}.php ${remoteDestFolder}/greencard_config.php`
		);
		if (!onlyApi) {
			await runCommand(
				ssh,
				`rm -rf ${remoteDestFolder}/vendor && mv ${remoteTempFolder}/vendor ${remoteDestFolder}`
			);
		}

		console.log("Backend successfully prepared");
	} catch (err) {
		console.log(chalk.red(err));
	}
}

async function justZipBackendFull(ssh, remoteTempFolder, remoteDestFolder, env) {
	await justZipBackend(ssh, false, remoteTempFolder, remoteDestFolder, env);
}

async function deployBackendFull(ssh, remoteTempFolder, remoteDestFolder, env) {
	await deployBackend(ssh, false, remoteTempFolder, remoteDestFolder, env);
}

async function justZipBackendOnlyApi(ssh, remoteTempFolder, remoteDestFolder, env) {
	await justZipBackend(ssh, true, remoteTempFolder, remoteDestFolder, env);
}

async function deployBackendOnlyApi(ssh, remoteTempFolder, remoteDestFolder, env) {
	await deployBackend(ssh, true, remoteTempFolder, remoteDestFolder, env);
}

module.exports = { justZipBackendFull, deployBackendFull, justZipBackendOnlyApi, deployBackendOnlyApi };
