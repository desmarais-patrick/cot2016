(function (moment) {
  $(document).ready(function () {
      initialize();
  });

    function initialize() {
        var url = "/courir/init";

        $.ajax(url)
            .done(function(data) {
                $("#courirStartTrigger").click(function () {
                    $("#introSection").hide();
                    $("#courirSection").show();

                    startTime = moment(data.startTime);
                    var endTime = startTime.add(10, "m");
                    app.utilities.startTimer($("#runTime"), "mm:ss", endTime, gameOver);
                });
            });
    }

    function gameOver() {
        $.ajax("/courir/update");
     }

    var startTime;
})(moment);
