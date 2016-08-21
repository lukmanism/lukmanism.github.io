define(function (require){
	var	client = require('models/client');

	var Clients = Backbone.Collection.extend({
		model: client
	});

	var thisCollections = new Clients;
	thisCollections.set([
		{
			id: 1,
			name: 'Default',
			description: 'Etiam porta sem malesuada magna mollis euismod.',
			rules_id: [],
			created: '05/22/2015 03:54:38 PM'
		},
		{
			id: 2,
			name: 'Unilever',
			description: 'Etiam porta sem malesuada magna mollis euismod.',
			rules_id: [1],
			created: '05/22/2015 03:54:38 PM'
		},
		{
			id: 3,
			name: 'Apple',
			description: 'Etiam porta sem malesuada magna mollis euismod.',
			rules_id: [2],
			created: '05/22/2015 03:54:38 PM'
		},
		{
			id: 4,
			name: 'Nike',
			description: 'Etiam porta sem malesuada magna mollis euismod.',
			rules_id: [3],
			created: '05/22/2015 03:54:38 PM'
		},
		{
			id: 5,
			name: 'Ford',
			description: 'Etiam porta sem malesuada magna mollis euismod.',
			rules_id: [4, 5, 6],
			created: '05/22/2015 03:54:38 PM'
		}
	]);

	return thisCollections;
});