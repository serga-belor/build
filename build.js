/* eslint no-console: ["error", { allow: ["log", "warn", "error"] }] */

console.log("===");
console.log("=== build");
const argv = process.argv;
for(let i=2; i<argv.length; i++) {
	console.log(`===   ${i-1}: ${argv[i]}`);
}
console.log("===");

const path = require("path");
const fs = require("fs");

const package_json_path = path.resolve(__dirname, "./node-build/package.json");
const package_json_stamp_path = path.resolve(__dirname, "./node-build/package.json.stamp");
const node_modules_path = path.resolve(__dirname, "./node-build/node_modules");
const node_modules_link_path = path.resolve(__dirname, "../node_modules");

try {
	if( !fs.existsSync( package_json_path ) ) {
		ExitWithError( `There is no '${package_json_path}' file. Sync Git repository first.` );
	}
	if( !fs.existsSync( node_modules_path ) ) {
		ExitWithError( `There is no '${node_modules_path}' folder. Call ${path.resolve(__dirname, "/node-build/update-node-modules")} script.` );
	}
	if( !fs.existsSync( package_json_stamp_path ) ) {
		ExitWithError( `There is no '${package_json_stamp_path}' file. Call ${path.resolve(__dirname, "/node-build/update-node-modules")} script.` );
	}
	const package_json = fs.readFileSync( package_json_path ).toString();
	if( !package_json ) {
		ExitWithError( `'${package_json_path}' file is wrong. Sync Git repository first.` );
	}
	const package_json_stamp = fs.readFileSync( package_json_path ).toString();
	if( package_json != package_json_stamp ) {
		ExitWithError( `node modules are outdated. Call ${path.resolve(__dirname, "/node-build/update-node-modules")} script.` );
	}
	if( !fs.existsSync( node_modules_link_path ) ) {
		fs.symlinkSync( node_modules_path, node_modules_link_path, "junction" );
	} else {
		const link = fs.readlinkSync( node_modules_link_path );
		if( path.resolve(link) != path.resolve(node_modules_path) ) {
			ExitWithError( `${node_modules_link_path} should be a link to ${node_modules_path}. Delete ${node_modules_link_path} and call the script once again.` );
		}
	}
	console.log("Success");

} catch(e) {
	if( e.name === "exit with error" ) {
		process.exitCode = e.exitCode || 1;
		console.error("!!! " + e.message);
	} else {
		console.error("!!! unexpected error: " + e);
	}
}


function ExitWithError( message ) {
	throw {
		name: "exit with error",
		message: message
	};
}
