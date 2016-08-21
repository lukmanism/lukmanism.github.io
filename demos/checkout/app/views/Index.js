define(function(require){
	"use strict";
	
	require('bootstrap');
	require('jquery');
	require('backbone');



	var indexTemplate		= require('text!../tpl/index.html');

	var	users 				= require('collections/users');

	var	Menus 				= require('views/Menus');

	var thisView = Backbone.View.extend({
		el: '.page-container',
		tagName: 'div',
		className: 'form-middle center',
		template: _.template(indexTemplate),
		collection: {
			users: users,
		},
		initialize: function(){
			this.render();
			$('.header-title h3').html('MVM4 Login');
		},
		render: function(){
			this.$el.append(this.template());
			this.generateMenus();
			return this;
		},
		generateMenus: function(){
			var that = this;
			$('#navbar-header .menus-container').empty();

			var users = this.collection.users.toJSON()
			var users_len = this.collection.users.toJSON().length

			for (var i = 0; i < users_len; i++) {
				var html = new Menus({model: this.collection.users.get(users[i]['id'])});
				$('#navbar-header .menus-container').append(html.el);
			}
		}

	});

	return thisView;
})