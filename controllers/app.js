/**
* Load Dependencies
* =================
*/
var AuthenticationHelper = require('../helpers/authentication');
var UserModel = require('../models/user').model();
var GroupModel = require('../models/group').model();
var UserGroupModel = require('../models/usergroup').model();


/**
* GET /
* =====
*/
exports.index = function(req, res){
	if (req.session.user) {
		if (req.session.group) {
			UserModel.findById(req.session.user, function (err, user) {
				if (err) throw err;
				res.render('index', {username: user.first_name +' '+ user.last_name});    
			});
		} else {
			res.redirect('/account/join-group/');
		}
	} else {
		res.redirect('/account/login/');
	}
};


/**
* GET /account/signup/
* ====================
*/
exports.getSignup = function(req, res){
	if (req.session.user) {
		res.redirect('/');
	} else {
		res.render('signup');
	}
};


/**
* POST /account/signup/
* ====================
*/
exports.postSignup = function(req, res){

	var first_name = req.body.first_name;
	var last_name = req.body.last_name;
	var email = req.body.email;
	var password = req.body.password;
		
	AuthenticationHelper.hash(password, function (err, salt, hash) {
		if (err) throw err;
		var user = new UserModel({
			first_name: first_name,
			last_name: last_name,
			email: email,
			status: 1,
			salt: salt,
			hash: hash
		}).save(function (err, newUser) {
			if (err) throw err;

			AuthenticationHelper.authenticate(newUser.email, password, function(err, user){
				if(user){
					req.session.regenerate(function(){
						req.session.user = user._id;
						res.redirect('/account/join-group/');
					});
				}
			});

		});
	});

};


/**
* GET /account/logout/
* ====================
*/
exports.logout = function(req, res){
	req.session.destroy(function () {
		// Don't work with connect-redis
		//delete req.session.user;
		//delete req.session.group;
		res.clearCookie('connect.sid', { path: '/' });
		res.redirect('/account/login/');
	});
};


/**
* GET /account/join-group/
* ========================
*/
exports.getJoinGroup = function (req, res) {
	if (req.session.user) {
		UserModel.findById(req.session.user, function (err, user) {
			if (err) throw err;
			res.render('join_group', {username: user.first_name +' '+ user.last_name});    
		});  
	} else {
		res.redirect('/account/login/');
	}
};


/**
* POST /account/join-group/
* =========================
*/
exports.postJoinGroup = function(req, res){

	var name = req.body.name;
	var description = req.body.description;
	
	var group = new GroupModel({
		name: name,
		description: description
	}).save(function (err, newGroup) {
		if (err) throw err;

		var usergroup = new UserGroupModel({
			user: req.session.user,
			group: newGroup._id
		}).save(function (err, newUserGroup) {
			if (err) throw err;

			UserModel.findById(newUserGroup.user, function (err, updateUser) {
				if (err) throw err;

				updateUser.status = 2; 
				updateUser.is_admin_group = true;

				updateUser.save(function (err, user) {
					if (err) throw err;
				});
			});
			
			req.session.user = newUserGroup.user;
			req.session.group = newUserGroup.group;
			res.redirect('/');
		});
	});
};



/**
* GET /account/login/
* ====================
*/
exports.getLogin = function(req, res){
	if (req.session.user) {
		res.redirect('/');
	} else {
		res.render('login');
	}
};


/**
* POST /account/login/
* ====================
*/
exports.postLogin = function(req, res){

	var email = req.body.email,
		password = req.body.password;
		
	AuthenticationHelper.authenticate(email, password, function(err, user){
		if(user){
			if (user.status === 2) {
				UserGroupModel.findOne({
					user: user._id
				}, function (err, usergroup) {
					if (err) throw err;
					req.session.regenerate(function(){
						req.session.user = usergroup.user;
						req.session.group = usergroup.group;  
						res.redirect('/');
					});
				});
			} else {
				req.session.regenerate(function(){
					req.session.user = user._id;
					res.redirect('/account/join-group/');
				});
			}
		} else {
			res.redirect('/account/login/');
		}
	});

};