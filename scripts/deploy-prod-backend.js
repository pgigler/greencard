/* eslint-disable no-console */
require("dotenv").config();
const { syncBackendFull, syncBackendOnlyApi } = require("./sync-backend.js");

const stagingDir = process.env.SSH_REMOTE_STAGING_DIR;
const remoteDestFolder = process.env.SSH_REMOTE_PROD_DIR;
const remoteTempFolder = `${stagingDir}/tempphpprod`;

const onlyApi = process.argv.length > 2 && process.argv[2] === "onlyapi";

if (onlyApi) {
	syncBackendOnlyApi(remoteTempFolder, remoteDestFolder, "prod");
} else {
	syncBackendFull(remoteTempFolder, remoteDestFolder, "prod");
}
