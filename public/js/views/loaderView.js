define('loaderView', 
	[
	'jquery',
	'backbone'
	], function ($, Backbone) {
	
	
	/**
	* Loader View
	* ============
	*/
	var LoaderView = Backbone.View.extend({
		el: '#loader',
		initialize: function () {
			window.appEvents.on('loader:show', this.show, this);
			window.appEvents.on('loader:hide', this.hide, this);

			window.appEvents.trigger('loader:hide');
			console.log('loaderView module loaded.');
		},
		show: function() {
			this.$el.fadeIn('slow');
		},
		hide: function() {
			this.$el.fadeOut('slow');
		}
	});

	return LoaderView;
});