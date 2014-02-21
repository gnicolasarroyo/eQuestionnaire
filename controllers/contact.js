/**
 * Load Dependencies
 * =================
 */

var ContactModel = require('../models/contact').model();


/*
 * GET /api/v1/contact
 */
exports.list = function(req, res){

	if (req.session.group) {
		var conditions = function () {
			var temp = {};

			temp.group = req.session.group;
			
			var r = function (string) {
				return new RegExp(string.trim(),'i');
			};

			if (req.query.name && req.query.email) {
				temp.$or = [
					{ name: r(req.query.name) },
					{ email: r(req.query.email) }
				]; 
			}

			return temp;
		};

		ContactModel.find(conditions(), '_id name email', { sort: {name: 'asc'} }, function (err, contacts) {
			if (err) res.send(404, {});
			else res.send(contacts);
		});
	} else {
		res.send(401, {});
	}

};


/*
 * GET /api/v1/contact/:id
 * param {String} id
 */
exports.detail = function(req, res){
	
	if (req.session.group) {
		ContactModel.findOne({_id: req.params.id, group: req.session.group}, '_id name email', function (err, contact) {
			if (err) res.send(404, {});
			else res.send(contact);
		});
	} else {
		res.send(401, {});
	}

};


/*
 * POST /api/v1/contact
 */
exports.new = function(req, res){
	
	if (req.session.group) {
		var contact = new ContactModel();
		if (req.body.name) contact.name = req.body.name;
		if (req.body.email) contact.email = req.body.email;
		contact.group = req.session.group;
		contact.save(function (err) {
			if (err) res.send(500, {});
			else res.json({_id: contact._id, name: contact.name, email: contact.email});
		});
	} else {
		res.send(401, {});
	}

};


/*
 * PUT /api/v1/contact/:id
 * param {String} id
 */
exports.edit = function(req, res){
	
	if (req.session.group) {
		ContactModel.findOne({_id: req.params.id, group: req.session.group},function (err, contact) {
			if (err) {
				res.send(404, {});
			} else {
				if (req.body.name) contact.name = req.body.name;
				if (req.body.email) contact.email = req.body.email;
				contact.save(function (err) {
					if (err) res.send(500, {});
					else res.json({_id: contact._id, name: contact.name, email: contact.email});
				});
			}
		});
	} else {
		res.send(401, {});
	}

};


/*
 * DELETE /api/v1/contact/:id
 * param {String} id
 */
exports.delete = function(req, res){
  
  if (req.session.group) {
		ContactModel.findOne({_id: req.params.id, group: req.session.group},function (err, contact) {
			if (err) {
				res.send(404, {});
			} else {
				contact.remove(function (err) {
					if (err) res.send(500, {});
					else res.send(200, {});
				});
			}
		});
	} else {
		res.send(401, {});
	}

};