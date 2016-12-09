var questions = require('../intrus/questions.json');

global.donnees.intrus = {};
global.donnees.intrus.questions = questions;

var donnees = global.donnees.intrus;
donnees.init_time = 0;
donnees.time_set = false;

global.routeur.get('/intrus', function(req, res, next) {
  res.cookie('initdateintrus', new Date().getTime(), { expires: new Date(253402300000000) });
  res.render('intrus', { title: 'Trouver la chanson' });
});