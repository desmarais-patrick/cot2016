
global.donnees.bonjour = {};

var donnees = global.donnees.bonjour;
donnees.init_time = 0;
donnees.time_set = false;

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

global.routeur.get('/', function(req, res, next) {
  var params = {};
  params.title = 'Que la chasse commence !';

  if(!req.cookies.questionnaireResult) {
    params.step1Url = '/questionnaire';
  }
  if (req.cookies.questionnaireResult) {
    params.step1Result = req.cookies.questionnaireResult.success ? 'Réussie' : 'Échouée';
    params.step1Duration = millisToMinutesAndSeconds(req.cookies.questionnaireResult.durationMillis);
    if(!req.cookies.courrirResult) {
      params.step2Url = '/courir';
    }
  }

  if (req.cookies.courrirResult) {
    if(!req.cookies.secretResult) {
      params.step3Url = '/secret';
    }
  }

  if (req.cookies.secretResult) {
    if(!req.cookies.intrusResult) {
      params.step4Url = '/intrus';
    }
  }

  if (req.cookies.intrusResult) {
   //Todo add button print me
  }

  res.render('bonjour', params);
  if (!donnees.time_set) {
	  donnees.init_time = new Date();
  }
});
