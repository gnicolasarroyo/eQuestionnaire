/**
 * Load Dependencies
 * =================
 */

var QuestionnaireModel = require('../models/questionnaire').model();


/*
 * GET /api/v1/questionnaire
 */
exports.list = function(req, res){
	
	if (req.session.group) {
		QuestionnaireModel.find({group: req.session.group}, '_id title description creation_date last_modified_date status questions', function (err, questionnaires) {
			if (err) res.send(404, {});
			else res.send(questionnaires);
		});
	} else {
		res.send(401, {});
	}

};


/*
 * GET /api/v1/questionnaire/:id
 * param {String} id
 */
exports.detail = function(req, res){
	
	if (req.session.group) {
		QuestionnaireModel.findOne({_id: req.params.id, group: req.session.group}, '_id title description creation_date last_modified_date status questions', function (err, questionnaire) {
			if (err) res.send(404, {});
			else res.send(questionnaire);
		});
	} else {
		res.send(401, {});
	}

};


/*
 * POST /api/v1/questionnaire
 */
exports.new = function(req, res){
	
	if (req.session.group) {
		var questionnaire = new QuestionnaireModel();
		if (req.body.title) questionnaire.title = req.body.title;
		if (req.body.description) questionnaire.description = req.body.description;
		if (req.body.status) questionnaire.status = req.body.status;
		if (req.body.questions) questionnaire.questions = req.body.questions;
		questionnaire.group = req.session.group;
		questionnaire.save(function (err) {
			if (err) res.send(500, {});
			else res.json({ _id: questionnaire._id, title: questionnaire.title, description: questionnaire.description, creation_date: questionnaire.creation_date, last_modified_date: questionnaire.last_modified_date, status: questionnaire.status, questions: questionnaire.questions });
		});
	} else {
		res.send(401, {});
	}

};


/*
 * PUT /api/v1/questionnaire/:id
 * param {String} id
 */
exports.edit = function(req, res){
	
	if (req.session.group) {
		QuestionnaireModel.findOne({_id: req.params.id, group: req.session.group},function (err, questionnaire) {
			if (err) {
				res.send(404, {});
			} else {
				if (req.body.title) questionnaire.title = req.body.title;
				if (req.body.description) questionnaire.description = req.body.description;
				questionnaire.last_modified_date = Date.now();
				if (req.body.status) questionnaire.status = req.body.status;
				if (req.body.questions) questionnaire.questions = req.body.questions;
				questionnaire.save(function (err) {
					if (err) res.send(500, {});
					else res.json({ _id: questionnaire._id, title: questionnaire.title, description: questionnaire.description, creation_date: questionnaire.creation_date, last_modified_date: questionnaire.last_modified_date, status: questionnaire.status, questions: questionnaire.questions });
				});
			}
		});
	} else {
		res.send(401, {});
	}

};


/*
 * DELETE /api/v1/questionnaire/:id
 * param {String} id
 */
exports.delete = function(req, res){
  
  if (req.session.group) {
		QuestionnaireModel.findOne({_id: req.params.id, group: req.session.group},function (err, questionnaire) {
			if (err) {
				res.send(404, {});
			} else {
				questionnaire.remove(function (err) {
					if (err) res.send(500, {});
					else res.send(200, {});
				});
			}
		});
	} else {
		res.send(401, {});
	}

};