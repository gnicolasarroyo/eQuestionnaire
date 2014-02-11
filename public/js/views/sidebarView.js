define('sidebarView', 
	[
	'jquery',
	'underscore',
	'backbone',
	'text!templates/sidebar_tpl.html'
	], function ($, _, Backbone, sidebarTpl) {
	
	
	/**
	* Sidebar View
	* ============
	*/
	var SidebarView = Backbone.View.extend({
		el: '#sidebar',
		template: _.template(sidebarTpl),
		initialize: function () {
			console.log('sidebarView module loaded.');
		},
		render: function (active) {
			var title = this.collection[0].title.toLowerCase(); 
			$('h2#header_title').html(title.charAt(0).toUpperCase() + title.slice(1));
			this.$el.html(this.template({collection: this.collection, active: active}));
			return this;
		}
	});

	return SidebarView;
});