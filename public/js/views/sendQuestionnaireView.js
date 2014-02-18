/*
define('loaderView', 
	[
	'jquery',
	'eQuestionnaire_extra',
	'underscore',
	'backbone'
	], function ($, eQuestionnaire_extra, _, Backbone) {
	
	var LoaderView = Backbone.View.extend({
		el: '#loader',
		initialize: function () {
			window.appEvents.on('loader:open', this.open, this);
			window.appEvents.on('loader:close', this.close, this);

			console.log('loaderView module loaded.');
		},
		open: function() {
			this.$el.modal({show: true, backdrop: 'static', keyboard: false});
		},
		close: function() {
			this.$el.modal('hide');
		}
	});

	return LoaderView;
});
*/