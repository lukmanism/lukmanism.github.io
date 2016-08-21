define(function(require){
	"use strict";
	
	require('bootstrap');
	require('jquery');
	require('backbone');



	var usersTemplate		= require('text!../tpl/users.html');


	var	users 				= require('collections/users');
	var	rules 				= require('collections/rules');
	var	coupons 			= require('collections/coupons');
	var	clients 			= require('collections/clients');
	var	adverts 			= require('collections/adverts');


	var	Adverts 			= require('views/Adverts');
	var	Forms 				= require('views/Forms');
	var	Menus 				= require('views/Menus');
	var	Checkouts 			= require('views/Checkouts');

	var thisView = Backbone.View.extend({
		tagName: 'div',
		className: 'users test',
		template: _.template(usersTemplate),
		collection: {
			users: users,
			rules: rules,
			coupons: coupons,
			clients: clients,
			adverts: adverts,
			extract: new Backbone.Model()
		},
		initialize: function(){
			var that = this;
			var id = (typeof this.id === 'undefined')? 1: this.id; 
			setTimeout(function(){
				var user = that.collection.users.get(id);
				var client = that.collection.clients.get(user.get('client_id'));
				var user_rules = _.filter(that.collection.rules.toJSON(), function(rule){
						return (client.get('rules_id').indexOf(rule.id) !== -1)? rule: false;
				});

				that.render();
			}, 1);
		},
		render: function(){
			this.$el.append(this.template(this.collection));
			this.generateAdverts();
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

			var user = that.collection.users.get(this.id)
			$('.insert_name').html('Welcome user '+ user.get('name') +'!');
		},
		generateAdverts: function(){
			var adverts = this.collection.adverts.toJSON()
			var adverts_len = this.collection.adverts.toJSON().length

			for (var i = 0; i < adverts_len; i++) {
				var html = new Adverts({model: this.collection.adverts.get(adverts[i]['id'])});
				$('.select-ad').append(html.el);
			}

			var that = this;
			$('.add', this.$el).off().on('click', function(e){
				e.preventDefault();
				if($('.checkout-forms').length === 0)
					that.generateCheckout();
				that.add(this);
			});
		},
		generateForm: function(ad_id){
			var html = new Forms({model: this.collection.adverts.get(ad_id)});
			$('.complete-tobe-ad', this.$el).append(html.el);


			var that = this;
			$('.remove', this.$el).off().on('click', function(e){
				e.preventDefault();
				that.remove(this);
			});
		},
		generateCheckout: function(){
			var html = new Checkouts();
			$('.checkout-container', this.$el).append(html.el);

			var coupons = this.collection.coupons;
			var that = this;

			$('.coupon').on('change', function(){
				var test = _.findWhere(coupons.toJSON(), {code: $(this).val()});

				$(this).removeClass('red').removeClass('green');

				if(typeof test !== 'undefined'){
					$(this).addClass('green');
					that.addCoupon(test);
				} else {
					$(this).addClass('red');
				}
			})
		},
		addCoupon: function(coupon){
			var tr = $('.table-checkout tbody tr').last();
			var extract = this.collection.extract.toJSON();
			var extract_len = extract.length;
			var total_disc = 0;

			for(var k in extract){
				var key = parseInt(k);
				var test2 = this.calculate(extract[key], key)
				total_disc = total_disc + (test2);

			}

			if(typeof coupon.value === 'string'){
				total_disc = total_disc * coupon.value;
			} else {
				total_disc = total_disc - coupon.value;
			}

			$('.total_disc', $(tr)).html('$' + total_disc.toFixed(2));
			$('td', $(tr)).first().html('Your New Total:');

			$('.table-checkout tbody tr').append($(tr));
		},
		add: function(e){
			this.generateForm($(e).data('ad_id'));
			$('.complete-tobe-ad', this.$el);
			this.updateTotal();

		},
		calculate: function(purchased, ad_id, each){
			var id 			= (typeof this.id === 'undefined')? 1: this.id; 
			var user 		= this.collection.users.get(this.id);
			var client 		= this.collection.clients.get(user.get('client_id'));
			var setrules 	= client.get('rules_id');

			var advert 		= this.collection.adverts.get(ad_id);
			var old_price 	= advert.get('price'),
				rules_len 	= setrules.length;
			var reset = false;
			for (var i = 0; i < rules_len; i++) {
				var get_rules = rules.get(setrules[i]);
				if(typeof get_rules !== 'undefined' && get_rules.get('ad_id') === ad_id){
					var increment = get_rules.get('increment'),
						min_purchase = get_rules.get('min_purchase');
						if(min_purchase > purchased){
							this.test = old_price * purchased;
						} else {
							if(increment === 0){
								this.test = get_rules.get('new_price') * purchased;
							} else {
								if(purchased % increment === 0){
									this.test = get_rules.get('new_price') * purchased;
								} else {
									var total_increment = purchased / increment;
									if(total_increment > 1){
										var increment2 = Math.floor(total_increment) * increment,
											increment3 = purchased % increment;
										this.test = (get_rules.get('new_price') * increment2) + (old_price * increment3);
									} else {
										this.test = old_price * purchased;
									}
								}
							}
						}
					reset = true;
				} else if(reset === false){
					this.test = old_price * purchased;
				}
			}

			if(reset === false){
				this.test = old_price * purchased;
			}
			return (each)? this.test/ purchased : this.test;
		},
		remove: function(e){
			$(e).parents('.checkout-advert').remove();
			this.updateTotal();
		},
		updateTotal: function(remove){
			var advert_count = _.map($('.complete-tobe-ad .checkout-advert', this.$el), function(el){
				return $(el).data('ad_id');
			});
			var total 	= 0, total_disc = 0, temp = [];
			var adverts = this.collection.adverts.toJSON();
			var adverts_len = adverts.length;

			for (var i = adverts_len - 1; i >= 0; i--) {
				var v 	= adverts[i]
				var id 	= v.id;

				if(typeof temp[id] === 'undefined')
					temp[id] = 0;

				var test = _.filter(advert_count, function(num){return num === id;});
				total = total + (test.length * v.price);
				temp[id] = test.length;


				var test2 = this.calculate(test.length, id)
				total_disc = total_disc + (test2);


				$('.table .'+ v.alias +'-advert .number_of_ad', this.$el).html(test.length);
				$('.table .'+ v.alias +'-advert .total_price', this.$el).html((test.length * v.price).toFixed(2));
				$('.table .'+ v.alias +'-advert .total_price_disc', this.$el).html((test2).toFixed(2));

			}
			$('.table .total_number_of_ad', this.$el).html(advert_count.length);
			$('.table .total span', this.$el).html(total.toFixed(2));
			$('.table .total_disc span', this.$el).html(total_disc.toFixed(2));

			this.collection.extract.set(temp);
		}
	});

	return thisView;
})