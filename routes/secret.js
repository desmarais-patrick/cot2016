global.donnees.secret = {};

var donnees = global.donnees.secret;
donnees.chansons = require('../secret/chansons.json'); 
donnees.idx_tentative = 0;
  
donnees.chiffrement = function() {
	var cle_vigenere = "";
	switch (donnees.idx_tentative) {
	case 0:
		donnees.chansons.forEach( function(chanson) {
			cle_vigenere = cle_vigenere + chanson.cle_1;
			chanson.texte = chanson.extrait_1;
		});
		break;
	case 1:
		donnees.chansons.forEach( function(chanson) {
			cle_vigenere = cle_vigenere + chanson.cle_2;
			chanson.texte = chanson.extrait_2;		
		});
		break;
	case 2:
		donnees.chansons.forEach( function(chanson) {
			cle_vigenere = cle_vigenere + chanson.cle_3;
			chanson.texte = chanson.extrait_3;
		});
		break;		
	}
	donnees.cle_vigenere = cle_vigenere;
	console.log(donnees.cle_vigenere);
}

global.routeur.get('/secret', function(req, res, next) {
  donnees.chiffrement();
  res.render('secret', { title: 'Déchiffre-moi ça !' }); 
});

global.routeur.get('/secret/submit', function(req, res, next) {
    if (req.query.cle_vigenere === global.donnees.secret.cle_vigenere) {
        res.redirect('/secret/bravo')
    } else {
    	if (donnees.idx_tentative < 2) {
    		donnees.idx_tentative++;
    		donnee.chiffrement();
    	} else {
    		donnees.idx_tentative = 0;
    	}
        res.status(204).send();
    }
});