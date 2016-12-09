
/* GET home page. */
global.routeur.get('/maths', function(req, res, next) {
  res.render('maths', { title: 'Tu sais pas courir, est-ce que tu sais compter? !' });
});

global.routeur.post('/maths/submit', function(req, res, next) {
    var data = {};
    if (req.body.rep === '0.5221200397187700576319882896204017656893786465571759845891277581855583160389042402617653079763373549') {
        data.success = true;
        data.url = '/secret';

        var result = {};
        result.success = true;
        result.consolation = true;
        res.cookie('courirResult', result, { expires: new Date(253402300000000) })
    } else {
        data.success = false;
        if (isNaN(req.body.rep)) {
            data.diff = 'WTF'
        } else {
            data.diff = req.body.rep - 0.5221200397187700576319882896204017656893786465571759845891277581855583160389042402617653079763373549;
        }
    }

    res.send(data);
});