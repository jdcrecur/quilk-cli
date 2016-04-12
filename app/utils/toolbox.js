module.exports = {

	/**
	 * Takes an array, shuffles then returns
	 * @param array o array to be shuffled
	 */
	shuffle: function(o){
		for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	},

	/**
	 * Simple function that returns true if argument is a number else false
	 * @param mixed b param to test
	 */
	isNumeric: function(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	},

	/**
	 * Replace new lines with html new line character
	 * @param str
	 * @returns {*}
	 */
	nl2br: function( str ){
		return str.replace(/(?:\r\n|\r|\n)/g, '<br />');
	},

	/**
	 * Convert <br> or <br/> to \n
	 * @param str
	 * @returns {*}
	 */
	br2nl: function( str ){
		return str.replace(/<br\s*[\/]?>/gi, "\n");
	},

	/**
	 * Strips break lines from a string
	 * @param str
	 * @returns {*}
	 */
	brStrip: function( str ){
		return str.replace(/<br\s*[\/]?>/gi, "");
	},

	/**
	 * Sort a js object by keys
	 * @param object
	 * @param cb
	 * @returns {{}}
	 */
	sortKeys: function(object, cb){
		var sortedObject = {};

		var keys = Object.keys(object);
		keys.sort();
		for (var i = 0, size = keys.length; i < size; i++) {
			sortedObject[ keys[i] ] = object[ keys[i] ];
		}
		if( cb ){
			cb( sortedObject );
		} else {
			return sortedObject;
		}
	},


	url: {
		check:function( url ){
			var urlPattern = /((http|ftp|https):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/gi;
			var patt = new RegExp( urlPattern );
			return patt.exec( url );
		},
		getParts: function( url ){
			url = this.check( url );
			if( !url ) return false;
			var singleUrlPattern =/^((?:(.*?):)?\/\/?)?\/?(?:[^\/\.]+\.)*?([^\/\.]+)\.?([^\/]*)(?:([^?]*)?(?:\?([^#]*))?)?(.*)?/;
			return singleUrlPattern.exec( url[0] );
		}
	},

	/**
	 * Returns either the current time in milli seconds or a unix timestamp
	 * @param unix
	 * @returns {number}
	 */
	getTime: function( unix ){
		if( !unix ){
			return (new Date()).getTime();
		} else {
			return Math.floor(((new Date()).getTime()) / 1000);
		}
	},
	getUnixTime: function(){
		return this.getTime(1);
	},
	uniqid: function(){
		return this.getTime( false );
	},

	isObjectEmpty: function( o ){
		for ( var p in o ) {
			if ( o.hasOwnProperty( p ) ) { return false; }
		}
		return true;
	},

    /**
     * Returns an object from a . separated string eg getObjectFromPath('model.user'); would return the object of model.user
     * @param path
     * @param parentObject
     * @returns {*} Returns the object found, or false if incorrect path recieved
     */
    getObjectFromPath: function(path, parentObject){
	    var obj = parentObject,
	        pathArray = path.split('.');
        //loop through the paths narrowing down the parent object
	    for(var i = 0; i < pathArray.length; i++){
	        if( obj[pathArray[i]] ){
	            obj = obj[pathArray[i]];
	        } else {
	            obj = false;
	            break;
	        }
	    }
		return obj;
	},

	capitalizeFirstLetter: function(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	},

	/**
	 * merge the scraped image if exists for each wish into the image gallery
	 * @param data array of wishes, else converts object into first pos of array
	 * @param callback option callback
	 */
	filterImagesPaths: function( data, callback ){
		var returnObject = false, i = 0;
		if( !Array.isArray( data ) ){
			returnObject = true;
			data = [data];
		}

		for( i = 0 ; i < data.length ; ++i ){
			if( data[i]['image_names'] ){
				for( var j = 0 ; j < data[i]['image_names'].length ; ++j ){
				    data[i]['image_names'][j] = '//cdn.geenee.org/user_content/x225/' + data[i]['image_names'][j];
				}
			}
			if(!data[i]['image_names'] && data[i]['scraped_image']){
				data[i]['image_names'] = [];
			}
			if(data[i]['image_names'] && data[i]['scraped_image']){
				data[i]['scraped_image'] = '//cdn.geenee.org/user_content/url_content/x225/' + data[i]['scraped_image'];
				data[i]['image_names'].push( data[i]['scraped_image'] );
			}
		}

		if( returnObject ){
			data = data[0];
		}
		if(callback){
			return callback( data );
		}
		return data;
	},

	clearUriCache: function(uri, callback) {
		var reload = function () {
			// Force a reload of the iframe
			this.contentWindow.location.reload(true);

			// Remove `load` event listener and remove iframe
			this.removeEventListener('load', reload, false);
			this.parentElement.removeChild(this);

			// Run the callback if it is provided
			if (typeof callback === 'function') {
				callback();
			}
		};
		var iframe = document.createElement('iframe');
		iframe.style.display = 'none';

		// Reload iframe once it has loaded
		iframe.addEventListener('load', reload, false);

		// Only call callback if error occured while loading
		iframe.addEventListener('error', callback, false);
		iframe.src = uri;
		document.body.appendChild(iframe);
	},

	oddEvenColumns: function( data ){
		data.sort(function( a, b ){
			return Date.parse(b.date_entered) - Date.parse(a.date_entered);
		});
		if( $( window ).width() > 600 ){
			var even = [], odd = [];
			for( var i = 0 ; i < data.length ; ++i ){
				if(i%2 == 0 || i == 0 ){
					even.push( data[i] );
				} else {
					odd.push( data[i] );
				}
			}
			return even.concat(odd);
		} else {
			return data;
		}
	},

	getOrdinalSuffix: function( n ){
		if(n>3 && n<21){
			return 'th';
		}
		switch (n % 10) {
			case 1:  return "st";
			case 2:  return "nd";
			case 3:  return "rd";
			default: return "th";
		}
	},

	getMonthFromNumber: function( m, t ){
		t = t || 0;
		var months = [
			['January','February','March','April','May','June','July','August','September','October','November','December'],
			['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
		];
		return months[t][m];
	},

	/**
	 * Scroll an  object into view, pass either an object or selector string
	 */
	scrollIntoView: function( objToScollTo, topOffsetFromTarget, scrollSpeed, callback ){
		topOffsetFromTarget = topOffsetFromTarget || false;
		scrollSpeed = scrollSpeed || 500;
		var offset = $( objToScollTo ).offset();
		if( topOffsetFromTarget ){
			offset.top -= topOffsetFromTarget;
		}
		$('html, body').animate({
			scrollTop: offset.top
		}, scrollSpeed);
		if(callback){
			callback();
		}
	},

	inArray: function( haystack, needle, assocKey ){
		haystack = haystack || [];
		assocKey = assocKey || false;
		for(var i=0;i<haystack.length;++i){
			if( assocKey ){
				if( haystack[i][assocKey] == needle ){
					return true;
				}
			} else if( haystack[i] == needle ){
				return true;
			}
		}
		return false;
	}
};