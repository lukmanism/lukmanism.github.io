define(function (require){
	var	client = require('models/client');

	var Clients = Backbone.Collection.extend({
		model: client
	});

	var thisCollections = new Clients;
	thisCollections.set([
		{
			id: 1,
			name: '$20 Off',
			description: 'Etiam porta sem malesuada magna mollis euismod.',
			code: 'AAA20',
			value: 20,
			created: '05/22/2015 03:54:38 PM'
		},
		{
			id: 2,
			name: '50% Seasonal Off',
			description: 'Etiam porta sem malesuada magna mollis euismod.',
			code: 'SS50',
			value: '50%',
			created: '05/22/2015 03:54:38 PM'
		},
		{
			id: 3,
			name: 'Special Discount $50',
			description: 'Etiam porta sem malesuada magna mollis euismod.',
			code: 'SP50',
			value: 50,
			created: '05/22/2015 03:54:38 PM'
		}
	]);

	return thisCollections;
});