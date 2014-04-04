define('notifierView', 
	[
	'jquery',
	'backbone',
	'text!templates/notifier_tpl.html'
	], function ($, Backbone, NotifierTpl) {
	
	
	/**
	* Loader View
	* ============
	*/
	var NotifierView = Backbone.View.extend({
		el: '#notifier',
		template: _.template(NotifierTpl),
		initialize: function () {
			console.log('notifierView module loaded.');
		},
		show: function(data) {
			this.$el.html(this.template({alert: data}));
			this.$el.fadeIn('slow');
			var that = this;
			setTimeout(function () {
				that.$el.fadeOut('slow');
			}, 6000);
		}
	});

	return NotifierView;
});