define(function (require){
	var Backbone = require('backbone');

	return Backbone.Model.extend({
    	defaults: {
			name: '',
			description: '',
			min_purchase: 0,
			increment: 0, // 0 means rules applicable to min_purchase or more
			new_price: 0,
			created: ''
		}
	});
});