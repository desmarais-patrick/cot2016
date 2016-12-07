
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

  params.step1Url = '/questionnaire';
  if (req.cookies.questionnaireResult) {
    params.step1Result = req.cookies.questionnaireResult.success ? 'Réussie' : 'Échouée';
    params.step1Duration = millisToMinutesAndSeconds(req.cookies.questionnaireResult.durationMillis);
    params.step2Url = '/courir';
  }

   if (req.cookies.courirResult) {
     params.step2Result = req.cookies.courirResult.success ? 'Réussie' : 'Échouée';

     if (req.cookies.courirResult.consolation) {
        params.step2Result = params.step2Result + ' en consolation';
        params.step2Duration = "N/A"
     } else {
         params.step2Duration = millisToMinutesAndSeconds(req.cookies.courirResult.durationMillis);
     }
     params.step3Url = '/secret';
   }

   if (req.cookies.secretResult) {
     params.step4Url = '/intrus';
   }

   if (req.cookies.intrusResult) {
     //Todo add button print me
   }

  res.render('bonjour', params);
  if (!donnees.time_set) {
	  donnees.init_time = new Date();  
  }
});