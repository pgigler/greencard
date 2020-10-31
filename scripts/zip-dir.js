/* eslint-disable no-console */
const zipdir = require("zip-dir");

async function zipDir(srcDir, targetFile, filter) {
	return new Promise((resolve, reject) => {
		zipdir(srcDir, { saveTo: targetFile, filter }, function (err, _buffer) {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
}

module.exports = zipDir;
