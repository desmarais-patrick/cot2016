(function (moment) {
  $(document).ready(function () {
    initializeStartTrigger();
  });

  function initializeStartTrigger() {
    $(QUESTION_START_TRIGGER_SELECTOR).click(function () {
      $(INTRO_SECTION_SELECTOR).hide();
      $(QUESTION_SECTION_SELECTOR).show();
      getNextQuestion();
      initializeAnswerTriggers();
    });
  }

  function getNextQuestion(answer) {
    var url = "/questionnaire/nextquestion";
    if (answer)
      url += "?answer=" + answer;

    $.ajax(url)
      .done(function(data) {
        if (data.url) {
          window.location = data.url;
        } else {
          if (!startTime) {
            startTime = moment(data.startTime);
            updateQuizTimer();
          }
          if (data.previousTimeout) {
            brieflyShowPreviousTimeoutMessage();
          }
          if (data.previousError) {
            brieflyShowPreviousErrorMessage();
          }
          updateQuestion(data.question, data.choice1, data.choice2);
        }
      });
  }

  function updateQuizTimer() {
    var endTime = startTime.add(10, "m");
    app.utilities.startTimer(QUIZ_TIME_SELECTOR, "mm:ss", endTime, gameOver);
  }

  function brieflyShowPreviousTimeoutMessage() {
    brieflyShowMessage("#previousTimeoutMessage");
  }

  function brieflyShowPreviousErrorMessage() {
    brieflyShowMessage("#previousErrorMessage");
  }

  function brieflyShowMessage(selector) {
    $(selector).css("visibility", "visible");
    setTimeout(function () {
      $(selector).css("visibility", "hidden");
    }, 3000)
  }

  function updateQuestion(question, choice1, choice2) {
    $(QUESTION_TITLE_SELECTOR).text(question);

    var random = 1 === Math.floor(Math.random() * 2);
    questionChoiceLeft = {
      text: random ? choice1 : choice2,
      answer: random ? 1 : 2
    };
    questionChoiceRight = {
      text: random ? choice2 : choice1,
      answer: random ? 2 : 1
    };
    $(QUESTION_CHOICE_LEFT_SELECTOR).text(questionChoiceLeft.text);
    $(QUESTION_CHOICE_RIGHT_SELECTOR).text(questionChoiceRight.text);
    questionTimerID = app.utilities.startTimer(QUESTION_TIME_SELECTOR, "s", moment().add(5, 's'), getNextQuestion);
  }

  function gameOver() {
    $(QUIZ_TIME_SELECTOR).css("color", "red");
    getNextQuestion();
  }

  function initializeAnswerTriggers() {
    $(QUESTION_CHOICE_LEFT_SELECTOR).click(function () {
      app.utilities.stopTimer(questionTimerID);
      getNextQuestion(questionChoiceLeft.answer);
      $(QUESTION_CHOICE_LEFT_SELECTOR).blur();
    });
    $(QUESTION_CHOICE_RIGHT_SELECTOR).click(function () {
      app.utilities.stopTimer(questionTimerID);
      getNextQuestion(questionChoiceRight.answer);
      $(QUESTION_CHOICE_RIGHT_SELECTOR).blur();
    });
  }

  var INTRO_SECTION_SELECTOR = "#introSection";
  var QUESTION_CHOICE_LEFT_SELECTOR = "#questionChoiceLeft";
  var QUESTION_CHOICE_RIGHT_SELECTOR = "#questionChoiceRight";
  var QUESTION_SECTION_SELECTOR = "#questionSection";
  var QUESTION_START_TRIGGER_SELECTOR = "#questionStartTrigger";
  var QUESTION_TIME_SELECTOR = "#questionTime";
  var QUESTION_TITLE_SELECTOR = "#questionTitle";
  var QUIZ_TIME_SELECTOR = "#quizTime";

  var questionChoiceLeft;
  var questionChoiceRight;
  var startTime;
  var questionTimerID;
})(moment);
