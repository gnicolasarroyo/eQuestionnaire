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