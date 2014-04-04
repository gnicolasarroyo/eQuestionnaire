define("contactListMasterView", 
	[
	"jquery", 
	"underscore", 
	"backbone",
	"contactSearchView",
	"contactListView",
    "contactCollection",
	],  
    function($, _, Backbone, SearchView, ListView, ContactCollection){  
  
 	
 	/**
  	 * Contact List Master View
  	 */ 
  	var ContactListMasterView = Backbone.View.extend({
  		id: 'master-view',
        collection: new ContactCollection(),
  		initialize: function () {
  			/**
  			 * initialize
  			 */
            this.views = [];
            this.collection.search({}, function (self) {
                self.createView(SearchView);
                self.createView(ListView);
                self.render();
                self.listenTo(self.collection, "reset", self.render);
            }, this);
  		},
  		render: function () {
  			/**
  			 * render
  			 */
  			_.each(this.views, function (view) {
  				this.$el.append(view.render().el);
  			}, this);
            return this;    
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
            this.$el.remove();
            this.stopListening();
			return this;
  		}
  	});

  	/**
  	 * @return Contact List Master View
  	 */ 
  	return ContactListMasterView;

});