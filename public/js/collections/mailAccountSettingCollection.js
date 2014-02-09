define('mailAccountSettingCollection', 
	[
	'backbone', 
	'mailAccountSettingModel'
	], function (Backbone, MailAccountSettingModel) {
	

	/**
	* Mail Account Setting Collection
	* ===============================
	*/
	var MailAccountSettingCollection = Backbone.Collection.extend({
		url: '/api/v1/mailaccountsetting/',
		model: MailAccountSettingModel,
		initialize: function () {
			console.log('mailAccountSettingCollection module loaded.');
		}
	});

	return MailAccountSettingCollection;
});