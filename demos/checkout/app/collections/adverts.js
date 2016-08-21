define(function (require){
	var	ad = require('models/advert');

	var Ads = Backbone.Collection.extend({
		model: ad
	});

	var thisCollections = new Ads;
	thisCollections.set([
		{
			id: 1,
			alias: 'classic',
			name: 'Classic Ad',
			description: 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.',
			price: 269.99,
			formspec: [
				{name: 'title', label: 'Title', value: '', data_type: 'string', type: 'text', class_name: 'modal-field'},
				{name: 'description', label: 'Description', value: '', data_type: 'string', type: 'textarea', class_name: 'modal-field', maxlength: 240, rows: 7},
			],
			created: '05/22/2015 03:54:38 PM'
		},
		{
			id: 2,
			alias: 'standout',
			name: 'Standout Ad',
			description: 'Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.',
			price: 322.99,
			formspec: [
				{name: 'title', label: 'Title', value: '', data_type: 'string', type: 'text', class_name: 'modal-field'},
				{name: 'description', label: 'Description', value: '', data_type: 'string', type: 'textarea', class_name: 'modal-field', maxlength: 800, rows: 20},
				{name: 'display_logo', label: 'Display Logo', value: '', data_type: 'boolean', type: 'checkbox', class_name: 'modal-field'},
			],
			created: '05/22/2015 03:54:38 PM'
		},
		{
			id: 3,
			alias: 'premium',
			name: 'Premium Ad',
			description: 'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
			price: 394.99,
			formspec: [
				{name: 'title', label: 'Title', value: '', data_type: 'string', type: 'text', class_name: 'modal-field'},
				{name: 'description', label: 'Description', value: '', data_type: 'string', type: 'textarea', class_name: 'modal-field', maxlength: 800, rows: 20},
				{name: 'display_logo', label: 'Display Company Logo', value: '', data_type: 'boolean', type: 'checkbox', class_name: 'modal-field'},
			],
			created: '05/22/2015 03:54:38 PM'
		}
	]);

	return thisCollections;
});