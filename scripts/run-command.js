/* eslint-disable no-console */
require("dotenv").config();
const exec = require("ssh-exec");
const fs = require("fs");

const privateKey = fs.readFileSync(process.env.SSH_PRIVATE_KEY);

async function runCommand(command, logOutput = true) {
	return new Promise((resolve, reject) => {
		exec(
			command,
			{
				host: process.env.SSH_HOST,
				user: process.env.SSH_USERNAME,
				key: privateKey,
			},
			function (_err, stdout, stderr) {
				if (stderr) {
					reject(stderr);
				} else {
					if (logOutput) {
						console.log(stdout);
					}
					resolve();
				}
			}
		);
	});
}

module.exports = runCommand;
