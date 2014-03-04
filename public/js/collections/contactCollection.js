define('contactCollection', 
	[
	'backbone',
	'underscore',
	'contactModel'
	], function (Backbone, _, ContactModel) {
	

	/**
	* Contact Collection 
	* ==================
	*/
	var ContactCollection = Backbone.Collection.extend({
		url: '/api/v1/contact/',
		model: ContactModel,
		initialize: function () {
			console.log('contactCollection module loaded.');
		},
		parse: function (response, options) {
			/**
			 * parse
			 * @ovirrade - check link http://backbonejs.org/#Collection-parse
			 * function (response, options) {
			 * 		return response;
			 * }
			 * @param <Object> response { <Number> page, <Number> pages, <Object> collection }
			 * @param <Object> options
			 * @return <Object> collection
			 */
			this.page = response.page;
			this.pages = response.pages;
			this.hasPrevPage = (this.page-1) >= 0 ? true : false;
			this.hasNextPage = (this.page+1) <= (this.pages-1) ? true : false;
			return response.collection;
		},
		prevPage: function () {
			/**
			 * prevPage 
			 * New method for fetch previous records
			 */
			var data = {
				page: this.hasPrevPage ? (this.page-1) : 0
			};

			data = this.addFilters(data);
			this.fetch({ data: data, reset: true });
			return data;
		},
		nextPage: function () {
			/**
			 * nextPage
			 * New method for fetch next records
			 */
			var data = {
				page: this.hasNextPage ? (this.page+1) : 0
			};

			data = this.addFilters(data);
			this.fetch({ data: data, reset: true });
			return data;
		},
		addFilters: function (data) {
			/**
			 * addFilters
			 * New method to keep the filters to get new server records
			 * @param <Object> data
			 * @return <Object> data
			 */
			if (this.filters) _.each(this.filters, function(value, key){ 
					data[key] = value; 
				});
			
			return data;
		},
		search: function (filters, callback, context) {
			/**
			* search
			* New method to perform a search with dynamic filters and bring server records
			* @param <Object> filters
			* @param <Function> callback
			* @param <*> context
			*/
			var data = {
				page: 0
			}, self = this;

			if (typeof filters === 'object') { 
				this.filters = filters; 
				data = this.addFilters(data);
			} else {
			 	this.filters = {};
			}

			this.fetch({ 
				data: data, 
				reset: true,
				success: function () {
					if (typeof callback === 'function') callback(context);
				},
				error: function () {
					self.errorNotify('No se pudieron recuperar los contactos');
				}
			});
		},
  		errorNotify: function (message) {
  			/**
  			 * errorNotify
  			 * @param <String> message
  			 */
  			window.appEvents.trigger('notifier:show', {
				type: 'danger', 
				title: 'Ha ocurrido un error',
				message: message + ', si el problema continua comunicate con personal de atención al cliente'
			});
  		}
	});

	return ContactCollection;
});