/* eslint-disable no-console */
require("dotenv").config();
const { deploy } = require("sftp-sync-deploy");

async function sync(localDir, remoteDir, options) {
	console.log(process.env.SSH_PRIVATE_KEY);
	return new Promise((resolve, reject) => {
		deploy(
			{
				host: process.env.SSH_HOST,
				username: process.env.SSH_USERNAME,
				privatekey: process.env.SSH_PRIVATE_KEY,
				localDir,
				remoteDir,
			},
			{
				dryRun: true,
				...options,
			}
		)
			.then(() => {
				resolve();
			})
			.catch((err) => {
				reject(err);
			});
	});
}

module.exports = sync;
