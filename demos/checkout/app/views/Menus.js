define(function(require){
	"use strict";
	
	require('backbone');

	var menusTemplate		= require('text!../tpl/menus.html');

	var thisView = Backbone.View.extend({
		tagName: 'li',
		className: 'menus',
		template: _.template(menusTemplate),
		initialize: function(){
			this.render();
		},
		render: function(){
			this.$el.append(this.template());
			return this;
		}
	});

	return thisView;
})