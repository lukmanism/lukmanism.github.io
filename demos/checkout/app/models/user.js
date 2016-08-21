define(function (require){
	var Backbone = require('backbone');

	return Backbone.Model.extend({
    	defaults: {
			username: '',
			name: '',
			email: '',
			client_id: 0,
			created: ''
		}
	});
});