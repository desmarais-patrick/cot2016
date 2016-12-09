(function (moment) {
  $(document).ready(function () {
      initialize();
  });

    function initialize() {
        var url = "/courir/init";

        $("#courirStartTrigger").click(function () {
            $("#introSection").hide();
            $("#courirSection").show();

            $.ajax(url)
                .done(function(data) {

                    if (data.url) {
                        window.location = data.url;
                    }

                    startTime = moment(data.startTime);
                    var endTime = startTime.add(15, "m");
                    app.utilities.startTimer($("#runTime"), "mm:ss", endTime, gameOver);
                });

        });


        $("#btnSubmit").click(function () {

            var reponse1 = $('#courirRep1').val();
            var reponse2 = $('#courirRep2').val();
            var reponse3 = $('#courirRep3').val();
            var reponse4 = $('#courirRep4').val();


            $.post("/courir/submit", { rep1: reponse1, rep2: reponse2, rep3: reponse3, rep4: reponse4})
                .done(function(data) {

                    if (!data.success) {
                        alert(data.reason);
                    }
                    if (data.url) {
                        window.location = data.url;
                    }
                });

        });



    }

    function gameOver() {
        $.ajax("/courir/update")
            .done(function(data) {
                if (data.url) {
                    window.location = data.url;
                }
            });
     }


    var startTime;
})(moment);
