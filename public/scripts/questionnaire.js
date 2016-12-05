(function (moment) {
  $(document).ready(function () {
    // TODO Update quizTime.
    // TODO Give callback when quizTime runs out.
    // TODO Prevent submit by default.
    // TODO Add handler to submit.
    getNextQuestion();
  });

  function getNextQuestion() {
    $.ajax("/questionnaire/nextquestion")
      .done(function(data) {
        if (typeof data === "string") {
          // TODO Send to appropriate SUCCESS or FAIL page.
          alert(data);
        } else {
          updateQuestion(data.question, data.choice1, data.choice2);
        }
      });
  }

  function updateQuestion(question, choice1, choice2) {
    $("#questionTitle").text(question);
    $("#questionChoice1").text(choice1);
    $("#questionChoice2").text(choice2);
    // TODO: Update questionTime.
    // TODO: Give callback when questionTime runs out.
  }

  function updateClock(selector, referenceTime, callback) {
    var clockElem = $(selector);
    var now = moment();
    var secondsLeft = 0;
    var durationLeft;
    var newText;

    if (now.isBefore(referenceTime)) {
      durationLeft = referenceTime.clone().subtract(now);
      newText = durationLeft.format("m[m] s[s]");
      secondsLeft = moment.duration(durationLeft).asSeconds();
    } else {
      newText = "0";
    }
    clockElem.text(newText);

    if (0 < secondsLeft) {
      setTimeout(function () {
        updateClock(selector, referenceTime, callback)
      }, 500);
    } else {
      callback();
    }
  }

  function gameOver() {
    $(".cover").empty().text("Game Over");
  }

  function startOver() {
    window.location = "/etape1.html";
  }

  var endTime = moment().add(15, "s");
  var questionTime = moment().add(10, "s");
})(moment);
