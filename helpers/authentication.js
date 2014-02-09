/**
* Load Dependencies
* =================
*/
var crypto = require('crypto');
var UserModel = require('../models/user').model();

/**
* Hash Internal Function
* ======================
* check out https://github.com/visionmedia/node-pwd
* Hashes a password with optional `salt`, otherwise
* generate a salt for `pass` and invoke `fn(err, salt, hash)`.
*
* @param {String} password to hash
* @param {String} optional salt
* @param {Function} callback
* @api public
*/
// Bytesize.
var len = 128;

// Iterations. ~300ms
var iterations = 100;

function hash (pwd, salt, fn) {
  if (3 == arguments.length) {
    crypto.pbkdf2(pwd, salt, iterations, len, fn);
  } else {
    fn = salt;
    crypto.randomBytes(len, function(err, salt){
      if (err) return fn(err);
      salt = salt.toString('base64');
      crypto.pbkdf2(pwd, salt, iterations, len, function(err, hash){
        if (err) return fn(err);
        fn(null, salt, hash);
      });
    });
  }
};


exports.hash = function (pwd, salt, fn) {
  if (3 == arguments.length) {
    crypto.pbkdf2(pwd, salt, iterations, len, fn);
  } else {
    fn = salt;
    crypto.randomBytes(len, function(err, salt){
      if (err) return fn(err);
      salt = salt.toString('base64');
      crypto.pbkdf2(pwd, salt, iterations, len, function(err, hash){
        if (err) return fn(err);
        fn(null, salt, hash);
      });
    });
  }
};


/**
* Authenticate Function
* =====================
*/
exports.authenticate = function (email, pass, fn) {
  //if (!module.parent) console.log('authenticating %s:%s', name, pass);

  //var User = new UserModel();

  UserModel.findOne({
    email: email
  },
  function (err, user) {
    if (user) {
      if (err) return fn(new Error('cannot find user'));
      hash(pass, user.salt, function (err, hash) {
        if (err) return fn(err);
        if (hash == user.hash) return fn(null, user);
        fn(new Error('invalid password'));
      });
    } else {
      return fn(new Error('cannot find user'));
    }
  });
}


/**
* Require Authentication Function
* ===============================
*/
exports.requiredAuthentication = function (req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/account/login/');
  }
}


/**
* User Exist Function
* ===================
*/
exports.userExist = function (req, res, next) {
  //var User = new UserModel();
  
  UserModel.count({
    email: req.body.email
  }, function (err, count) {
    if (count === 0) {
      next();
    } else {
      res.redirect("/account/signup/");
    }
  });
}