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

global.routeur.post('/courir/submit', function(req, res, next) {
    var data = {};
    if (req.body.rep1 === '760' &&
        req.body.rep2 === '8210-9299-08' &&
        req.body.rep3 === '01074164' &&
        req.body.rep4 === '40') { // todo compter les marches de l'escalier secret!
        data.success = true;
        data.url = '/secret';

        var result = {};
        result.success = true;
        result.durationMillis = new Date().getTime() - new Date(req.cookies.initdate_courir).getTime();
        res.cookie('courirResult', result, { expires: new Date(253402300000000) })
    } else {
        data.success = false;
        data.reason = 'Erreur! 1:' +  (req.body.rep1 === '760') +
            ' 2:' +  (req.body.rep2 === '78210-9299-0860') +
            ' 3:' +  (req.body.rep3 === '01074164') +
            ' 4:' +  (req.body.rep4 === '40'); //todo fix marches!
    }

    res.send(data);
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

    if (!update(req, res, next)) {
        data.url = '/maths';
    }
    res.send(data);
});

global.routeur.get('/courir/update', function(req, res, next) {
    var data = {};
    if (!update(req, res, next)) {
        data.url = '/maths';
    }
    res.send(data);
});

function update(req, res, next) {
    if (req.cookies.initdate_courir && new Date().getTime() - new Date(req.cookies.initdate_courir).getTime() > 900000) {
        var result = {};
        result.success = false;
        result.durationMillis = new Date().getTime() - new Date(req.cookies.initdate_courir).getTime();
        res.cookie('courirResult', result, { expires: new Date(253402300000000) })
        return false;
    }

    return true;
}