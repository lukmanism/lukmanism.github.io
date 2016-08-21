define([
		'../../../../app/collections/users.js',
		'../../../../app/collections/clients.js',
		'../../../../app/collections/adverts.js',
		'../../../../app/collections/rules.js',
	], function (users, clients, adverts, rules){

	describe('Default: ', function () {

		beforeEach(function(){
			this.user 			= users.get(1);
			this.client 		= clients.get(this.user.get('client_id'));
			this.setrules 		= this.client.get('rules_id');
			this.customeTest 	= function(purchased, ad_id, each){
				this.advert 	= adverts.get(ad_id);
				var old_price 	= this.advert.get('price'),
					rules_len 	= this.setrules.length;
				var reset = false;
				for (var i = 0; i < rules_len; i++) {
					var get_rules = rules.get(this.setrules[i]);
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
			}
		});

		it('Purchase 1 Classic Ad for $269.99', function () {
			expect(this.customeTest(1, 1)).toEqual(269.99);
			expect(users).toBeDefined();
		});
		it('Purchase 1 Standout Ad for $322.99', function () {
			expect(this.customeTest(1, 2)).toEqual(322.99);
			expect(users).toBeDefined();
		});
		it('Purchase 1 Premium Ad for $394.99', function () {
			expect(this.customeTest(1, 3)).toEqual(394.99);
			expect(users).toBeDefined();
		});
		it('Purchase each Classic, Standout & Premium Ad for $987.97', function () {
			var total = this.customeTest(1, 1) + this.customeTest(1, 2) + this.customeTest(1, 3);
			expect(total).toBeDefined(987.97);
		});
  	});

	describe('Unilever: ', function () {

		beforeEach(function(){
			this.user 			= users.get(2);
			this.client 		= clients.get(this.user.get('client_id'));
			this.setrules 		= this.client.get('rules_id');
			this.customeTest 	= function(purchased, ad_id, each){
				this.advert 	= adverts.get(ad_id);
				var old_price 	= this.advert.get('price'),
					rules_len 	= this.setrules.length;
				var reset = false;
				for (var i = 0; i < rules_len; i++) {
					var get_rules = rules.get(this.setrules[i]);
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
			}
		});

		it('Purchase 1 Classic Ad for $269.99', function () {
			expect(this.customeTest(1, 1)).toEqual(269.99);
		});
		it('Purchase 1 Standout Ad for $322.99', function () {
			expect(this.customeTest(1, 2)).toEqual(322.99);
		});
		it('Purchase 1 Premium Ad for $394.99', function () {
			expect(this.customeTest(1, 3)).toEqual(394.99);
		});
		it('*Purchase 3 Classic & one Premium Ad for $934.97', function () {
			var total = this.customeTest(3, 1) + this.customeTest(1, 3);
			expect(total).toBeDefined(934.97);
		});
  	});

	describe('Apple: ', function () {

		beforeEach(function(){
			this.user 			= users.get(3);
			this.client 		= clients.get(this.user.get('client_id'));
			this.setrules 		= this.client.get('rules_id');
			this.customeTest 	= function(purchased, ad_id, each){
				this.advert 	= adverts.get(ad_id);
				var old_price 	= this.advert.get('price'),
					rules_len 	= this.setrules.length;
				var reset = false;
				for (var i = 0; i < rules_len; i++) {
					var get_rules = rules.get(this.setrules[i]);
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
			}
		});
		
		it('Purchase 1 Classic Ad for $269.99', function () {
			expect(this.customeTest(1, 1)).toEqual(269.99);
		});
		it('Purchase 1 Standout Ad for $299.99', function () {
			expect(this.customeTest(1, 2)).toEqual(299.99);
		});
		it('Purchase 1 Premium Ad for $394.99', function () {
			expect(this.customeTest(1, 3)).toEqual(394.99);
		});
		it('*Purchase 3 Standout & one Premium Ad for $1294.96', function () {
			var total = this.customeTest(3, 2) + this.customeTest(1, 3);
			expect(total).toBeDefined(1294.96);
		});
  	});

	describe('Nike: ', function () {

		beforeEach(function(){
			this.user 			= users.get(4);
			this.client 		= clients.get(this.user.get('client_id'));
			this.setrules 		= this.client.get('rules_id');
			this.customeTest 	= function(purchased, ad_id, each){
				this.advert 	= adverts.get(ad_id);
				var old_price 	= this.advert.get('price'),
					rules_len 	= this.setrules.length;
				var reset = false;
				for (var i = 0; i < rules_len; i++) {
					var get_rules = rules.get(this.setrules[i]);
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
			}
		});

		it('Purchase 1 Classic Ad for $269.99', function () {
			expect(this.customeTest(1, 1)).toEqual(269.99);
		});
		it('Purchase 1 Standout Ad for $322.99', function () {
			expect(this.customeTest(1, 2)).toEqual(322.99);
		});
		it('Purchase 1 Premium Ad for $394.99', function () {
			expect(this.customeTest(1, 3)).toEqual(394.99);
		});
		it('*Purchase 4 Premium Ad for $379.99', function () {
			expect(this.customeTest(4, 3, true)).toEqual(379.99);
		});
  	});

	describe('Ford: ', function () {

		beforeEach(function(){
			this.user 			= users.get(5);
			this.client 		= clients.get(this.user.get('client_id'));
			this.setrules 		= this.client.get('rules_id');
			this.customeTest 	= function(purchased, ad_id, each){
				this.advert 	= adverts.get(ad_id);
				var old_price 	= this.advert.get('price'),
					rules_len 	= this.setrules.length;
				var reset = false;
				for (var i = 0; i < rules_len; i++) {
					var get_rules = rules.get(this.setrules[i]);
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
			}
		});

		it('Purchase 1 Classic Ad for $269.99', function () {
			expect(this.customeTest(1, 1)).toEqual(269.99);
		});
		it('*Purchase 1 Standout Ad for $309.99', function () {
			expect(this.customeTest(1, 2)).toEqual(309.99);
		});
		it('*Purchase 5 Standout Ad for $1549.95', function () {
			expect(this.customeTest(5, 2)).toEqual(1549.95);
		});
		it('Purchase 1 Premium Ad for $394.99', function () {
			expect(this.customeTest(1, 3)).toEqual(394.99);
		});
		it('Purchase 5 Classic Ads for $1079.96', function () {
			expect(this.customeTest(5, 1)).toEqual(1079.96);
		});
		it('Purchase 7 Classic Ads for $1619.94', function () {
			expect(this.customeTest(7, 1)).toEqual(1619.94);
		});
		it('*Purchase minimum 3 Premium Ads for $389.99 each', function () {
			expect(this.customeTest(3, 3, true)).toEqual(389.99);
		});
  	});

});


