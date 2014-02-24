define("contactListMasterView", 
	[
	"jquery", 
	"underscore", 
	"backbone",
	"contactSearchView",
	"contactListView"
	],  
    function($, _, Backbone, SearchView, ListView){  
  
 	
 	/**
  	 * Contact List Master View
  	 */ 
  	var ContactListMasterView = Backbone.View.extend({
  		el: '#content',
  		initialize: function () {
  			/**
  			 * initialize
  			 */
  			this.views = [];
            this.collection.search({}, function (self) {
                self.createView(SearchView);
                self.createView(ListView);
                self.render();
            }, this);
  			
            this.listenTo(this.collection, "change", this.render);
            this.listenTo(this.collection, "add", this.render);
            this.listenTo(this.collection, "remove", this.render);
            this.listenTo(this.collection, "reset", this.render);
  		},
  		render: function () {
  			/**
  			 * render
  			 */
  			_.each(this.views, function (view) {
  				this.$el.append(view.render().el);
  			}, this);
  		},
  		createView: function (view) {
  			/**
  			 * createView
  			 * @param <Object> view
  			 */
  			this.views.push(new view({ collection: this.collection }));
  		},
  		remove: function () {
  			/**
  			 * remove
  			 */
  			_.each(this.views, function (view) {
  				view.remove();
  			});
  			//this.$el.remove();
            this.$el.html('');
			return this;
  		}
  	});

  	/**
  	 * @return Contact List Master View
  	 */ 
  	return ContactListMasterView;

});