global.donnees.courir = {};
var donnees = global.donnees.courir;
// Initialisation
donnees.init_time = 0; // Temps au démarrage de l'épreuve
donnees.time_set = false;

/* GET home page. */
global.routeur.get('/courir', function(req, res, next) {
  res.render('courir', { title: 'Cours ami, cours !' });
  if (!donnees.time_set) {
	  donnees.init_time = new Date();  
  }
});