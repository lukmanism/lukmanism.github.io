define(function (require){
	var Backbone = require('backbone');

	return Backbone.Model.extend({
    	defaults: {
			name: '',
			description: '',
			code: '',
			// expiry_date: '',
			// validity: 1,
			created: ''
		}
	});
});