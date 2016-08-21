define(function(require){
	"use strict";
	
	require('backbone');

	var checkoutTemplate		= require('text!../tpl/checkout.html');

	var thisView = Backbone.View.extend({
		tagName: 'div',
		className: '',
		template: _.template(checkoutTemplate),
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