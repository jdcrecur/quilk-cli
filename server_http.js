// server_http.js

/**
 * 	Require the tools we need for the server_http.js
 */
var express			= require('express'), /* the html middleware */
	app				= express(), /* express into a handy var */
	bodyParser		= require('body-parser'), /* body parser */
	compression		= require('compression'), /* body compression for speed */
	contentFilter	= require('content-filter'), /* content-filter step 1 - this secures against mongo injection attacks. important! */
	cookieParser	= require('cookie-parser'), /* self explanatory */
	flash			= require('connect-flash'), /* flash messaging between requests using session data */
	jsonOutput		= require('./app/middleware/jsonOutput.js'), /* unify the json output */
	mongoose		= require('mongoose'), /* ODM for mongo, makes life very easy */
	morgan			= require('morgan'), /* morgan is a logging tool */
	path			= require('path'), /* NodeJS tool, used in this script to determin the static routes */
	session			= require('express-session'), /* Session data, similar to php sessions */
	swig			= require('swig'), /* The templating engine, a direct nodejs port of the most popular php tpl engine, Twig */
	site_settings	= require('./config/site'), /* The app's details, this is also included globally to the template engine */
	toolbox			= require('./app/utils/toolbox'); /* Last but not least, our own custom toolbox */

/**
 * Setting a global log function as i am tired of typing out console.log :)  Also,
 * routing through one function we control will give us better functionality later
 */
log = function log( a ){
	console.log( a );
};

/**
 * Setting a few base parameters for the app (this can be extended later to handle multiple devs, live and dev servers etc
 */
GLOBAL.site = {
	appRoot : __dirname,
	port : 8884
};

/**
 * The site settings as defined in the config file being made globally available
 */
GLOBAL.site_settings = site_settings;


// set up our express application
app.use( morgan('dev') );	// log every request to the console
app.use( cookieParser() );	// read cookies (needed for auth)
app.use( bodyParser.json({
	limit: '5mb'
}) );
// get information from html forms
app.use( bodyParser.urlencoded({
	extended:true,
	limit: '5mb'
}));

/* inject the jsonOutput middleware */
app.use( jsonOutput() );

app.use( contentFilter({
	bodyMessage: [] /* setting the forbidden message to an empty array so as to not give anything away to a potential hacker */
})); /* contentFilter step 2, this prevents nosql inject attacks */

app.use( compression() );	//auto compress the output to the client

// configuration ===============================================================
var configDB = require('./config/database.js');
mongoose.connect(configDB.url); // connect to our database

//Giving the app use of sessions and storing session data in a redis store for persistent storage after app restart
app.use(session({
	secret: 'somethingverysecret',
	cookie: {
		maxAge: 1000*60*60*24*365
	}
}));

//hook in the rest of the passport shtoof
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // use connect-flash for flash messages stored in session

//Static routes to the js and css, also the bower components
app.use( '/bower_components', express.static( path.join(__dirname, '/public/bower_components') ) );
app.use( '/css', express.static( path.join(__dirname, '/public/css') ) );
app.use( '/images', express.static( path.join(__dirname, '/public/images') ) );
app.use( '/js', express.static( path.join(__dirname, '/public/js') ) );
app.use( '/partials', express.static( path.join(__dirname, '/public/partials') ) ); /* you might be using angular */

//setting the GLOBAL variables into the tpl locals object
app.locals.GLOBAL = GLOBAL;

/**
 * CONFIGURE THE TEMPLATING ENGINE
 */
app.engine('swig', swig.renderFile); //use swig for html files
app.set('view engine', 'swig');
app.set('views', __dirname + '/swig'); //set the base path to the views
// Swig will cache templates for you, but you can disable
// that and use Express's caching instead, if you like:
app.set('view cache', false);
// To disable Swig's cache, do the following:
// NOTE: You should always cache templates in a production environment.
// Don't leave both of these to `false` in production!
swig.setDefaults({
	cache: false,
	/* this is altering the default delimeters to function with AngularJs. As AngJS uses {{ somevar }} might as well change the swig's delimters to something else.*/
	varControls: ['{[',']}']
});


/**
 * INCLUDE THE ROUTING FILES
 */
// NOT LOGGED IN
require('./app/routes/not_logged_in/routeGeneral')(app);


/**
 * HANDLING A 404 ERROR
 */
app.use(function(req, res, next){
	res.status(404);
	// respond with html page
	if (req.accepts('html')) {
		res.render('public/404.swig', { url: req.url });
		return;
	}
	// respond with json
	if (req.accepts('json')) {
		res.send({ error: 'Not found' });
		return;
	}
	// default to plain-text. send()
	res.type('txt').send('Not found');
});

/**
 * START THE APP ON THE PORT DESIGNATED
 */
app.listen(GLOBAL.site.port);

/**
 * A NICE LITTE CONSOLE LOG TO SAY WE'RE UP AND RUNNING :)
 */
console.log( 'The magic happens on port ' + GLOBAL.site.port );