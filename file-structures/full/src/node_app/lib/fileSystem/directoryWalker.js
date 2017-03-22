//walk files function
function directoryWalk(currentDirPath, callback) {
	let fs = require('fs'), path = require('path');
	fs.readdirSync(currentDirPath).forEach(function (name) {
		let filePath = path.join(currentDirPath, name),
			stat = fs.statSync(filePath);

		if (stat.isFile()) callback(filePath, stat);
		else if (stat.isDirectory()) directoryWalk(filePath, callback);
	});
}
module.exports = directoryWalk;