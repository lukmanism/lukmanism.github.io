define(function(require){
	'use strict';

    var page 			= $('.container .body'), 
        currView;

	var routers =  Backbone.Router.extend({
		routes: {
			''			:'getIndex', // default page is index page
			'users/:id'	:'getUsers',
		},
		getIndex: function(param){
			this.getView(require('views/Index'), page);
		},
		getUsers: function(param){
			// this.id  = param;
			this.getView(require('views/Users'), page, param);
		},
		getView: function(thatView, target, id){
			if (currView) { // remove zombie view method
			    currView.remove();
			    target.empty();
			}


			currView = new thatView();
			currView.id = (typeof id === 'undefined')? 0: parseInt(id);
			currView.$el.appendTo(target);
		}
	});

	return routers;
})