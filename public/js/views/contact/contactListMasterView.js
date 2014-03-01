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
  		id: 'master-view',
      className: 'animate fadeIn',
  		initialize: function () {
  			/**
  			 * initialize
  			 */
            this.views = [];
            this.collection.search({}, function (self) {
                //window.appEvents.trigger('loader:show');
                self.createView(SearchView);
                self.createView(ListView);
                self.render();
                //window.appEvents.trigger('loader:hide');
                self.listenTo(self.collection, "reset", self.render);
            }, this);
  		},
  		render: function () {
  			/**
  			 * render
  			 */
             window.appEvents.trigger('loader:hide');
  			_.each(this.views, function (view) {
  				this.$el.append(view.render().el);
  			}, this);
            window.appEvents.trigger('loader:hide');
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