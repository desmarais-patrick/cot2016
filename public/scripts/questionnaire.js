(function (moment) {
  $(document).ready(function () {
    initializeStartTrigger();
    // TODO Handle error message when timer runs out.
    // TODO Handle error message when answer is wrong.
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
    $(QUESTION_CHOICE_1_SELECTOR).text(choice1);
    $(QUESTION_CHOICE_2_SELECTOR).text(choice2);
    questionTimerID = app.utilities.startTimer(QUESTION_TIME_SELECTOR, "s", moment().add(5, 's'), getNextQuestion);
  }

  function gameOver() {
    $(QUIZ_TIME_SELECTOR).css("color", "red");
    getNextQuestion();
  }

  function initializeAnswerTriggers() {
    $(QUESTION_CHOICE_1_SELECTOR).click(function () {
      app.utilities.stopTimer(questionTimerID);
      getNextQuestion(1);
    });
    $(QUESTION_CHOICE_2_SELECTOR).click(function () {
      app.utilities.stopTimer(questionTimerID);
      getNextQuestion(2);
    });
  }

  var INTRO_SECTION_SELECTOR = "#introSection";
  var QUESTION_CHOICE_1_SELECTOR = "#questionChoice1";
  var QUESTION_CHOICE_2_SELECTOR = "#questionChoice2";
  var QUESTION_SECTION_SELECTOR = "#questionSection";
  var QUESTION_START_TRIGGER_SELECTOR = "#questionStartTrigger";
  var QUESTION_TIME_SELECTOR = "#questionTime";
  var QUESTION_TITLE_SELECTOR = "#questionTitle";
  var QUIZ_TIME_SELECTOR = "#quizTime";

  var startTime;
  var questionTimerID;
})(moment);
