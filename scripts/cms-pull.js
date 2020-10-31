/* eslint-disable no-console */
require("dotenv").config();
const gitPullOrClone = require("git-pull-or-clone");
const cpx = require("cpx");
const mkdirp = require("mkdirp");
const rimraf = require("rimraf");
const fs = require("fs");

async function run() {
	await gitPullOrClonePromise();
	sync();
	console.log("SUCCESS!");
}

function sync() {
	rimraf.sync("cms");
	mkdirp.sync("cms/assets");
	cpx.copySync(".cmsgit/**/*.md", "cms");
	console.log("all **/*.md copied");

	const assets = fs.readdirSync(".cmsgit/assets");
	const dirsCreated = [];
	assets.forEach((asset) => {
		if (asset.indexOf("-slash-") > -1) {
			const path = asset.replace(/-slash-/, "/");
			const dir = path.substring(0, path.lastIndexOf("/"));
			if (!dirsCreated.some((dirCreated) => dirCreated === dir)) {
				mkdirp.sync(`cms/assets/${dir}`);
				dirsCreated.push(dir);
			}
			fs.copyFileSync(`.cmsgit/assets/${asset}`, `cms/assets/${path}`);
			console.log(`${asset} copied to ${path}`);
		} else {
			cpx.copy(`.cmsgit/assets/${asset}`, "cms/assets");
			console.log(`${asset} copied`);
		}
	});
}

async function gitPullOrClonePromise() {
	return new Promise((resolve, reject) => {
		gitPullOrClone(`${process.env.CMS_URL}`, ".cmsgit", (err) => {
			if (err) return reject(err);
			resolve();
		});
	});
}

run();
