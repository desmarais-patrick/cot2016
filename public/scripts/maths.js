(function (moment) {
  $(document).ready(function () {
      initialize();
  });

    function initialize() {


        $("#mathsStartTrigger").click(function () {
            $("#introSection").hide();
            $("#mathsSection").show();
        });

        $("#btnSubmit").click(function () {
            var rep = $('#answer').val();

            $.post("/maths/submit", { rep: rep })
                .done(function(data) {

                    if (!data.success) {
                        alert('Erreur. Vous etes à ' + data.diff + ' de la réponse.');
                    }

                    if (data.url) {
                        window.location = data.url;
                    }
                });
        });


    }

})(moment);
