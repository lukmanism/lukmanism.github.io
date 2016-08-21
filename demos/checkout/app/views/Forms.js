define(function(require){
	"use strict";
	
	require('backbone');

	var formsTemplate		= require('text!../tpl/forms.html');

	var thisView = Backbone.View.extend({
		tagName: 'div',
		className: 'col-xs-4 col-md-3 col-lg-4 checkout-advert',
		template: _.template(formsTemplate),
		initialize: function(){
			this.render();
		},
		render: function(){
			var el = this.$el;
			el.append(this.template())
				.attr('data-ad_id', this.model.get('id'))
				.attr('data-name', this.model.get('alias'));
			setTimeout(function(){
				$('.box-button', el).removeClass('highlight');
			}, 500);
			return this;
		}
	});

	return thisView;
})