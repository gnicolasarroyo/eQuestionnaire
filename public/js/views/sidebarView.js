define('sidebarView', 
	[
	'jquery',
	'underscore',
	'backbone',
	'text!templates/sidebar_tpl.html'
	], function ($, _, Backbone, SidebarTpl) {
	
	
	/**
	* Sidebar View
	* ============
	*/
	var SidebarView = Backbone.View.extend({
		el: '#sidebar',
		template: _.template(SidebarTpl),
		initialize: function () {
			window.appEvents.on('sidebar:render', this.render, this);

			console.log('sidebarView module loaded.');
		},
		render: function (data) {
			var title = data.collection[0].title.toLowerCase();
			this.$el.html(this.template({collection: data.collection, active: data.active, header_title: title.charAt(0).toUpperCase() + title.slice(1)}));
			return this;
		}
	});

	return SidebarView;
});