/**
 * Load Dependencies
 * =================
 */

var ContactListModel = require('../models/contactlist').model();


/*
 * GET /api/v1/contactlist
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
			
			if (req.query.name) {
				obj.$or = [
					{ name: new RegExp(req.query.name.trim(),'i') }
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


		ContactListModel.find(conditions(), '_id name contacts', options()).populate({path: 'contacts', select: '_id name email'}).exec(function (err, contact_lists) {
			/**
			 * find
			 * @param <Object> conditions
			 * @param <Object> fields
			 * @param <Object> options
			 * @return <Object> {} || contact_lists
			 */
			if (err) res.send(404, {});
			else ContactListModel.count(conditions()).exec(function (err, count) {
				/**
				 * count
				 * @return <Number> count
				 */
				if (err) res.send(404, {});
	        	else res.send({
	        		collection: contact_lists, 
	        		page: (req.query.page && req.query.page > 0) ? parseInt(req.query.page) : 0, 
	        		pages: ((Math.floor(count / 5)) + ((count % 5) > 0 ? 1 : 0)) 
	        	});
	      	});
			//else res.send(contact_lists);
		});
	} else {
		res.send(401, {});
	}
	
};


/*
 * GET /api/v1/contactlist/:id
 * param {String} id
 */
exports.detail = function(req, res){
	
	if (req.session.group) {
		ContactListModel.findOne({_id: req.params.id, group: req.session.group}, '_id name contacts').populate({path: 'contacts', select: '_id name email'}).exec(function (err, contact_list) {
			if (err) res.send(404, {});
			else res.send(contact_list);
		});
	} else {
		res.send(401, {});
	}

};


/*
 * POST /api/v1/contactlist
 */
exports.new = function(req, res){

	if (req.session.group) {
		var contact_list = new ContactListModel();
		if (req.body.name) contact_list.name = req.body.name;
		if (req.body.contacts) {
			for (var i = req.body.contacts.length - 1; i >= 0; i--) {
				contact_list.contacts.push(req.body.contacts[i]._id);
			}
		}
		contact_list.group = req.session.group;
		contact_list.save(function (err) {
			if (err) res.send(500, {});
			else res.json({ _id: contact_list._id, name: contact_list.name, contacts: req.body.contacts });
		});
	} else {
		res.send(401, {});
	}

};


/*
 * PUT /api/v1/contactlist/:id
 * param {String} id
 */
exports.edit = function(req, res){
	
	if (req.session.group) {
		ContactListModel.findOne({_id: req.params.id, group: req.session.group},function (err, contact_list) {
			if (err) {
				res.send(404, {});
			} else {
				if (req.body.name) contact_list.name = req.body.name;
				if (req.body.contacts) {
					contact_list.contacts = [];
					for (var i = req.body.contacts.length - 1; i >= 0; i--) {
						contact_list.contacts.push(req.body.contacts[i]._id);
					}
				}
				contact_list.save(function (err) {
					if (err) res.send(500, {});
					else res.json({ _id: contact_list._id, name: contact_list.name, contacts: req.body.contacts });
				});
			}
		});
	} else {
		res.send(401, {});
	}

};


/*
 * DELETE /api/v1/contactlist/:id
 * param {String} id
 */
exports.delete = function(req, res){
  
  if (req.session.group) {
		ContactListModel.findOne({_id: req.params.id, group: req.session.group},function (err, contact_list) {
			if (err) {
				res.send(404, {});
			} else {
				contact_list.remove(function (err) {
					if (err) res.send(500, {});
					else res.send(200, {});
				});
			}
		});
	} else {
		res.send(401, {});
	}

};