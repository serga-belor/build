/*eslint no-console: ["error", { allow: ["log", "warn", "error"] }] */

const argv = process.argv;
for(let i=2; i<argv.length; i++) {
	console.log(`${i-1}: ${argv[i]}`);
}

const node_modules_package_file_path = __dirname;
