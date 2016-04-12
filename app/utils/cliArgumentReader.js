module.exports = {
	/**
	 * The args can be a string, or variable/value pair where the value can either be a string or numeric array with each position separated by a |
	 * Example input:
	 * node server.js devmode arg2=one|two|potatoes arg3=2742 someOtherArg
	 * Return of above example would be a js object like:
	 * {
	 * 		devmode: true,
	 * 		arg2 : ['one', 'two', 'potatoes'],
	 * 		arg3 : 2742,
	 * 		someOtherArg : false
	 * }
	 */
	readAll : function(){
		//get the arguments passed to the file
		var cliArgsObj = {};
		process.argv.forEach(function(val, index, array) {
			//check if the arg is a variable=value pair
			if( val.indexOf('=') > 0 ){
				val = val.split('=');
				//split the value with the | if | exists in string
				if( val[1].indexOf('|') > 0 ){
					//break the val[1] into an array
					//else simply place the value
					cliArgsObj[val[0]] = val[1].split('|');
				} else {
					//else simply place the value
					cliArgsObj[val[0]] = val[1];
				}
			} else {
				cliArgsObj[val] = true;
			}
		});
		return cliArgsObj;
	}
};