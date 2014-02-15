/**
 * Load Dependencies
 * =================
 */

var MailAccountSettingModel = require('../models/mailaccountsetting').model();


/*
 * GET /api/v1/mailaccountsetting
 */
exports.list = function(req, res){
	
	if (req.session.group) {
		MailAccountSettingModel.find({group: req.session.group}, '_id title description host port user', function (err, mail_account_settings) {
			if (err) res.send(404, {});
			else res.send(mail_account_settings);
		});
	} else {
		res.send(401, {});
	}

};


/*
 * GET /api/v1/mailaccountsetting/:id
 * param {String} id
 */
exports.detail = function(req, res){
	
	if (req.session.group) {
		MailAccountSettingModel.findOne({_id: req.params.id, group: req.session.group}, '_id title description host port user', function (err, mail_account_setting) {
			if (err) res.send(404, {});
			else res.send(mail_account_setting);
		});
	} else {
		res.send(401, {});
	}

};


/*
 * POST /api/v1/mailaccountsetting
 */
exports.new = function(req, res){
	
	if (req.session.group) {
		var mail_account_setting = new MailAccountSettingModel();
		if (req.body.title) mail_account_setting.title = req.body.title;
		if (req.body.description) mail_account_setting.description = req.body.description;
		if (req.body.host) mail_account_setting.host = req.body.host;
		if (req.body.port) mail_account_setting.port = req.body.port;
		if (req.body.user) mail_account_setting.user = req.body.user;
		mail_account_setting.group = req.session.group;
		mail_account_setting.save(function (err) {
			if (err) res.send(500, {});
			else res.json({ _id: mail_account_setting._id, title: mail_account_setting.title, description: mail_account_setting.description, host: mail_account_setting.host, port: mail_account_setting.port, user: mail_account_setting.user });
		});
	} else {
		res.send(401, {});
	}

};


/*
 * PUT /api/v1/mailaccountsetting/:id
 * param {String} id
 */
exports.edit = function(req, res){
	
	if (req.session.group) {
		MailAccountSettingModel.findOne({_id: req.params.id, group: req.session.group},function (err, mail_account_setting) {
			if (err) {
				res.send(404, {});
			} else {
				if (req.body.title) mail_account_setting.title = req.body.title;
				if (req.body.description) mail_account_setting.description = req.body.description;
				if (req.body.host) mail_account_setting.host = req.body.host;
				if (req.body.port) mail_account_setting.port = req.body.port;
				if (req.body.user) mail_account_setting.user = req.body.user;
				mail_account_setting.save(function (err) {
					if (err) res.send(500, {});
					else res.json({ _id: mail_account_setting._id, title: mail_account_setting.title, description: mail_account_setting.description, host: mail_account_setting.host, port: mail_account_setting.port, user: mail_account_setting.user });
				});
			}
		});
	} else {
		res.send(401, {});
	}

};


/*
 * DELETE /api/v1/mailaccountsetting/:id
 * param {String} id
 */
exports.delete = function(req, res){
  
  if (req.session.group) {
		MailAccountSettingModel.findOne({_id: req.params.id, group: req.session.group},function (err, mail_account_setting) {
			if (err) {
				res.send(404, {});
			} else {
				mail_account_setting.remove(function (err) {
					if (err) res.send(500, {});
					else res.send(200, {});
				});
			}
		});
	} else {
		res.send(401, {});
	}

};