
/* This is general site info, can be called in the js files as you would expect, but,
 * this export is also exposed to all our views via app.locals, see the server.js file.
 * That is all of the private, public and email views.
 *
 * Example use when in a template, this is used in the /views/analytics.html file:  {{siteDetails.googleAnalytics.trackingID}}
 * The whole of the object is included into an accessible object in the tpl files called siteDetails
*/
module.exports = {
	'siteName' : 'My Awesome App',
	'emails' : {
		'noReply' 	: 'noreply@my-site.com',
		'accounts' 	: 'accounts@my-site.com'
	},

	website: 'https://www.my-site.com',

	siteDomain: {
		'public': 'my-site.com',
		'dev': 'my-site.com'
	},

	siteProtocol: 'http:'
};