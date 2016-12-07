(function (moment) {
  $(document).ready(function () {
      initialize();
  });

    function initialize() {
        var url = "/courir/init";

        $.ajax(url)
            .done(function(data) {

                if (data.url) {
                    window.location = data.url;
                }

                $("#courirStartTrigger").click(function () {
                    $("#introSection").hide();
                    $("#courirSection").show();

                    startTime = moment(data.startTime);
                    var endTime = startTime.add(10, "m");
                    app.utilities.startTimer($("#runTime"), "mm:ss", endTime, gameOver);
                });

                $("#btnSubmit").click(function () {

                    var reponse1 = $('#courirRep1').val();
                    var reponse2 = $('#courirRep2').val();


                    $.post("/courir/submit", { rep1: reponse1, rep2: reponse2})
                        .done(function(data) {

                            if (!data.success) {
                                alert('Erreur!!!');
                            }
                            if (data.url) {
                                window.location = data.url;
                            }
                        });

                });


            });

    }

    function gameOver() {
        $.ajax("/courir/update", function(data) {
            if (data.url) {
                window.location = data.url;
            }
        });
     }


    var startTime;
})(moment);
