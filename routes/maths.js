
/* GET home page. */
global.routeur.get('/maths', function(req, res, next) {
  res.render('maths', { title: 'Tu sais pas courir, est-ce que tu sais compter? !' });
});
