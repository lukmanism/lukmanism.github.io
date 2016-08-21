 require.config({
 	// nodeRequire: require,
	baseUrl: 'app',
	waitSeconds: 200,
	paths: {
		jquery		: 'scripts/vendor/jquery/dist/jquery',
		express		: 'scripts/vendor/express/index',
		underscore	: 'scripts/vendor/underscore/underscore',
		backbone	: 'scripts/vendor/backbone/backbone',
		bootstrap	: 'scripts/vendor/bootstrap/dist/js/bootstrap',
		text		: 'scripts/text',
		router		: 'scripts/router',
	},
	shim: {
		'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'bootstrap': {
        	dep: ['jquery'],
        	exports: 'Bootstrap'
        },
        'underscore': {
            exports: '_'
        }
	}
});

require(
	[
		'backbone',
		'router'
	], 
	function (Backbone, Router){
		var router = new Router();
		Backbone.history.start();
	}
);