//walk files function
function directoryWalk(currentDirPath, callback) {
	var fs = require('fs'), path = require('path');
	fs.readdirSync(currentDirPath).forEach(function (name) {
		var filePath = path.join(currentDirPath, name);
		var stat = fs.statSync(filePath);
		if (stat.isFile()) {
			callback(filePath, stat);
		} else if (stat.isDirectory()) {
			directoryWalk(filePath, callback);
		}
	});
}
module.exports = directoryWalk;