/* eslint-disable no-console */
require("dotenv").config();

async function runCommand(ssh, command, logOutput = true) {
	return new Promise((resolve, reject) => {
		ssh.exec(command)
			.then((data) => {
				if (logOutput) {
					console.log(data);
				}
				resolve(data);
			})
			.catch((err) => {
				reject(err);
			});
	});
}

module.exports = runCommand;
