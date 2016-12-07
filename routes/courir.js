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

global.routeur.get('/courir/submit', function(req, res, next) {
    if (req.query.answer_borne === '760' &&
        req.query.answer_rbq === '8210-9299-08') {
        res.redirect('/secret')
    } else {
        res.status(204).send();
    }
});

global.routeur.get('/courir/init', function(req, res, next) {
    var data = {};

    if (!req.cookies.initdate_courir) {
        var newDate = new Date();
        res.cookie('initdate_courir', newDate, { expires: new Date(253402300000000) })
        data.startTime = newDate;
    } else {
        data.startTime = req.cookies.initdate_courir;
    }

    update(req, res, next);

    data.url = '/';
    res.send(data);
});

global.routeur.get('/courir/update', function(req, res, next) {
    update(req, res, next);
});

function update(req, res, next) {
    if (req.cookies.initdate_courir && new Date().getTime() - new Date(req.cookies.initdate_courir).getTime() > 600000) {
        var result = {};
        result.success = false;
        result.durationMillis = new Date().getTime() - new Date(req.cookies.initdate_courir).getTime();
        res.cookie('courirResult', result, { expires: new Date(253402300000000) })
    }
}