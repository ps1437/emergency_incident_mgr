var socialLoginClass    = require("social-login");
// Init
var socialLogin			= new socialLoginClass({
    app:	app,    // ExpressJS instance
    url:	'http://localhost:3200',  // Your root url
    onAuth:	function(req, type, uniqueProperty, accessToken, refreshToken, profile, done) {
        
        // This is the centralized method that is called when the user is logged in using any of the supported social site.
        // Setup once and you're done.
        
        findOrCreate({
            profile:	profile,        // Profile is the user's profile, already filtered to return only the parts that matter (no HTTP response code and that kind of useless data)
            property:	uniqueProperty, // What property in the data is unique: id, ID, name, ...
            type:		type            // What type of login that is: facebook, foursquare, google, ...
        }, function(user) {
            done(null, user);   // Return the user and continue
        });
    }
});


socialLogin.use({
    facebook:	{
        settings:	{
            clientID:		"346852652793676",
            clientSecret: 	"d21d8dff6996a934797ec973d74a0c32",
            authParameters:	{
                scope: 'read_stream,manage_pages'
            }
        },
        url:	{
            auth:		"/auth/facebook",           // The URL to use to login (<a href="/auth/facebook">Login with facebook</a>).
            callback: 	"/auth/facebook/callback",  // The Oauth callback url as specified in your facebook app's settings
            success:	'/',                        // Where to redirect the user once he's logged in
            fail:		'/auth/facebook/fail'       // Where to redirect the user if the login failed or was canceled.
        }
    },
    google:	{
        settings:	{}, // Google doesn't take any API key or API secret
        url:	{
            auth:		"/auth/google",
            callback: 	"/auth/google/callback",
            success:	'/',
            fail:		'/auth/google/fail'
        }
    }
});
