
global.donnees.bonjour = {};

var donnees = global.donnees.bonjour;
donnees.init_time = 0;
donnees.time_set = false;

global.routeur.get('/', function(req, res, next) {
  res.render('bonjour', { title: 'Que la chasse commence !' });
  if (!donnees.time_set) {
	  donnees.init_time = new Date();  
  }
});