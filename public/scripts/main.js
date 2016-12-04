(function (moment) {
  $(document).ready(function () {
    updateClock(".clock-general", endTime, gameOver);
    updateClock(".clock-question", questionTime, startOver);
  });

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
