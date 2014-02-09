/**
 * Load Dependencies
 * =================
 */
var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var RedisStore = require('connect-redis')(express);
var mongoose = require('mongoose');


/**
* Load Storage
* ===============
*/
mongoose.connect('mongodb://127.0.0.1/eQuestionnairePrueba');


/**
* Load Controllers
* ===========
*/ 
var appController = require('./controllers/app');
//var groupController = require('./controllers/group');
var questionnaireController = require('./controllers/questionnaire');


/**
* App Configuration for all environments
* ======================================
*/
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('*p$h)d$g$6p730#7xivyx_a!=j@6%8mlbh$n#z^418g%6d0e!l'));
//app.use(express.session({secret: 'ri6zml7dom-#y7+5o#-@ioa9(bp)b($(!$)wffs^inuhy8kk1f'}));
app.use(express.session({
  store: new RedisStore({
    host: 'localhost',
    port: 6379,
    db: 'eQuestionnaireSessions'
  }),
  secret: 'ri6zml7dom-#y7+5o#-@ioa9(bp)b($(!$)wffs^inuhy8kk1f'
}));	
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


/**
* Only Developer environment
* ==========================
*/
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


/**
* Routes
* ======
*/
// appplication -->
app.get(    '/',                    appController.index);
app.get(    '/account/signup/',     appController.getSignup);
app.post(   '/account/signup/',     appController.postSignup);
app.get(    '/account/join-group/', appController.getJoinGroup);
app.post(   '/account/join-group/', appController.postJoinGroup);
app.get(    '/account/login/',      appController.getLogin);
app.post(   '/account/login/',      appController.postLogin);
app.get(    '/account/logout/',     appController.logout);

// api Group -->
//app.get('/api/v1/group', groupController.detail);

// api Questionnaires -->
app.get(    '/api/v1/questionnaire',     questionnaireController.list);
app.get(    '/api/v1/questionnaire/:id', questionnaireController.detail);
app.post(   '/api/v1/questionnaire',     questionnaireController.new);
app.put(    '/api/v1/questionnaire/:id', questionnaireController.edit);
app.delete( '/api/v1/questionnaire/:id', questionnaireController.delete);



/**
* Create Server
* =============
*/
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port http://localhost:' + app.get('port'));
});
