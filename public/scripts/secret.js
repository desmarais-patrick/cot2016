(function (moment) {
  $(document).ready(function () {
	  initializeStartTrigger();
  });

  function initializeStartTrigger() {
	  $(SECRET_START_TRIGGER_SELECTOR).click(function () {
		  $(INTRO_SECTION_SELECTOR).hide();
		  $(TEXTES_SECTION_SELECTOR).show();
		  $(CLE_SECTION_SELECTOR).show();
	  })
  }
  
  function updateQuizTimer() {
	  var endTime = startTime.add(10, "m");
	  app.utilities.startTimer(SECRET_TIME_SELECTOR, "mm:ss", endTime, gameOver);
  }
  
  function gameOver() {
	  $(SECRET_TIME_SELECTOR).css("color", "red");	  
  }
  
  var INTRO_SECTION_SELECTOR = "#secretIntroSection";
  var SECRET_START_TRIGGER_SELECTOR = "#secretStartTrigger";
  var SECRET_TIME_SELECTOR = "#secretTime";
  var CLE_SECTION_SELECTOR = "#dechiffrementSection";
  var TEXTES_SECTION_SELECTOR = "#textesSection";
  
})(moment);
