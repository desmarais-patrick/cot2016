global.donnees.secret = {};

var donnees = global.donnees.secret;
donnees.chansons = require('../secret/chansons.json'); 
donnees.idx_extraits = new Array(donnees.chansons.length); 
  
donnees.brassage = function() {
	var cle = "", chanson = {};
	var nombre = (Math.random() * 1000000000).toString();
	for (var i = 0; i < donnees.idx_extraits.length; i++) {		
		donnees.idx_extraits[i] = ((parseInt(nombre.charAt(i)) + 1) % 3) + 1;
	}
	for (var i = 0; i < donnees.chansons.length; i++) {
		chanson =  donnees.chansons[i];		
		switch (donnees.idx_extraits[i]) {
		case 1:			
			cle = cle + chanson.cle_1;
			chanson.texte = chanson.extrait_1;
			break;
		case 2:
			cle = cle + chanson.cle_2;
			chanson.texte = chanson.extrait_2;		
			break;
		case 3:
			cle = cle + chanson.cle_3;
			chanson.texte = chanson.extrait_3;
			break;		
		}
	}
	donnees.cle = cle;
	console.log("Séquence générée : " + donnees.idx_extraits.toString());
	console.log("Clé générée : " + donnees.cle);
}

global.routeur.get('/secret', function(req, res, next) {
  if (!global.donnees.secret.debut) {
	global.donnees.secret.debut = new Date();  
  }    
  donnees.brassage();
  res.render('secret', { title: 'Déchiffre-moi ça !' }); 
});

global.routeur.get('/secret/disparu', function(req, res, next) {
	res.render('secretdisparu', { title: 'Ho non !' });
});

global.routeur.get('/secret/decode', function(req, res, next) {
    if (req.query.cle === global.donnees.secret.cle 
    		&& req.query.auteur_0 === global.donnees.secret.chansons[0].auteur
    		&& req.query.auteur_1 === global.donnees.secret.chansons[1].auteur
    		&& req.query.auteur_2 === global.donnees.secret.chansons[2].auteur
    		&& req.query.auteur_3 === global.donnees.secret.chansons[3].auteur
    		&& req.query.auteur_4 === global.donnees.secret.chansons[4].auteur) {    
    	global.donnees.secret.succes = true;
    	global.donnees.secret.dureeMillis = new Date().getTime() - global.donnees.secret.debut.getTime();
        res.redirect('/intrus');
    } else {    	
    	res.redirect('/secret');
    }
});