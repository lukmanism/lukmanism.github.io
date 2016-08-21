define(function (require){
	var	user = require('models/user');

	var Users = Backbone.Collection.extend({
		model: user
	});

	var thisCollections = new Users;
	thisCollections.set([{
			id: 1,
			username: 'user_default',
			name: 'Default',
			email: 'user_default@email.com',
			client_id: 1,
			avatar: 'profile.jpg',
			created: '05/22/2015 03:54:38 PM'
		},
		{
			id: 2,
			username: 'user_unilever',
			name: 'Unilever',
			email: 'user_unilever@email.com',
			client_id: 2,
			avatar: 'profile.jpg',
			created: '05/22/2015 03:54:38 PM'
		},
		{
			id: 3,
			username: 'user_apple',
			name: 'Apple',
			email: 'user_apple@email.com',
			client_id: 3,
			avatar: 'profile.jpg',
			created: '05/22/2015 03:54:38 PM'
		},
		{
			id: 4,
			username: 'user_nike',
			name: 'Nike',
			email: 'user_nike@email.com',
			client_id: 4,
			avatar: 'profile.jpg',
			created: '05/22/2015 03:54:38 PM'
		},
		{
			id: 5,
			username: 'user_ford',
			name: 'Ford',
			email: 'user_ford@email.com',
			client_id: 5,
			avatar: 'profile.jpg',
			created: '05/22/2015 03:54:38 PM'
		}]
	);

	return thisCollections;
});