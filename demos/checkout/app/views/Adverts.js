define(function(require){
	"use strict";
	
	require('backbone');

	var advertsTemplate		= require('text!../tpl/adverts.html');

	var thisView = Backbone.View.extend({
		tagName: 'div',
		className: 'col-xs-12 col-md-4 col-lg-4 advert',
		template: _.template(advertsTemplate),
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