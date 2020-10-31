/* eslint-disable no-console */
require("dotenv").config();
const chalk = require("chalk");
const runCommand = require("./run-command.js");
const sync = require("./sync.js");
const zipDir = require("./zip-dir.js");
const mkdirp = require("mkdirp");
const rimraf = require("rimraf");

const localTempFolder = "temp/php";

async function syncBackend(onlyApi, remoteTempFolder, pRemoteDestFolder, env) {
	const envPath = env === "uat" ? "/uat" : "";
	const envPostfix = env === "prod" ? "_prod" : "_uat";
	const remoteDestFolder = `${pRemoteDestFolder}${envPath}`;
	try {
		rimraf.sync(localTempFolder);
		mkdirp.sync(localTempFolder);

		await runCommand(`rm -rf ${remoteTempFolder} && mkdir -p ${remoteTempFolder}`);

		console.log("zip api...");
		await zipDir("php/api", `${localTempFolder}/api.zip`);
		if (!onlyApi) {
			console.log("zip vendor...");
			await zipDir("php/vendor", `${localTempFolder}/vendor.zip`, (path, stat) => {
				return stat.isDirectory() || /\.php$/.test(path);
			});
		}

		console.log("sync...");
		await sync(localTempFolder, `${remoteTempFolder}`);

		if (!onlyApi) {
			console.log("unzip vendor.zip...");
			await runCommand(`unzip ${remoteTempFolder}/vendor.zip -d  ${remoteTempFolder}/vendor`, false);
		}
		console.log("unzip api.zip...");
		await runCommand(`unzip ${remoteTempFolder}/api.zip -d  ${remoteTempFolder}/api`, false);

		await runCommand(
			`mkdir -p ${remoteDestFolder} && rm -rf ${remoteDestFolder}/api && mv ${remoteTempFolder}/api ${remoteDestFolder} && cp /web/tersus_config${envPostfix}.php ${remoteDestFolder}/tersus_config.php`
		);
		if (!onlyApi) {
			await runCommand(`rm -rf ${remoteDestFolder}/vendor && mv ${remoteTempFolder}/vendor ${remoteDestFolder}`);
		}

		console.log("Successfully deployed");
	} catch (err) {
		console.log(chalk.red(err));
	}
}

async function syncBackendFull(remoteTempFolder, remoteDestFolder, env) {
	await syncBackend(false, remoteTempFolder, remoteDestFolder, env);
}

async function syncBackendOnlyApi(remoteTempFolder, remoteDestFolder, env) {
	await syncBackend(true, remoteTempFolder, remoteDestFolder, env);
}

module.exports = { syncBackendFull, syncBackendOnlyApi };
