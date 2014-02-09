/**
* Load Dependencies
* =================
*/
var QuestionnaireModel = require('../models/questionnaire').model();

/*
 * GET list
 */
exports.list = function(req, res){
	console.log(req.body);
  	res.send('questionnaires GET list');
};


/*
 * GET detail
 * param {String} id
 */
exports.detail = function(req, res){
	console.log(req.body);
  	res.send('questionnaires GET detail');
};


/*
 * POST new
 */
exports.new = function(req, res){
	
	console.log("NEW: ");
  	console.log(req.body);
  
  var questionnaire = new QuestionnaireModel({
    title: req.body.title,
		description: req.body.description,
		creation_date: req.body.creation_date,
		last_modified_date: req.body.last_modified_date,
		send_date: req.body.send_date,
		status: req.body.status,
		group: req.body.group,
		mail_account_setting: req.body.mail_account_setting,
		contacts: req.body.contacts,
		contact_lists: req.body.contact_lists,
		questions: req.body.questions
  });
  
  questionnaire.save(function (err) {
    if (err)  throw err;
  });
  
  return res.send(questionnaire);
};


/*
 * PUT edit
 * param {String} id
 */
exports.edit = function(req, res){
	console.log(req.body);
  res.send('questionnaires PUT edit - ' + req);
};


/*
 * DELETE delete
 * param {String} id
 */
exports.delete = function(req, res){
  console.log(req.body);
  res.send('questionnaires DELETE delete');
};