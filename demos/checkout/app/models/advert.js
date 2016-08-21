define(function (require){
	var Backbone = require('backbone');

	return Backbone.Model.extend({
    	defaults: {
			name: '',
			alias: '',
			description: '',
			price: 0,
			created: ''
		}
	});
});