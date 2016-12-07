var app = {
  utilities: {}
};

(function () {
  var timerIndex = 0;
  var timeoutIDs = {};

  /**
   * Updates text value of timer until it expires.
   * @param elementSelector (string) Ex. "#timer".
   * @param timeFormat (string) Ex. "mm:ss"
   * @param expireTime (moment) Ex. moment("2016-12-06T13:05:43.264Z");
   * @param expireCallback (function)
   */
  app.utilities.startTimer = function startTimer(elementSelector, timeFormat,
      expireTime, expireCallback) {

    var newID = timerIndex++;
    updateTimer(newID, elementSelector, timeFormat, expireTime, function () {
      app.utilities.stopTimer(newID);
      expireCallback();
    });

    return newID;
  };

  function updateTimer(timerID, elementSelector, timeFormat, expireTime, expireCallback) {
    var now = moment();
    var secondsLeft = 0;
    var durationLeft;
    var newText;

    if (now.isBefore(expireTime)) {
      durationLeft = expireTime.clone().subtract(now);
      newText = durationLeft.format(timeFormat);
      secondsLeft = moment.duration(durationLeft).asSeconds();
    } else {
      newText = "0";
    }
    $(elementSelector).text(newText);

    if (0 < secondsLeft) {
      timeoutIDs[timerID] = setTimeout(function () {
        updateTimer(timerID, elementSelector, timeFormat, expireTime, expireCallback);
      }, 500);
    } else {
      expireCallback();
    }
  };

  app.utilities.stopTimer = function stopTimer(timerID) {
    var timeoutID = timeoutIDs[timerID];
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
  };
})();
