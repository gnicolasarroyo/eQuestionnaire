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
		
		/**
		 * conditions
		 * Prepare the conditions for the find method
		 * @return <Object> obj
		 */
		function conditions () {
			var obj = {};
			
			obj.group = req.session.group;
			
			if (req.query.name && req.query.email) {
				obj.$or = [
					{ name: new RegExp(req.query.name.trim(),'i') },
					{ email: new RegExp(req.query.email.trim(),'i') }
				]; 
			}

			return obj;
		};

		
		/**
		 * options
		 * Prepare the options for the find method
		 * @return <Object> obj
		 */
		function options () {
			var obj = {}, page, perPage;

			obj.sort = {name: 'asc'};
			
			if (req.query.page) {
				perPage = 5;
				page = req.query.page > 0 ? req.query.page : 0;
			
				obj.limit = perPage;
    			obj.skip = (perPage * page);
			}

    		return obj;
		};

		
		ContactModel.find(conditions(), '_id name email', options(), function (err, contacts) {
			/**
			 * find
			 * @param <Object> conditions
			 * @param <Object> fields
			 * @param <Object> options
			 * @return <Object> {} || contacts
			 */
			if (err) res.send(404, {});
			else ContactModel.count(conditions()).exec(function (err, count) {
					/**
					 * count
					 * @return <Number> count
					 */
					if (err) res.send(404, {});
		        	else res.send({
		        		collection: contacts, 
		        		page: (req.query.page && req.query.page > 0) ? parseInt(req.query.page) : 0, 
		        		pages: ((Math.floor(count / 5)) + ((count % 5) > 0 ? 1 : 0)) 
		        	});
		      	});
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