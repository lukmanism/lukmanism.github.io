define(function (require){
	var	rule = require('models/rule');

	var Rules = Backbone.Collection.extend({
		model: rule
	});

	var thisCollections = new Rules;
	thisCollections.set([
		{
			id: 1,
			ad_id: 1,
			name: '3 for 2 deal on Classic',
			description: 'Etiam porta sem malesuada magna mollis euismod.',
			min_purchase: 3,
			increment: 3,
			new_price: 179.99, // (269.99 * 2) / 3
			created: '05/22/2015 03:54:38 PM'
		},
		{
			id: 2,
			ad_id: 2,
			name: 'Standout Ads for $299.99 each',
			description: 'Etiam porta sem malesuada magna mollis euismod.',
			min_purchase: 1,
			increment: 1,
			new_price: 299.99, 
			created: '05/22/2015 03:54:38 PM'
		},
		{
			id: 3,
			ad_id: 3,
			name: 'Premium Ads for $379.99 each',
			description: 'Etiam porta sem malesuada magna mollis euismod.',
			min_purchase: 4,
			increment: 0, // 0 means rules applicable to min_purchase or more
			new_price: 379.99,
			created: '05/22/2015 03:54:38 PM'
		},
		{
			id: 4,
			ad_id: 1,
			name: '5 for 4 deal on Classic Ad',
			description: 'Etiam porta sem malesuada magna mollis euismod.',
			min_purchase: 5,
			increment: 5, // % 5 === 0
			new_price: 215.992, // (269.99 * 4) / 5
			created: '05/22/2015 03:54:38 PM'
		},
		{
			id: 5,
			ad_id: 2,
			name: 'Standout Ad for $309.99 each',
			description: 'Etiam porta sem malesuada magna mollis euismod.',
			min_purchase: 1,
			increment: 0,
			new_price: 309.99,
			created: '05/22/2015 03:54:38 PM'
		},
		{
			id: 6,
			ad_id: 3,
			name: 'Premium Ad for $389.99 each',
			description: 'Etiam porta sem malesuada magna mollis euismod.',
			min_purchase: 3,
			increment: 0, // 0 means rules applicable to min_purchase or more
			new_price: 389.99,
			created: '05/22/2015 03:54:38 PM'
		}
	]);

	return thisCollections;
});