
var express = require('express');
var questions = require('../questionnaire/questions.json');

global.donnees.questionnaire = {};
var donnees = global.donnees.questionnaire;
global.donnees.questionnaire.questions = questions;

donnees.init_time;
donnees.time_set = false;
donnees.cur_question = 0;
donnees.nxt_question_disponible = false;

/* Point d'entrée de l'épreuve */
global.routeur.get('/questionnaire', function(req, res, next) {
  res.render('questionnaire', { title: 'Questionaire débilitant' });
  if (!donnees.time_set) {
	  donnees.init_time = new Date();
  }
});

global.routeur.get('/questionnaire/nextQuestion', function(req, res, next) {
  var nextQuestion = {};
  var nextQuestionId = 0;

  if (!req.cookies.initdate) {
    res.cookie('initdate', new Date(), { expires: new Date(253402300000000) })
  }

  if (req.cookies.initdate && new Date().getTime() - new Date(req.cookies.initdate).getTime() > 600000) { //TODO 10 minutes. voir si on met plus de temps
    res.send('pu de temps pour faire le test. passer au suivant');
    return;
  }

  if (req.cookies.currentQuestion) {
    var currentQuestion = parseInt(req.cookies.currentQuestion, 10);

    if (new Date().getTime() - new Date(req.cookies.currentQuestionInitDate).getTime() > 5000 && !req.query.timeoutdisabled) { //pour debugger: ajoutez un query string timoutdisabled pour tester sans timeout
      nextQuestion.previousTimeout = true;
    } else if (questions[currentQuestion].answer != req.query.answer) {
      nextQuestionId = currentQuestion + 1;
    } else {
      nextQuestion.previousError = true;
    }
  }

  if (nextQuestionId > questions.length) {
    res.send('succes. redirect somewhere'); //TODO handler mieux la reponse
  } else {
    nextQuestion.question = questions[nextQuestionId].question;
    nextQuestion.choice1 = questions[nextQuestionId].choice1;
    nextQuestion.choice2 = questions[nextQuestionId].choice2;
    res.cookie('currentQuestion', nextQuestionId, { expires: new Date(253402300000000) })
    res.cookie('currentQuestionInitDate', new Date(), { expires: new Date(253402300000000) })
    res.send(nextQuestion)
  }
});
